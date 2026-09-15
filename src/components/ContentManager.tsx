import React, { useRef, useState } from 'react';
import { MasterContentMeta } from '../types';
import { BookOpen, Upload, CheckCircle2, RefreshCw, Lock } from 'lucide-react';

interface Props {
  contents: MasterContentMeta[];
  onUpdateSingleContent: (grade: number, newFileName: string) => void;
  onUpdateAllContents: () => void;
  onResetToDefault: () => void;
}

export const ContentManager: React.FC<Props> = ({ 
  contents, 
  onUpdateSingleContent, 
  onUpdateAllContents,
  onResetToDefault 
}) => {
  const [activeGradeForUpload, setActiveGradeForUpload] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTriggerUpload = (grade: number) => {
    setActiveGradeForUpload(grade);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeGradeForUpload !== null) {
      onUpdateSingleContent(activeGradeForUpload, file.name);
    }
    e.target.value = '';
    setActiveGradeForUpload(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[11px] uppercase tracking-wider">
              Khu vực 3
            </span>
            <h2 className="text-sm font-bold text-slate-800">MASTER CONTENT THEO KHỐI</h2>
          </div>
          <button
            onClick={onResetToDefault}
            title="Khôi phục Master Content chuẩn gốc (k1.pdf - k5.pdf)"
            className="text-[11px] text-slate-500 hover:text-emerald-600 flex items-center gap-1 font-medium transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Chuẩn gốc
          </button>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".pdf,.docx,.doc" 
          className="hidden" 
        />

        <div className="overflow-x-auto rounded-xl border border-slate-200 mb-3">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Khối</th>
                <th className="py-2.5 px-3">Nguồn File Hiện Tại</th>
                <th className="py-2.5 px-3 text-center">Trạng thái</th>
                <th className="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {contents.map((item) => (
                <tr key={item.grade} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2 px-3">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                      <BookOpen className="w-3 h-3 text-indigo-600" />
                      K{item.grade}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-800 font-semibold font-mono text-xs">
                    {item.fileName}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {item.lessonCount} tuần
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleTriggerUpload(item.grade)}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer border border-transparent hover:border-emerald-200"
                      title="Yêu cầu mật khẩu để thay đổi Master Content"
                    >
                      <Lock className="w-2.5 h-2.5 text-slate-400" />
                      [ THAY K{item.grade} ]
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[11px] text-slate-500 italic mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 flex items-center justify-between">
          <span>Quy tắc: K1 chỉ cho Khối 1, K2 chỉ cho Khối 2... Nội dung Source-Locked.</span>
          <span className="font-semibold text-emerald-700 inline-flex items-center gap-1 shrink-0 ml-2">
            <Lock className="w-3 h-3" /> Yêu cầu mật khẩu xác thực
          </span>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={onUpdateAllContents}
          className="w-full py-2.5 px-4 rounded-xl border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>[ CẬP NHẬT TOÀN BỘ MASTER CONTENT ]</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium border border-emerald-200">
            <Lock className="w-3 h-3 text-emerald-600" /> Cần mật khẩu
          </span>
        </button>
      </div>
    </div>
  );
};
