import { 
  db, 
  handleFirestoreError, 
  OperationType, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  deleteDoc,
  serverTimestamp,
  User 
} from '../lib/firebase';
import { AppSettings, GeneratedWeeklyPlan, WeekCalendar, TimetableRow, AllowedUserRecord } from '../types';

import { ADMIN_EMAILS, ALLOWED_EMAILS } from '../config/authConfig';

export const INITIAL_ALLOWED_EMAILS = ALLOWED_EMAILS;

/**
 * Đọc kết quả kiểm tra của chính người dùng từ bảng allowed_users trên Firestore
 * (Người dùng thường được phép get tài liệu của chính email họ theo Firestore Security Rules)
 */
export async function checkSingleAllowedUserFromFirestore(email: string): Promise<AllowedUserRecord | null> {
  const normalizedEmail = email.trim().toLowerCase();
  try {
    const docRef = doc(db, 'allowed_users', normalizedEmail);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        email: data.email || normalizedEmail,
        role: data.role || 'teacher',
        status: data.status || 'active',
        note: data.note || '',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    }
    return null;
  } catch (error) {
    console.warn(`[Firestore] Đọc allowed_user cho ${normalizedEmail}:`, error);
    return null;
  }
}

/**
 * Khởi tạo bảng allowed_users trên Firestore với các email mặc định và admin nếu chưa tồn tại
 * (Chỉ Admin mới có quyền thực thi thao tác ghi này)
 */
export async function initAllowedUsersCollection(): Promise<AllowedUserRecord[]> {
  const seededList: AllowedUserRecord[] = [];

  for (const email of INITIAL_ALLOWED_EMAILS) {
    const isAdmin = ADMIN_EMAILS.some(a => a.toLowerCase() === email.toLowerCase());
    try {
      const docRef = doc(db, 'allowed_users', email);
      const snap = await getDoc(docRef);
      if (!snap.exists()) {
        const newRecord: AllowedUserRecord = {
          email: email.toLowerCase(),
          role: isAdmin ? 'admin' : 'teacher',
          status: 'active',
          note: isAdmin ? 'Quản trị viên hệ thống' : 'Tài khoản giáo viên khởi tạo mặc định',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await setDoc(docRef, newRecord);
        seededList.push(newRecord);
        console.log(`[Firestore] Đã khởi tạo allowed_user: ${email}`);
      } else {
        seededList.push(snap.data() as AllowedUserRecord);
      }
    } catch (err) {
      console.warn(`[Firestore] Kiểm tra/Khởi tạo allowed_user ${email}:`, err);
    }
  }

  return seededList;
}

/**
 * Tải danh sách tất cả email được phép truy cập từ bảng allowed_users trong Firestore
 */
export async function getAllowedUsersFromFirestore(): Promise<AllowedUserRecord[]> {
  const path = 'allowed_users';
  try {
    const snapshot = await getDocs(collection(db, 'allowed_users'));
    const list: AllowedUserRecord[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && data.email) {
        list.push({
          email: data.email,
          role: data.role || 'teacher',
          status: data.status || 'active',
          note: data.note || '',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        });
      }
    });

    // Nếu trên Firestore chưa có, trả về danh sách mặc định
    if (list.length === 0) {
      return INITIAL_ALLOWED_EMAILS.map(email => ({
        email,
        role: 'teacher',
        status: 'active',
        note: 'Khởi tạo mặc định'
      }));
    }

    return list;
  } catch (error) {
    console.warn('Lỗi khi đọc allowed_users từ Firestore (fallback sang danh sách gốc):', error);
    return INITIAL_ALLOWED_EMAILS.map(email => ({
      email,
      role: 'teacher',
      status: 'active',
      note: 'Khởi tạo mặc định'
    }));
  }
}

/**
 * Thêm một email mới vào bảng allowed_users trên Firestore
 */
