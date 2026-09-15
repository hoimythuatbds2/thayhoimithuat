import React, { useState, useEffect } from 'react';
import { AppSettings } from '../types';
import { X, Save, Check, School, User, Calendar, FileSignature, Lock } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose, settings, onSave }) => {
  const [formData, setFormData] = useState<AppSettings>({ 
    ...settings,
    masterPassword: settings.masterPassword || ''
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...settings,
        masterPassword: settings.masterPassword || ''
      });
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              ⚙
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">CÀI ĐẶT HỆ THỐNG</h2>
              <p className="text-xs text-slate-500">Thông tin giáo viên & hành chính xuất văn bản</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400" />
              1. Họ và tên giáo viên
            </label>
            <input
              type="text"
              required
              value={formData.teacherName}
              onChange={e => setFormData({ ...formData, teacherName: e.target.value })}
              placeholder="VD: Nguyễn Văn Hợi"
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <School className="w-3.5 h-3.5 text-slate-400" />
              2. Tên trường
            </label>
            <input
              type="text"
              required
              value={formData.schoolName}
              onChange={e => setFormData({ ...formData, schoolName: e.target.value })}
              placeholder="VD: Trường Tiểu học Bảo Đài số 2"
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              3. Năm học
            </label>
            <input
              type="text"
              required
              value={formData.schoolYear}
              onChange={e => setFormData({ ...formData, schoolYear: e.target.value })}
              placeholder="VD: 2026 - 2027"
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <FileSignature className="w-3.5 h-3.5 text-slate-400" />
              4. Người trình ký (Chức danh)
            </label>
            <textarea
              rows={2}
              required
              value={formData.approverTitle}
              onChange={e => setFormData({ ...formData, approverTitle: e.target.value })}
              placeholder="VD: CHUYÊN MÔN NHÀ TRƯỜNG&#10;TỔ TRƯỞNG ( TỔ PHÓ )"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">Xuất hiện ở vị trí ký duyệt phía bên phải của trang cuối.</p>
          </div>

          <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                5. Mật khẩu thay đổi Master Template & Content
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                Bảo vệ tài liệu nguồn
              </span>
            </div>
            <input
              type="text"
              value={formData.masterPassword || ''}
              onChange={e => setFormData({ ...formData, masterPassword: e.target.value })}
              placeholder="Nhập mật khẩu quản trị..."
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-bold text-indigo-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Bắt buộc nhập mật khẩu khi thay đổi Master Template hoặc Master Content.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm flex items-center gap-2 transition-colors"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  ĐÃ LƯU THÀNH CÔNG
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  LƯU CÀI ĐẶT
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
