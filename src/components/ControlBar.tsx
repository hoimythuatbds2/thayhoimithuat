import React, { useState } from 'react';
import { Play, CheckSquare, Download, Printer, ChevronRight, Layers, ArrowRight, Cloud, CloudUpload, FolderHeart } from 'lucide-react';

interface Props {
  currentWeek: number;
  onGeneratePlan: (week: number) => void;
  onValidatePlan: () => void;
  onExportDocx: () => void;
  onPrintPreview: () => void;
  onSaveToFirestore?: () => void;
  onOpenSavedPlans?: () => void;
  hasGeneratedPlan: boolean;
  isGenerating?: boolean;
  isSavingToCloud?: boolean;
}

export const ControlBar: React.FC<Props> = ({
  currentWeek,
  onGeneratePlan,
  onValidatePlan,
  onExportDocx,
  onPrintPreview,
  onSaveToFirestore,
  onOpenSavedPlans,
  hasGeneratedPlan,
  isGenerating,
  isSavingToCloud
}) => {
  const [targetWeek, setTargetWeek] = useState<number>(currentWeek);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchStart, setBatchStart] = useState<number>(2);
  const [batchEnd, setBatchEnd] = useState<number>(5);

  React.useEffect(() => {
    setTargetWeek(currentWeek);
  }, [currentWeek]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* KHU VỰC 6 — TẠO KHBD */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold text-[11px] uppercase tracking-wider">
              Khu vực 6
            </span>
            <h2 className="text-base font-bold text-slate-900">BỘ ĐIỀU KHIỂN TẠO KHBD</h2>
          </div>
          <p className="text-xs text-slate-500">
            Quy trình 21 bước: Trích xuất &rarr; Xác định &rarr; Đối chiếu &rarr; Ghép &rarr; Kiểm tra &rarr; Xuất
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick week navigation */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <span className="text-xs font-bold text-slate-600 px-2">Tuần:</span>
            <input
              type="number"
              min={1}
              max={35}
              value={targetWeek}
              onChange={e => setTargetWeek(parseInt(e.target.value, 10) || 1)}
              className="w-14 px-2 py-1 text-sm font-bold bg-white text-slate-900 rounded-lg text-center border border-slate-200 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => onGeneratePlan(targetWeek)}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer hover:shadow-indigo-200 active:scale-98 disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            {isGenerating ? 'ĐANG XỬ LÝ...' : `TẠO KHBD TUẦN ${targetWeek}`}
          </button>

          <button
            type="button"
            onClick={() => onGeneratePlan(targetWeek + 1)}
            disabled={targetWeek >= 35 || isGenerating}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40"
            title="Tạo tuần kế tiếp"
          >
            Tuần tiếp theo (+1) <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setShowBatchModal(true)}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
            title="Tạo nhiều tuần liên tiếp"
          >
            <Layers className="w-3.5 h-3.5 text-slate-600" /> Tạo nhiều tuần
          </button>
        </div>
      </div>

      {/* KHU VỰC 7 — KẾT QUẢ & XUẤT BẢN */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[11px] uppercase tracking-wider">
            Khu vực 7
          </span>
          <span className="text-xs font-bold text-slate-700">KẾT QUẢ & KIỂM ĐỊNH:</span>
          {hasGeneratedPlan ? (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Đã sẵn sàng xuất bản
            </span>
          ) : (
            <span className="text-xs text-slate-400 italic">Chưa tạo kế hoạch</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onValidatePlan}
            disabled={!hasGeneratedPlan}
            className="px-4 py-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
          >
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            KIỂM TRA KHBD (VALIDATE)
          </button>

          {onSaveToFirestore && (
            <button
              type="button"
              onClick={onSaveToFirestore}
              disabled={!hasGeneratedPlan || isSavingToCloud}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              title="Lưu trữ kế hoạch lên Google Cloud Firestore"
            >
              <CloudUpload className="w-4 h-4" />
              {isSavingToCloud ? 'ĐANG LƯU...' : 'LƯU LÊN FIRESTORE'}
            </button>
          )}

          {onOpenSavedPlans && (
            <button
              type="button"
              onClick={onOpenSavedPlans}
              className="px-3.5 py-2 border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Xem danh sách kế hoạch đã lưu trên Firestore"
            >
              <Cloud className="w-4 h-4 text-indigo-600" />
              KẾ HOẠCH CLOUD
            </button>
          )}

          <button
            type="button"
            onClick={onExportDocx}
            disabled={!hasGeneratedPlan}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            XUẤT DOCX
          </button>

          <button
            type="button"
            onClick={onPrintPreview}
            disabled={!hasGeneratedPlan}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            XUẤT PDF / IN
          </button>
        </div>
      </div>

      {/* Batch modal */}
      {showBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              TẠO KHBD NHIỀU TUẦN
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Hệ thống sẽ lần lượt tạo và kiểm định từng tuần theo đúng tiến độ khung năm học.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Từ tuần</label>
                <input
                  type="number"
                  min={1}
                  max={35}
                  value={batchStart}
                  onChange={e => setBatchStart(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-center"
                />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 mt-5" />
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Đến tuần</label>
                <input
                  type="number"
                  min={batchStart}
                  max={35}
                  value={batchEnd}
                  onChange={e => setBatchEnd(parseInt(e.target.value, 10) || batchStart)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-center"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowBatchModal(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowBatchModal(false);
                  onGeneratePlan(batchStart);
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                Bắt đầu tạo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
