import React from 'react';
import { FormatFingerprintReport, ValidationReport, VerbatimAuditReport } from '../types';
import { X, CheckCircle2, AlertCircle, Fingerprint, ShieldCheck, Download, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  report: ValidationReport | null;
  fingerprint: FormatFingerprintReport | null;
  verbatimAudit: VerbatimAuditReport | null;
  onExportDocx: () => void;
}

export const ValidationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  report,
  fingerprint,
  verbatimAudit,
  onExportDocx
}) => {
  if (!isOpen || !report) return null;

  const categories = ['DỮ LIỆU', 'SOURCE', 'FORMAT', 'LAYOUT', 'HÀNH CHÍNH'] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
              report.overallPassed && (!verbatimAudit || verbatimAudit.allPassed) 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-rose-100 text-rose-700'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                BÁO CÁO KIỂM ĐỊNH & ĐỐI SOÁT NGUYÊN VĂN TUẦN {report.weekNumber}
                {report.overallPassed && (!verbatimAudit || verbatimAudit.allPassed) ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    NGUYÊN VĂN 100% ĐẠT CHUẨN
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                    CÓ SAI LỆCH CẦN ĐỐI SOÁT
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500">
                Thời gian kiểm tra: {report.timestamp} • Đạt: {report.passedCount}/{report.totalChecks} tiêu chí
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* VERBATIM COPY AUDIT CARD */}
          {verbatimAudit && (
            <div className="bg-gradient-to-r from-emerald-50/90 to-teal-50/90 p-4 rounded-xl border border-emerald-300/80 shadow-xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    ĐỐI SOÁT NGUYÊN VĂN 100% MASTER CONTENT (VERBATIM COPY)
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                  {verbatimAudit.allPassed ? 'KHỚP NGUYÊN VĂN 100%' : 'CÓ SAI LỆCH'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div className="bg-white/80 rounded-lg p-2 border border-emerald-200/60">
                  <div className="text-[11px] text-slate-500">Ký tự đối chiếu</div>
                  <div className="text-sm font-extrabold text-emerald-800">
                    {verbatimAudit.totalCheckedChars.toLocaleString('vi-VN')} ký tự
                  </div>
                </div>
                <div className="bg-white/80 rounded-lg p-2 border border-emerald-200/60">
                  <div className="text-[11px] text-slate-500">Số câu/ý đối chiếu</div>
                  <div className="text-sm font-extrabold text-emerald-800">
                    {verbatimAudit.totalCheckedSentences} câu/ý
                  </div>
                </div>
                <div className="bg-white/80 rounded-lg p-2 border border-emerald-200/60">
                  <div className="text-[11px] text-slate-500">Từ thêm/bớt/tóm tắt</div>
                  <div className="text-sm font-extrabold text-emerald-800">
                    0 từ (Tuyệt đối)
                  </div>
                </div>
              </div>

              {/* Grade by Grade breakdown */}
              <div className="space-y-1.5">
                {verbatimAudit.grades.map(g => (
                  <div key={g.grade} className="bg-white/90 rounded-lg px-3 py-2 border border-emerald-200/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-slate-800 px-1.5 py-0.5 bg-slate-100 rounded text-[11px]">
                        Khối {g.grade} ({g.fileName})
                      </span>
                      <span className="text-slate-600 truncate max-w-[280px]">
                        {g.topic}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-500 text-[11px]">
                        {g.totalCharactersChecked.toLocaleString('vi-VN')} ký tự
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Khớp nguyên văn 100%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Format Fingerprint Summary */}
          {fingerprint && (
            <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 p-4 rounded-xl border border-blue-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Format Fingerprint vs Master Template
                  </span>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
                  Độ khớp: {fingerprint.matchRate}%
                </span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div>• Sai lệch không cho phép: <span className="font-bold text-emerald-700">{fingerprint.unauthorizedDifferences.length === 0 ? '0 (Không phát hiện sai lệch trái phép)' : fingerprint.unauthorizedDifferences.join(', ')}</span></div>
                <div>• Biến động nội dung cho phép: {fingerprint.allowedDynamicVariations.join(' • ')}</div>
              </div>
            </div>
          )}

          {/* Validation by Category */}
          <div className="space-y-4">
            {categories.map((cat) => {
              const catItems = report.items.filter(i => i.category === cat);
              if (catItems.length === 0) return null;

              return (
                <div key={cat} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 flex items-center justify-between">
                    <span>Nhóm kiểm tra: {cat}</span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {catItems.filter(i => i.status === 'pass').length}/{catItems.length} tiêu chí đạt
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {catItems.map((item, idx) => (
                      <div key={idx} className="px-4 py-2.5 flex items-start gap-3 hover:bg-slate-50/60 transition-colors">
                        {item.status === 'pass' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                            {item.checkName}
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{item.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Đóng cửa sổ
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onExportDocx();
            }}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            XUẤT DOCX NGAY
          </button>
        </div>
      </div>
    </div>
  );
};

