import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  signOut, 
  onAuthStateChanged, 
  User 
} from '../lib/firebase';
import { isEmailAuthorized, isAdminEmail, ALLOWED_EMAILS } from '../config/authConfig';
import { 
  getAllowedUsersFromFirestore, 
  checkSingleAllowedUserFromFirestore,
  initAllowedUsersCollection 
} from '../services/firestoreService';
import { AllowedUserRecord } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthorized: boolean;
  isAdmin: boolean;
  allowedEmails: string[];
  allowedUsersRecords: AllowedUserRecord[];
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  switchAccount: () => Promise<void>;
  refreshAllowedUsers: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [allowedEmails, setAllowedEmails] = useState<string[]>(ALLOWED_EMAILS);
  const [allowedUsersRecords, setAllowedUsersRecords] = useState<AllowedUserRecord[]>([]);

  // Function to refresh allowed users from Firestore
  const refreshAllowedUsers = async (targetUser?: User | null) => {
    const activeUser = targetUser !== undefined ? targetUser : user;
    if (!activeUser?.email) return;

    const email = activeUser.email.toLowerCase().trim();
    const isUserAdmin = isAdminEmail(email);

    if (isUserAdmin) {
      // Admin: Có quyền list toàn bộ bảng allowed_users
      try {
        const records = await getAllowedUsersFromFirestore();
        setAllowedUsersRecords(records);
        const emailsFromDb = records.map(r => r.email.toLowerCase().trim());
        const merged = Array.from(new Set([...ALLOWED_EMAILS.map(e => e.toLowerCase().trim()), ...emailsFromDb]));
        setAllowedEmails(merged);
      } catch (err) {
        console.warn('Lỗi khi Admin tải toàn bộ allowed_users:', err);
      }
    } else {
      // Người dùng thường: CHỈ đọc kết quả kiểm tra của chính họ
      try {
        const myRecord = await checkSingleAllowedUserFromFirestore(email);
        if (myRecord) {
          setAllowedUsersRecords([myRecord]);
          setAllowedEmails([email]);
        }
      } catch (err) {
        console.warn('Lỗi khi tải kết quả kiểm tra người dùng:', err);
      }
    }
  };

  /**
   * Kiểm tra quyền truy cập của người dùng ở PHÍA SERVER (bảng allowed_users)
   * Nếu server trả về allowed: false -> Đăng xuất ngay lập tức
   */
  const verifyAllowedUserOnServer = async (currentUser: User): Promise<boolean> => {
    try {
      const idToken = await currentUser.getIdToken(true);
      const response = await fetch('/api/auth/verify-allowed-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ idToken })
      });

      const data = await response.json();

      if (!response.ok || !data.allowed) {
        console.warn(`[Auth Server] Từ chối truy cập cho ${currentUser.email}:`, data.error);
        // Đăng xuất ngay lập tức theo yêu cầu
        await signOut(auth);
        setUser(null);
        setIsAuthorized(false);
        setAuthError(
          data.error || 
          `Tài khoản Google "${currentUser.email}" không nằm trong bảng allowed_users. Bạn đã bị từ chối truy cập và tự động đăng xuất ngay lập tức.`
        );
        return false;
      }

      // Được cấp phép hợp lệ từ server
      console.log(`[Auth Server] Xác thực thành công cho ${currentUser.email}`);
      setIsAuthorized(true);
      setAuthError(null);
      return true;
    } catch (error: any) {
      console.error('Lỗi khi gọi máy chủ xác thực allowed_users:', error);
      // Fallback kiểm tra danh sách mặc định nếu server gặp sự cố mạng tạm thời
      const isDefault = isEmailAuthorized(currentUser.email);
      if (isDefault) {
        setIsAuthorized(true);
        return true;
      }
      await signOut(auth);
      setUser(null);
      setIsAuthorized(false);
      setAuthError(`Không thể xác thực quyền truy cập với máy chủ: ${error.message || 'Lỗi kết nối'}. Vui lòng thử lại.`);
      return false;
    }
  };

  useEffect(() => {
    // Check for redirect result on page load
    getRedirectResult(auth).catch((err: any) => {
      console.warn('Redirect sign-in check:', err);
    });

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoading(true);
        // Kiểm tra quyền trên server trước khi cho phép vào app
        const verified = await verifyAllowedUserOnServer(currentUser);
        if (verified) {
          setUser(currentUser);
          await refreshAllowedUsers(currentUser);
          if (currentUser.email && isAdminEmail(currentUser.email)) {
            initAllowedUsersCollection().catch(() => {});
          }
        }
      } else {
        setUser(null);
        setIsAuthorized(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred && cred.user) {
        const verified = await verifyAllowedUserOnServer(cred.user);
        if (verified) {
          setUser(cred.user);
          await refreshAllowedUsers(cred.user);
        }
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      // If unauthorized domain (common when deploying to Vercel before adding domain to Firebase Console)
      if (err.code === 'auth/unauthorized-domain') {
        const hostname = typeof window !== 'undefined' ? window.location.hostname : 'Vercel';
        setAuthError(
          `Miền "${hostname}" chưa được cấp phép trong Firebase! Vui lòng vào Firebase Console > Authentication > Settings > Authorized Domains và thêm miền "${hostname}" (hoặc *.vercel.app).`
        );
      } else if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr: any) {
          setAuthError(redirectErr.message || 'Không thể đăng nhập bằng Google. Vui lòng mở ứng dụng trong tab mới nếu pop-up bị chặn.');
        }
      } else {
        setAuthError(err.message || 'Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthorized(false);
    } catch (err: any) {
      console.error('Logout Error:', err);
      setAuthError(err.message || 'Đăng xuất thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const switchAccount = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthorized(false);
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Switch account error:', err);
      setAuthError(err.message || 'Lỗi khi chuyển đổi tài khoản.');
    }
  };

  const clearAuthError = () => setAuthError(null);

  const isAdmin = Boolean(user?.email && isAdminEmail(user.email));

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthorized, 
      isAdmin,
      allowedEmails,
      allowedUsersRecords,
      authError, 
      signInWithGoogle, 
      logout, 
      switchAccount,
      refreshAllowedUsers,
      clearAuthError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
