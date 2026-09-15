import React, { useRef, useState } from 'react';
import { MasterTemplateMeta } from '../types';
import { FileText, Upload, AlertTriangle, CheckCircle2, RefreshCw, Lock, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';

interface Props {
  template: MasterTemplateMeta;
  onUpdateTemplate: (newTemplate: MasterTemplateMeta) => void;
  onResetToDefault: () => void;
}

export const TemplateManager: React.FC<Props> = ({ template, onUpdateTemplate, onResetToDefault }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Password & Server Verification state
  const [templatePassword, setTemplatePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [serverVerificationError, setServerVerificationError] = useState<string | null>(null);
  const [serverVerified, setServerVerified] = useState(false);

  // Pending file replacement state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // Call Server to verify password against secret TEMPLATE_PASSWORD
  const verifyPasswordWithServer = async (passwordToVerify: string): Promise<boolean> => {
    setIsVerifying(true);
    setServerVerificationError(null);

    try {
      const response = await fetch('/api/verify-template-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordToVerify })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setServerVerified(true);
        setServerVerificationError(null);
        setIsVerifying(false);
        return true;
      } else {
        setServerVerified(false);
        setServerVerificationError(data.error || 'Mật khẩu không chính xác! Vui lòng kiểm tra lại.');
        setIsVerifying(false);
        return false;
      }
    } catch (err) {
      console.error('Lỗi khi kết nối tới Server xác thực:', err);
      setServerVerified(false);
      setServerVerificationError('Không thể kết nối đến máy chủ xác thực hoặc mật khẩu sai. Vui lòng thử lại!');
      setIsVerifying(false);
      return false;
    }
  };

  // User initiates changing Master Template
  const handleInitiateChange = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = templatePassword.trim();
    if (!trimmed) {
      setServerVerificationError('Vui lòng nhập mật khẩu trước khi thay Master Template!');
      passwordInputRef.current?.focus();
      return;
    }

    const isValid = await verifyPasswordWithServer(trimmed);
    if (isValid) {
      // Server approved: allow user to select new file
      fileInputRef.current?.click();
    } else {
      passwordInputRef.current?.focus();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'docx' || ext === 'pdf') {
        setPendingFile(file);
        setShowConfirmModal(true);
      } else {
        alert('Vui lòng chọn file định dạng .DOCX hoặc .PDF');
      }
    }
    // reset input value so re-uploading same file triggers change
    e.target.value = '';
  };

  const confirmReplacement = () => {
    if (pendingFile) {
      const ext = pendingFile.name.split('.').pop()?.toLowerCase() as 'docx' | 'pdf';
      onUpdateTemplate({
        fileName: pendingFile.name,
        fileType: ext,
        uploadedAt: new Date().toLocaleDateString('vi-VN'),
        isCustom: true,
        version: 'Bản người dùng tải lên'
      });
    }
    setShowConfirmModal(false);
    setPendingFile(null);
  };

  const cancelReplacement = () => {
    setShowConfirmModal(false);
    setPendingFile(null);
  };

  const handleResetWithPassword = async () => {
    const trimmed = templatePassword.trim();
    if (!trimmed) {
      setServerVerificationError('Vui lòng nhập mật khẩu phía dưới để khôi phục Master Template mặc định!');
      passwordInputRef.current?.focus();
      return;
    }

    const isValid = await verifyPasswordWithServer(trimmed);
    if (isValid) {
      onResetToDefault();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[11px] uppercase tracking-wider">
              Khu vực 2
            </span>
            <h2 className="text-sm font-bold text-slate-800">MASTER TEMPLATE</h2>
          </div>
          {template.isCustom && (
            <button
              onClick={handleResetWithPassword}
              title="Khôi phục Master Template mặc định (cần mật khẩu)"
              className="text-[11px] text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Mặc định
            </button>
          )}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
          <div className="text-xs text-slate-500 font-medium mb-1">MASTER TEMPLATE HIỆN TẠI:</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm text-slate-900 truncate">
                {template.fileName}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <span>{template.fileType.toUpperCase()}</span>
                <span>•</span>
                <span>{template.version}</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center text-emerald-600 font-semibold text-xs gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Chuẩn Format
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-600 space-y-1 mb-4 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
          <div className="font-bold text-amber-900 text-[11px]">Format Map Bảo Toàn:</div>
          <p className="text-[11px] text-slate-600">
            • Khổ giấy A4 • Font: Times New Roman • Cỡ chữ 12–14pt • Header & Footer chuẩn • Bảng báo bài 7 cột • Bảng HĐDH 2 cột (HĐ GV / HĐ HS)
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100">
        {/* Password input section required before changing Master Template */}
        <div className="mb-3 bg-slate-50/80 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              Mật khẩu thay Master Template
            </label>
            <span className="text-[10px] font-medium text-slate-400">
              Secret: TEMPLATE_PASSWORD
            </span>
          </div>

          <div className="relative">
            <input
              ref={passwordInputRef}
              type={showPassword ? 'text' : 'password'}
              value={templatePassword}
              onChange={(e) => {
                setTemplatePassword(e.target.value);
                if (serverVerificationError) setServerVerificationError(null);
                if (serverVerified) setServerVerified(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleInitiateChange();
                }
              }}
              placeholder="Nhập secret TEMPLATE_PASSWORD..."
              className={`w-full pl-3 pr-10 py-2 text-xs font-medium bg-white rounded-lg border focus:outline-none transition-all ${
                serverVerificationError
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : serverVerified
                  ? 'border-emerald-500 ring-2 ring-emerald-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              title={showPassword ? 'Ẩn mật khẩu' : 'Xem mật khẩu'}
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Verification status feedback */}
          {serverVerificationError && (
            <div className="mt-2 text-xs text-rose-600 font-medium flex items-center gap-1.5 bg-rose-50 px-2.5 py-1.5 rounded-md border border-rose-200">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{serverVerificationError}</span>
            </div>
          )}

          {serverVerified && !serverVerificationError && (
            <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Server xác thực chính xác! Đã mở khóa quyền thay Master Template.</span>
            </div>
          )}

          <div className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-slate-400" />
            <span>Mật khẩu được Server bảo mật đối chiếu với secret <strong>TEMPLATE_PASSWORD</strong>.</span>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".docx,.pdf"
          className="hidden"
        />

        <button
          type="button"
          onClick={handleInitiateChange}
          disabled={isVerifying}
          className="w-full py-2.5 px-4 rounded-xl border border-indigo-200 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-60"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SERVER ĐANG KIỂM ĐỊNH MẬT KHẨU...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>THAY MASTER TEMPLATE (TUAN_01.pdf)</span>
            </>
          )}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 text-center mb-1">
              Xác nhận thay thế Master Template
            </h3>
            <div className="text-xs text-emerald-700 font-semibold text-center mb-4 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã kiểm định mật khẩu thành công qua Server Secret</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 mb-6 space-y-1.5">
              <div>• File mới: <span className="font-bold text-slate-900">{pendingFile?.name}</span></div>
              <div>• Định dạng: <span className="font-bold text-indigo-700 uppercase">{pendingFile?.name.split('.').pop()}</span></div>
              <div>• Bảo toàn: Cấu trúc báo bài, phân phối chương trình, lịch tuần và cài đặt.</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={cancelReplacement}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={confirmReplacement}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Xác nhận thay thế ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

