import React, { useState, useEffect } from 'react';
import { 
  getAllowedUsersFromFirestore, 
  addAllowedUserToFirestore, 
  removeAllowedUserFromFirestore,
  initAllowedUsersCollection,
  INITIAL_ALLOWED_EMAILS
} from '../services/firestoreService';
import { AllowedUserRecord } from '../types';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Trash2, 
  Shield, 
  X, 
  Loader2, 
  CheckCircle2, 
  Mail, 
  Database,
  RefreshCw
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  onUsersUpdated?: () => void;
}

export const AllowedUsersModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onShowToast,
  onUsersUpdated
}) => {
  const [users, setUsers] = useState<AllowedUserRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Giáo viên Mĩ thuật');
  const [isAdding, setIsAdding] = useState(false);
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // First ensure initial seed exists
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

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailToInsert = newEmail.trim().toLowerCase();
    if (!emailToInsert || !emailToInsert.includes('@')) {
      onShowToast('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
    }

    if (users.some(u => u.email.toLowerCase() === emailToInsert)) {
      onShowToast(`Email ${emailToInsert} đã tồn tại trong bảng allowed_users!`);
      return;
    }

    setIsAdding(true);
    try {
      await addAllowedUserToFirestore(emailToInsert, newRole, 'Thêm bởi quản trị viên');
      onShowToast(`Đã thêm thành công ${emailToInsert} vào bảng allowed_users trên Firestore!`);
      setNewEmail('');
      await fetchUsers();
      if (onUsersUpdated) onUsersUpdated();
    } catch (err) {
      console.error('Lỗi thêm user:', err);
      onShowToast('Thêm thất bại. Vui lòng kiểm tra quyền truy cập.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (email: string) => {
    if (INITIAL_ALLOWED_EMAILS.includes(email)) {
      alert(`Không thể xóa email hệ thống mặc định (${email})!`);
      return;
    }

    if (!confirm(`Bạn có chắc muốn xóa quyền truy cập của email: ${email}?`)) {
      return;
    }

    setDeletingEmail(email);
    try {
      await removeAllowedUserFromFirestore(email);
      onShowToast(`Đã xóa ${email} khỏi bảng allowed_users trên Firestore.`);
      await fetchUsers();
      if (onUsersUpdated) onUsersUpdated();
    } catch (err) {
      console.error('Lỗi xóa user:', err);
      onShowToast('Xóa thất bại. Vui lòng thử lại.');
    } finally {
      setDeletingEmail(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Database className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">Bảng allowed_users (Firestore)</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {users.length} email
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Danh sách các tài khoản Google được cấp phép đăng nhập và sử dụng ứng dụng
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add new user form */}
        <div className="p-5 border-b border-slate-100 bg-indigo-50/30">
          <form onSubmit={handleAdd} className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5 text-indigo-600" />
              Thêm email được phép sử dụng
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="nhập email mới (VD: giaovien@gmail.com)"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
              </div>
              <button
                type="submit"
                disabled={isAdding || !newEmail.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shrink-0"
              >
                {isAdding ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                <span>Thêm vào Firestore</span>
              </button>
            </div>
          </form>
        </div>

        {/* List of allowed users */}
        <div className="p-6 overflow-y-auto flex-1 space-y-2.5">
          {loading ? (
            <div className="py-12 text-center space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mx-auto" />
              <p className="text-xs text-slate-500">Đang đọc bảng allowed_users từ Firestore...</p>
            </div>
          ) : (
            users.map((record) => {
              const isDefault = INITIAL_ALLOWED_EMAILS.includes(record.email);
              return (
                <div
                  key={record.email}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isDefault 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isDefault ? (
                        <Shield className="w-4 h-4" />
                      ) : (
                        <UserCheck className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-800 font-mono truncate">
                          {record.email}
                        </span>
                        {isDefault && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                            Mặc định
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-100 text-emerald-800">
                          {record.status === 'active' ? 'Đang kích hoạt' : 'Tạm khóa'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {record.note || record.role || 'Giáo viên Mĩ thuật'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!isDefault && (
                      <button
                        type="button"
                        onClick={() => handleDelete(record.email)}
                        disabled={deletingEmail === record.email}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Xóa quyền truy cập"
                      >
                        {deletingEmail === record.email ? (
                          <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Làm mới từ Cloud
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 font-semibold text-slate-700 cursor-pointer text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
