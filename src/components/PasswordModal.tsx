import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, ShieldAlert, CheckCircle2, X, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
  targetName?: string;
  targetType?: 'template' | 'content';
  configuredPassword?: string;
}

export const PasswordModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Yêu cầu mật khẩu xác thực',
  description = 'Vui lòng nhập mật khẩu để xác nhận thay đổi Master Template hoặc Master Content.',
  targetName,
  targetType = 'template',
  configuredPassword
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasswordInput('');
      setErrorMessage(null);
      setIsSuccess(false);
      setIsLoading(false);
      setShowPassword(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validPasswords = [
    configuredPassword
  ].filter(Boolean) as string[];

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = passwordInput.trim();
    if (!trimmed) {
      setErrorMessage('Vui lòng nhập mật khẩu để tiếp tục!');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Send request to server to verify against secret TEMPLATE_PASSWORD
      const res = await fetch('/api/verify-template-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: trimmed })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setErrorMessage(null);
        setIsSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 350);
      } else {
        setErrorMessage(data.error || 'Mật khẩu không chính xác! Vui lòng kiểm tra lại.');
      }
    } catch (err) {
      console.warn('Fallback checking password:', err);
      if (validPasswords.includes(trimmed)) {
        setErrorMessage(null);
        setIsSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 350);
      } else {
        setErrorMessage('Mật khẩu không chính xác! Vui lòng kiểm tra lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shadow-2xs">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                BẢO VỆ MASTER NGUỒN
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Xác thực phân quyền thay đổi hệ thống
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleVerify} className="p-6 space-y-4">
          {/* Target Info Banner */}
          <div className="bg-amber-50/80 rounded-xl p-3.5 border border-amber-200/80 text-xs">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-amber-900">
                  {title}
                </div>
                <div className="text-slate-600 leading-relaxed">
                  {description}
                </div>
                {targetName && (
                  <div className="pt-1 text-slate-700">
                    <span className="font-semibold">Mục tác động:</span>{' '}
                    <span className="font-mono font-bold text-indigo-900 bg-white px-1.5 py-0.5 rounded border border-amber-200">
                      {targetName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nhập mật khẩu quản trị
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Nhập mật khẩu xác thực..."
                className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 focus:bg-white border rounded-xl text-sm font-medium focus:outline-none transition-all ${
                  errorMessage
                    ? 'border-rose-400 ring-2 ring-rose-200'
                    : 'border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-xs text-rose-600 mt-1.5 font-medium flex items-center gap-1">
                <span>⚠️</span> {errorMessage}
              </p>
            )}

            {/* Security note */}
            <div className="mt-2.5 flex items-center gap-2 text-[11px] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Hệ thống yêu cầu mật khẩu xác thực để thay đổi tài liệu chuẩn.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSuccess || isLoading}
              className={`flex-1 py-2.5 px-4 rounded-xl text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                isSuccess
                  ? 'bg-emerald-600'
                  : isLoading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Đã xác thực thành công!
                </>
              ) : isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang đối soát Server...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Xác nhận & Mở khóa
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
