import React, { useState } from 'react';
import { TimetableRow } from '../types';
import { getGradeFromClassName } from '../data/defaultData';
import { CURRICULUM_SYLLABUS } from '../data/masterContentData';
import { Plus, Trash2, Save, Check, RefreshCw } from 'lucide-react';

interface Props {
  weekNumber: number;
  timetable: TimetableRow[];
  onSaveTimetable: (rows: TimetableRow[]) => void;
  onResetTimetable: () => void;
}

export const TimetableEditor: React.FC<Props> = ({ 
  weekNumber, 
  timetable, 
  onSaveTimetable, 
  onResetTimetable 
}) => {
  const [rows, setRows] = useState<TimetableRow[]>([...timetable]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    setRows([...timetable]);
  }, [timetable]);

  const handleFieldChange = (id: string, field: keyof TimetableRow, value: any) => {
    setRows(prev => prev.map(row => {
      if (row.id !== id) return row;
      
      const updated = { ...row, [field]: value };
      
      // If className changes, re-evaluate grade and auto-sync topicName from syllabus if possible
      if (field === 'className') {
        const grade = getGradeFromClassName(value);
        updated.grade = grade;
        const syllabusItem = CURRICULUM_SYLLABUS[grade]?.find(s => s.week === weekNumber);
        if (syllabusItem) {
          updated.topicName = `${syllabusItem.topic} ${syllabusItem.period ? `(${syllabusItem.period})` : ''}`;
        }
      }
      return updated;
    }));
  };

  const handleAddRow = () => {
    const newRow: TimetableRow = {
      id: `tt_${Date.now()}`,
      dayOfWeek: 'Hai',
      session: 'Sáng',
      period: 1,
      subject: 'Mĩ thuật',
      className: '1B1',
      grade: 1,
      topicName: CURRICULUM_SYLLABUS[1]?.find(s => s.week === weekNumber)?.topic || 'Mĩ thuật lớp 1',
      equipment: 'SGK, VBT Mĩ thuật; đồ dùng học tập theo mục II'
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const handleSave = () => {
    onSaveTimetable(rows);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 1500);
  };

  // Distinct classes and grades summary
  const uniqueClasses = Array.from(new Set(rows.map(r => r.className))).sort();
  const uniqueGrades = Array.from(new Set(rows.map(r => r.grade || getGradeFromClassName(r.className)))).sort();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold text-[11px] uppercase tracking-wider">
              Khu vực 5
            </span>
            <h2 className="text-sm font-bold text-slate-800">
              BÁO BÀI TUẦN {weekNumber}
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
              {rows.length} tiết dạy
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Lớp sẽ tạo KHBD: <span className="font-bold text-slate-800">{uniqueClasses.join(', ') || 'Chưa có'}</span> ({uniqueGrades.map(g => `Khối ${g}`).join(', ')})
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetTimetable}
            title="Khôi phục lịch báo bài chuẩn tuần 1"
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-purple-700 hover:bg-slate-100 rounded-xl transition-colors font-medium flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Mặc định
          </button>
          <button
            type="button"
            onClick={handleAddRow}
            className="px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Thêm tiết
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" /> ĐÃ LƯU
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" /> LƯU BÁO BÀI
              </>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3 w-20">Thứ</th>
              <th className="py-2.5 px-3 w-20">Buổi</th>
              <th className="py-2.5 px-3 w-16 text-center">Tiết</th>
              <th className="py-2.5 px-3 w-24">Môn</th>
              <th className="py-2.5 px-3 w-20">Lớp</th>
              <th className="py-2.5 px-3">Tên bài (Chủ đề)</th>
              <th className="py-2.5 px-3 w-48">Thiết bị, đồ dùng</th>
              <th className="py-2.5 px-2 w-10 text-center">Xóa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-1.5 px-2">
                  <select
                    value={row.dayOfWeek}
                    onChange={e => handleFieldChange(row.id, 'dayOfWeek', e.target.value)}
                    className="w-full py-1 px-1.5 border border-slate-200 rounded-md text-xs bg-white font-medium focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="Hai">Hai</option>
                    <option value="Ba">Ba</option>
                    <option value="Tư">Tư</option>
                    <option value="Năm">Năm</option>
                    <option value="Sáu">Sáu</option>
                  </select>
                </td>
                <td className="py-1.5 px-2">
                  <select
                    value={row.session}
                    onChange={e => handleFieldChange(row.id, 'session', e.target.value)}
                    className="w-full py-1 px-1.5 border border-slate-200 rounded-md text-xs bg-white font-medium focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="Sáng">Sáng</option>
                    <option value="Chiều">Chiều</option>
                  </select>
                </td>
                <td className="py-1.5 px-2 text-center">
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={row.period}
                    onChange={e => handleFieldChange(row.id, 'period', parseInt(e.target.value, 10) || 1)}
                    className="w-12 text-center py-1 border border-slate-200 rounded-md text-xs font-semibold focus:ring-1 focus:ring-purple-500"
                  />
                </td>
                <td className="py-1.5 px-2">
                  <input
                    type="text"
                    value={row.subject}
                    onChange={e => handleFieldChange(row.id, 'subject', e.target.value)}
                    className="w-full py-1 px-1.5 border border-slate-200 rounded-md text-xs font-medium focus:ring-1 focus:ring-purple-500"
                  />
                </td>
                <td className="py-1.5 px-2">
                  <input
                    type="text"
                    value={row.className}
                    onChange={e => handleFieldChange(row.id, 'className', e.target.value.trim().toUpperCase())}
                    placeholder="1B1"
                    className="w-full py-1 px-1.5 border border-purple-300 bg-purple-50/40 rounded-md text-xs font-bold text-purple-900 focus:ring-1 focus:ring-purple-500 text-center"
                  />
                </td>
                <td className="py-1.5 px-2">
                  <input
                    type="text"
                    value={row.topicName}
                    onChange={e => handleFieldChange(row.id, 'topicName', e.target.value)}
                    className="w-full py-1 px-2 border border-slate-200 rounded-md text-xs font-medium focus:ring-1 focus:ring-purple-500"
                  />
                </td>
                <td className="py-1.5 px-2">
                  <input
                    type="text"
                    value={row.equipment}
                    onChange={e => handleFieldChange(row.id, 'equipment', e.target.value)}
                    className="w-full py-1 px-2 border border-slate-200 rounded-md text-xs text-slate-600 focus:ring-1 focus:ring-purple-500"
                  />
                </td>
                <td className="py-1.5 px-2 text-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(row.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 italic">
        <span>* Nguyên tắc cốt lõi: Chỉ tạo KHBD cho lớp có trong báo bài. Không tự sáng tác nội dung ngoài báo bài.</span>
        <span>Mẹo: Thay đổi lớp (VD: 1B1 &rarr; 4B1) sẽ tự động liên kết sang Master Content của Khối tương ứng.</span>
      </div>
    </div>
  );
};
