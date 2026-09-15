import React, { useState, useEffect } from 'react';
import { 
  loadSavedPlansFromFirestore, 
  deleteSavedPlanFromFirestore 
} from '../services/firestoreService';
import { GeneratedWeeklyPlan } from '../types';
import { 
  Cloud, 
  Trash2, 
  Download, 
  Calendar, 
  FileText, 
  Loader2, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Clock
} from 'lucide-react';

interface SavedPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSelectPlan: (plan: GeneratedWeeklyPlan) => void;
  onShowToast: (msg: string) => void;
}

export const SavedPlansModal: React.FC<SavedPlansModalProps> = ({
  isOpen,
  onClose,
  userId,
  onSelectPlan,
  onShowToast
}) => {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Array<{ id: string; title: string; weekNumber: number; savedAt: string; plan: GeneratedWeeklyPlan }>>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await loadSavedPlansFromFirestore(userId);
      setPlans(data);
    } catch (err) {
      console.error('Lỗi khi tải kế hoạch từ Firestore:', err);
      onShowToast('Không thể tải danh sách từ Firestore. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && userId) {
      fetchPlans();
    }
  }, [isOpen, userId]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Bạn có chắc chắn muốn xóa kế hoạch bài dạy này khỏi Firestore?')) return;
    setDeletingId(id);
    try {
      await deleteSavedPlanFromFirestore(userId, id);
      setPlans(prev => prev.filter(p => p.id !== id));
      onShowToast('Đã xóa kế hoạch khỏi Firestore Cloud.');
    } catch (err) {
      console.error('Lỗi xóa kế hoạch:', err);
      onShowToast('Xóa thất bại. Vui lòng kiểm tra quyền kết nối.');
    } finally {
      setDeletingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Kế hoạch đã lưu trên Firestore</h3>
              <p className="text-xs text-slate-500">Đồng bộ đám mây thời gian thực trên Cloud Firestore Database</p>
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Đang tải dữ liệu từ Firestore...</p>
            </div>
          ) : plans.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-slate-50/80 rounded-2xl border border-dashed border-slate-200 p-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-700 text-sm">Chưa có kế hoạch nào được lưu trên Cloud</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Sau khi bấm <strong>"Khởi tạo Kế hoạch Bài dạy"</strong>, bạn có thể bấm nút <strong>"Lưu lên Firestore"</strong> để lưu trữ lâu dài trên đám mây.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {plans.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectPlan(item.plan);
                    onClose();
                    onShowToast(`Đã nạp Kế hoạch Bài dạy Tuần ${item.weekNumber} từ Firestore.`);
                  }}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                      T{item.weekNumber}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {item.plan.weekCalendar?.startDate} – {item.plan.weekCalendar?.endDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {item.savedAt ? new Date(item.savedAt).toLocaleString('vi-VN') : 'Đã lưu'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleDelete(item.id, e)}
                      disabled={deletingId === item.id}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Xóa khỏi Cloud Firestore"
                    >
                      {deletingId === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                    <div className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-2xs group-hover:bg-indigo-700 transition-colors flex items-center gap-1.5">
                      <span>Mở xem</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Cơ sở dữ liệu Firestore đang hoạt động
          </span>
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
