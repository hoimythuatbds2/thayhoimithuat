import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Sparkles, AlertCircle, ExternalLink, BookOpen, Layers } from 'lucide-react';

export const LoginGate: React.FC = () => {
  const { signInWithGoogle, authError, clearAuthError } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    clearAuthError();
    try {
      await signInWithGoogle();
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-7 sm:p-9 space-y-6">
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold tracking-wide uppercase mb-2 border border-indigo-100">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Cổng xác thực Firebase
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                TRỢ LÝ KẾ HOẠCH BÀI DẠY MĨ THUẬT
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Trường Tiểu học Bảo Đài số 2 • Năm học 2026 - 2027
              </p>
            </div>
          </div>

          {/* Access Control Notice */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
              <Lock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Yêu cầu đăng nhập tài khoản giáo viên</span>
            </div>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              Hệ thống được bảo vệ bởi <strong>Firebase Authentication</strong>. Vui lòng đăng nhập bằng tài khoản Google để mở khóa toàn bộ chức năng:
            </p>
            <ul className="text-[11px] text-slate-600 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                <span>Bảo toàn <strong>Master Template</strong> (TUAN_01.pdf) chuẩn quy chế</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                <span>Nguồn bài dạy <strong>Master Content</strong> khối 1, 2, 3, 4, 5</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                <span>Phân phối chương trình 35 tuần & xuất file Word/PDF</span>
              </li>
            </ul>
          </div>

          {/* Error Message if any */}
          {authError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs space-y-2.5 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-900 text-xs">Từ chối truy cập (Server Auth)</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 text-rose-900">
                      Đã tự động đăng xuất
                    </span>
                  </div>
                  <p className="text-[11.5px] text-rose-700 leading-relaxed font-medium">{authError}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-rose-200/60 text-[11px]">
                <button
                  type="button"
                  onClick={clearAuthError}
                  className="font-semibold text-rose-700 hover:text-rose-900 cursor-pointer hover:underline"
                >
                  Đóng thông báo
                </button>
                <span className="text-[10.5px] text-rose-500 italic">
                  Chỉ cho phép tài khoản trong bảng allowed_users
                </span>
              </div>
            </div>
          )}

          {/* Google Sign-In Button */}
          <div>
            <button
              type="button"
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="w-full py-3.5 px-4 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 group active:scale-[0.99]"
            >
              {isSigningIn ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang kết nối tới Google...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
                  <span className="group-hover:text-indigo-600 transition-colors">
                    Đăng nhập bằng tài khoản Google
                  </span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-500 mt-3 font-medium">
              Chỉ cho phép tài khoản được cấp quyền truy cập:
              <br />
              <span className="font-mono text-indigo-600 font-bold text-[10.5px]">nguyenhoi.it@gmail.com</span> • <span className="font-mono text-indigo-600 font-bold text-[10.5px]">mithuat.cungchiase@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Bottom branding footer */}
        <div className="text-center mt-6 text-slate-400 text-xs flex items-center justify-center gap-3">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Môn Mĩ thuật
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Khối 1 - Khối 5
          </span>
          <span>•</span>
          <span>PGD & ĐT</span>
        </div>
      </div>
    </div>
  );
};
