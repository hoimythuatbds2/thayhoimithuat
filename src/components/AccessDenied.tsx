import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldX, LogOut, RefreshCw, AlertTriangle, Mail, CheckCircle2 } from 'lucide-react';

export const AccessDenied: React.FC = () => {
  const { user, allowedEmails, logout, switchAccount } = useAuth();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleSwitchAccount = async () => {
    setIsSwitching(true);
    try {
      await switchAccount();
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 flex items-center justify-center p-4 sm:p-6 selection:bg-rose-500 selection:text-white">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-rose-100 p-7 sm:p-9 space-y-6 text-center">
          {/* Header Icon */}
          <div className="w-18 h-18 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner border border-rose-200">
            <ShieldX className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold tracking-wider uppercase border border-rose-200">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Từ chối quyền truy cập (403)
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Tài khoản không được phép
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Hệ thống đã chặn quyền truy cập đối với tài khoản Google này.
            </p>
          </div>

          {/* User's attempted email */}
          <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200/80 text-left space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-semibold text-xs">
              <Mail className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Tài khoản bạn vừa đăng nhập:</span>
            </div>
            <div className="bg-white px-3 py-2 rounded-xl border border-rose-200 font-mono text-xs font-bold text-rose-800 break-all">
              {user?.email || 'Không xác định'}
            </div>
            <p className="text-[11px] text-rose-700 leading-relaxed">
              Địa chỉ email trên <strong>không nằm trong danh sách giáo viên được cấp quyền</strong> sử dụng ứng dụng kế hoạch bài dạy.
            </p>
          </div>

          {/* Whitelisted emails note */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2.5">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Chỉ cho phép các email sau truy cập:</span>
            </div>
            <ul className="space-y-1.5 font-mono text-xs text-slate-700">
              {allowedEmails.map((email) => (
                <li key={email} className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold text-indigo-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>{email}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleSwitchAccount}
              disabled={isSwitching}
              className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSwitching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang chuyển tài khoản...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Đăng nhập bằng tài khoản khác</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => logout()}
              className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-slate-500" />
              <span>Đăng xuất hoàn toàn</span>
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-4">
          Nếu bạn là giáo viên phụ trách, vui lòng liên hệ quản trị viên để cập nhật danh sách email.
        </p>
      </div>
    </div>
  );
};
