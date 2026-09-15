import React, { useState, useEffect } from 'react';
import { 
  getAllowedUsersFromFirestore, 
  addAllowedUserToFirestore, 
  removeAllowedUserFromFirestore,
  initAllowedUsersCollection 
} from '../services/firestoreService';
import { ADMIN_EMAILS } from '../config/authConfig';
import { AllowedUserRecord } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  UserPlus, 
  Trash2, 
  Shield, 
  X, 
  Loader2, 
  CheckCircle2, 
  Mail, 
  Database,
  RefreshCw,
  Search,
  AlertTriangle,
  UserCheck,
  Lock,
  Crown
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  onUsersUpdated?: () => void;
}

export const AdminModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onShowToast,
  onUsersUpdated
}) => {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState<AllowedUserRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Add new email form state
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Giáo viên Mĩ thuật');
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Delete confirm state
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      await initAllowedUsersCollection();
      const records = await getAllowedUsersFromFirestore();
      setUsers(records);
    } catch (err) {
      console.error('Lỗi khi tải bảng allowed_users:', err);
      onShowToast('Không thể kết nối bảng allowed_users trên Firestore.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Strict check: Only authorized admin emails can view or interact
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-center border border-rose-200">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Truy cập bị từ chối</h3>
          <p className="text-xs text-slate-600 mt-2">
            Trang quản trị này chỉ dành riêng cho các email quản trị viên được chỉ định:
          </p>
          <div className="mt-3 bg-slate-50 p-2.5 rounded-xl text-left text-xs font-mono space-y-1 text-slate-700">
            {ADMIN_EMAILS.map(email => (
              <div key={email} className="flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>{email}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-slate-800 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  // Handle Add User (tries direct Firestore then server fallback)
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailToInsert = newEmail.trim().toLowerCase();
    if (!emailToInsert || !emailToInsert.includes('@')) {
      onShowToast('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
    }

    if (users.some(u => u.email.toLowerCase() === emailToInsert)) {
      onShowToast(`Email ${emailToInsert} đã có sẵn trong bảng allowed_users!`);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. First try server endpoint with caller's token for strict validation
      let success = false;
      try {
        if (user) {
          const idToken = await user.getIdToken();
          const res = await fetch('/api/admin/add-allowed-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idToken,
              email: emailToInsert,
              role: newRole,
              note: newNote || `Thêm bởi Admin ${user.email}`
            })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            success = true;
          }
        }
      } catch (srvErr) {
        console.warn('Server admin add fallback to client:', srvErr);
      }

      // 2. Client SDK fallback if needed
      if (!success) {
        await addAllowedUserToFirestore(emailToInsert, newRole, newNote || `Thêm bởi Admin ${user?.email}`);
      }

      onShowToast(`Đã thêm thành công "${emailToInsert}" vào bảng allowed_users!`);
      setNewEmail('');
      setNewNote('');
      await fetchUsers();
      if (onUsersUpdated) onUsersUpdated();
    } catch (err: any) {
      console.error('Lỗi khi thêm user:', err);
      onShowToast(`Lỗi: ${err.message || 'Thao tác thêm thất bại'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete User
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    const emailToDelete = userToDelete.trim().toLowerCase();

    // Prevent deleting admin emails
    if (ADMIN_EMAILS.some(a => a.toLowerCase() === emailToDelete)) {
      alert(`Không thể xóa tài khoản Quản trị viên hệ thống (${emailToDelete})!`);
      setUserToDelete(null);
      return;
    }

    setIsDeleting(true);
    try {
      // 1. Try server endpoint first
      let success = false;
      try {
        if (user) {
          const idToken = await user.getIdToken();
          const res = await fetch('/api/admin/remove-allowed-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idToken,
              email: emailToDelete
            })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            success = true;
          }
        }
      } catch (srvErr) {
        console.warn('Server admin remove fallback to client:', srvErr);
      }

      // 2. Client SDK fallback
      if (!success) {
        await removeAllowedUserFromFirestore(emailToDelete);
      }

      onShowToast(`Đã xóa "${emailToDelete}" khỏi bảng allowed_users thành công.`);
      setUserToDelete(null);
      await fetchUsers();
      if (onUsersUpdated) onUsersUpdated();
    } catch (err: any) {
      console.error('Lỗi khi xóa user:', err);
      onShowToast(`Lỗi: ${err.message || 'Thao tác xóa thất bại'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered user list
  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    (u.role && u.role.toLowerCase().includes(searchTerm.toLowerCase().trim())) ||
    (u.note && u.note.toLowerCase().includes(searchTerm.toLowerCase().trim()))
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header with Admin Badge */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Trang Quản Trị Hệ Thống (Admin Portal)</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                  ADMIN ONLY
                </span>
              </div>
              <p className="text-xs text-purple-200/90 mt-0.5">
                Quản lý thêm/xóa quyền truy cập người dùng trong bảng <code className="text-amber-300 font-mono">allowed_users</code>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin status bar */}
        <div className="px-6 py-2.5 bg-purple-50/80 border-b border-purple-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-purple-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>Admin đang đăng nhập:</span>
            <strong className="text-purple-950 font-mono">{user?.email}</strong>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-purple-700">
            <span>Danh sách quản trị viên:</span>
            <span className="font-bold font-mono">3 tài khoản</span>
          </div>
        </div>

        {/* Add User Section */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60">
          <form onSubmit={handleAddUser} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-indigo-600" />
                Thêm email vào bảng allowed_users
              </label>
              <span className="text-[11px] text-slate-500">
                Cho phép giáo viên đăng nhập Google vào app
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="relative sm:col-span-6">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="nhập email mới (VD: teacher@gmail.com)"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="Giáo viên Mĩ thuật">Giáo viên Mĩ thuật</option>
                  <option value="Tổ trưởng chuyên môn">Tổ trưởng chuyên môn</option>
                  <option value="Ban giám hiệu">Ban giám hiệu</option>
                  <option value="Quản trị viên">Quản trị viên</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !newEmail.trim()}
                  className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  <span>Thêm Email</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ghi chú thêm (tùy chọn, ví dụ: Trường THCS Chu Văn An, Tỉnh Nam Định)"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-slate-700"
              />
            </div>
          </form>
        </div>

        {/* Search & Counter toolbar */}
        <div className="px-6 py-2.5 border-b border-slate-100 flex items-center justify-between gap-3 bg-white">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm email, vai trò..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Database className="w-3.5 h-3.5 text-indigo-600" />
            <span>Tổng cộng: <strong className="text-slate-800">{users.length}</strong> tài khoản</span>
          </div>
        </div>

        {/* List of Allowed Users */}
        <div className="p-6 overflow-y-auto flex-1 space-y-2">
          {loading ? (
            <div className="py-12 text-center space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mx-auto" />
              <p className="text-xs text-slate-500">Đang tải bảng allowed_users từ Firestore...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Không tìm thấy email nào phù hợp với từ khóa "{searchTerm}".
            </div>
          ) : (
            filteredUsers.map((record) => {
              const isAdminAccount = ADMIN_EMAILS.some(a => a.toLowerCase() === record.email.toLowerCase());
              const isCurrentUser = user?.email?.toLowerCase() === record.email.toLowerCase();

              return (
                <div
                  key={record.email}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isAdminAccount 
                      ? 'bg-purple-50/40 border-purple-200' 
                      : 'bg-white border-slate-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isAdminAccount 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {isAdminAccount ? (
                        <Crown className="w-4 h-4 text-purple-700" />
                      ) : (
                        <UserCheck className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs text-slate-900 font-mono truncate">
                          {record.email}
                        </span>
                        {isAdminAccount && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-200 text-purple-900 border border-purple-300">
                            ADMIN
                          </span>
                        )}
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-indigo-100 text-indigo-800">
                            Bạn
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-100 text-emerald-800">
                          {record.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-medium text-slate-700">{record.role || 'Giáo viên Mĩ thuật'}</span>
                        {record.note && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-[200px]">{record.note}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isAdminAccount ? (
                      <span className="text-[10.5px] font-semibold text-purple-700 bg-purple-100/70 px-2.5 py-1 rounded-lg">
                        Bảo vệ
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setUserToDelete(record.email)}
                        className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer border border-transparent hover:border-rose-200"
                        title="Xóa quyền truy cập"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Xóa</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Delete confirmation dialog */}
        {userToDelete && (
          <div className="p-4 bg-rose-50 border-t border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5 text-rose-900 text-xs">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <p className="font-bold">Xác nhận xóa tài khoản khỏi bảng allowed_users?</p>
                <p className="font-mono text-rose-700">{userToDelete}</p>
                <p className="text-[11px] text-rose-600">
                  Người dùng này sẽ bị từ chối và đăng xuất ngay lập tức khi đăng nhập.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                disabled={isDeleting}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {isDeleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>Xác nhận xóa</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Làm mới dữ liệu từ Cloud
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-white cursor-pointer text-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