export async function addAllowedUserToFirestore(
  email: string, 
  role: string = 'teacher',
  note: string = ''
): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const path = `allowed_users/${normalizedEmail}`;
  try {
    await setDoc(doc(db, 'allowed_users', normalizedEmail), {
      email: normalizedEmail,
      role,
      status: 'active',
      note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Xóa một email khỏi bảng allowed_users trên Firestore
 */
export async function removeAllowedUserFromFirestore(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const path = `allowed_users/${normalizedEmail}`;
  try {
    await deleteDoc(doc(db, 'allowed_users', normalizedEmail));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Đồng bộ thông tin profile người dùng lên Firestore /users/{userId}
 */
export async function syncUserProfile(user: User): Promise<void> {
  const path = `users/${user.uid}`;
  try {
    await setDoc(doc(db, 'users', user.uid), {
      userId: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      lastLoginAt: new Date().toISOString(),
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Lưu cài đặt ứng dụng (giáo viên, trường học, năm học) lên Firestore
 */
export async function saveSettingsToFirestore(userId: string, settings: AppSettings): Promise<void> {
  const path = `users/${userId}/settings/current`;
  try {
    await setDoc(doc(db, 'users', userId, 'settings', 'current'), {
      teacherName: settings.teacherName,
      schoolName: settings.schoolName,
      schoolYear: settings.schoolYear,
      approverTitle: settings.approverTitle,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Tải cài đặt người dùng từ Firestore
 */
export async function loadSettingsFromFirestore(userId: string): Promise<AppSettings | null> {
  const path = `users/${userId}/settings/current`;
  try {
    const snap = await getDoc(doc(db, 'users', userId, 'settings', 'current'));
    if (snap.exists()) {
      const data = snap.data();
      return {
        teacherName: data.teacherName || '',
        schoolName: data.schoolName || '',
        schoolYear: data.schoolYear || '',
        approverTitle: data.approverTitle || '',
      };
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Lưu kế hoạch bài dạy đã tạo lên Firestore
 */
export async function saveWeeklyPlanToFirestore(
  userId: string, 
  plan: GeneratedWeeklyPlan
): Promise<string> {
  const planId = `plan_w${plan.weekNumber}_${Date.now()}`;
  const path = `users/${userId}/saved_plans/${planId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'saved_plans', planId), {
      planId,
      userId,
      weekNumber: plan.weekNumber,
      planTitle: `Kế hoạch bài dạy Tuần ${plan.weekNumber} (${plan.weekCalendar.startDate} - ${plan.weekCalendar.endDate})`,
      schoolYear: plan.settings.schoolYear,
      contentJson: JSON.stringify(plan),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return planId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Tải danh sách các kế hoạch bài dạy đã lưu trên Firestore
 */
export async function loadSavedPlansFromFirestore(
  userId: string
): Promise<Array<{ id: string; title: string; weekNumber: number; savedAt: string; plan: GeneratedWeeklyPlan }>> {
  const path = `users/${userId}/saved_plans`;
  try {
    const snapshot = await getDocs(collection(db, 'users', userId, 'saved_plans'));
    const results: Array<{ id: string; title: string; weekNumber: number; savedAt: string; plan: GeneratedWeeklyPlan }> = [];
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.contentJson) {
        try {
          const plan: GeneratedWeeklyPlan = JSON.parse(data.contentJson);
          results.push({
            id: docSnap.id,
            title: data.planTitle || `Tuần ${data.weekNumber}`,
            weekNumber: data.weekNumber || plan.weekNumber,
            savedAt: data.createdAt || data.updatedAt || '',
            plan
          });
        } catch (e) {
          console.warn('Failed to parse saved plan:', docSnap.id);
        }
      }
    });

    return results.sort((a, b) => b.weekNumber - a.weekNumber);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Xóa một kế hoạch bài dạy trên Firestore
 */
export async function deleteSavedPlanFromFirestore(userId: string, planId: string): Promise<void> {
  const path = `users/${userId}/saved_plans/${planId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'saved_plans', planId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Lưu lịch tuần và thời khóa biểu lên Firestore
 */
export async function saveScheduleToFirestore(
  userId: string, 
  weekNumber: number, 
  calendar: WeekCalendar, 
  timetable: TimetableRow[]
): Promise<void> {
  const scheduleId = `week_${weekNumber}`;
  const path = `users/${userId}/schedules/${scheduleId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'schedules', scheduleId), {
      weekNumber,
      userId,
      startDate: calendar.startDate,
      endDate: calendar.endDate,
      holidays: calendar.holidays,
      timetableJson: JSON.stringify(timetable),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Tải lịch tuần và thời khóa biểu từ Firestore
 */
export async function loadScheduleFromFirestore(
  userId: string, 
  weekNumber: number
): Promise<{ timetable: TimetableRow[] } | null> {
  const scheduleId = `week_${weekNumber}`;
  const path = `users/${userId}/schedules/${scheduleId}`;
  try {
    const snap = await getDoc(doc(db, 'users', userId, 'schedules', scheduleId));
    if (snap.exists()) {
      const data = snap.data();
      if (data.timetableJson) {
        try {
          return { timetable: JSON.parse(data.timetableJson) };
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}
