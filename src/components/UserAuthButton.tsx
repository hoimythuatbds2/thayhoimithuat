import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Loader2, AlertCircle, ExternalLink, ShieldCheck, Crown } from 'lucide-react';

export const UserAuthButton: React.FC = () => {
  const { user, loading, authError, signInWithGoogle, logout, clearAuthError, isAdmin } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {loading ? (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-xs font-medium">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
          <span>Đang kết nối...</span>
        </div>
      ) : user ? (
        <div>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer group"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-7 h-7 rounded-full object-cover border border-indigo-200 ring-2 ring-indigo-50"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                {(user.displayName || user.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors truncate max-w-[130px]">
                {user.displayName || 'Giáo viên'}
              </div>
              <div className="text-[10px] text-slate-400 leading-tight truncate max-w-[130px]">
                {user.email}
              </div>
            </div>
          </button>

          {/* User Profile Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-10 h-10 rounded-full object-cover border border-indigo-200"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {user.displayName || 'Giáo viên'}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Xác thực Firebase Auth (Google)</span>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded-md border border-purple-200 mt-1.5">
                    <Crown className="w-3.5 h-3.5 text-purple-600" />
                    <span>Quản trị viên (Admin)</span>
                  </div>
                )}
              </div>

              <div className="p-1">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất tài khoản</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => signInWithGoogle()}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer"
        >
          {/* Official Google 'G' vector badge */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.36 7.37 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.99 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Đăng nhập Google</span>
        </button>
      )}

      {/* Auth Error Toast/Notification */}
      {authError && (
        <div className="absolute right-0 top-12 w-80 bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl shadow-lg z-50 animate-in fade-in">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Lỗi đăng nhập Google</p>
              <p className="text-[11px] text-rose-700 mt-0.5">{authError}</p>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => clearAuthError()}
                  className="text-[10px] font-semibold text-rose-800 hover:underline cursor-pointer"
                >
                  Đóng
                </button>
                <a
                  href={window.location.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-semibold text-indigo-700 hover:underline flex items-center gap-0.5"
                >
                  Mở tab mới <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
