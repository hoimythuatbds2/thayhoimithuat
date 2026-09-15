import React, { useState } from 'react';
import { WeekCalendar } from '../types';
import { calculateWeekDates } from '../data/defaultData';
import { Calendar, Save, Check, RefreshCw } from 'lucide-react';

interface Props {
  calendar: WeekCalendar;
  onSaveCalendar: (newCalendar: WeekCalendar) => void;
  onWeekSelect: (week: number) => void;
}

export const WeekScheduleEditor: React.FC<Props> = ({ calendar, onSaveCalendar, onWeekSelect }) => {
  const [formData, setFormData] = useState<WeekCalendar>({ ...calendar });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync if prop changed externally
  React.useEffect(() => {
    setFormData({ ...calendar });
  }, [calendar]);

  const handleWeekChange = (newWeek: number) => {
    if (newWeek < 1 || newWeek > 35) return;
    const computed = calculateWeekDates(newWeek);
    const updated: WeekCalendar = {
      ...formData,
      weekNumber: newWeek,
      startDate: computed.startDate,
      endDate: computed.endDate
    };
    setFormData(updated);
    onWeekSelect(newWeek);
  };

  const handleResetToFormula = () => {
    const computed = calculateWeekDates(formData.weekNumber);
    setFormData({
      ...formData,
      startDate: computed.startDate,
      endDate: computed.endDate,
      holidays: '',
      makeUpDays: '',
      notes: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCalendar(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[11px] uppercase tracking-wider">
            Khu vực 4
          </span>
          <h2 className="text-sm font-bold text-slate-800">LỊCH TUẦN</h2>
        </div>
        <button
          type="button"
          onClick={handleResetToFormula}
          title="Áp dụng lại công thức mặc định (07/09/2026 + N*7 ngày)"
          className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" /> Công thức chuẩn
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Week Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tuần
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min={1}
                max={35}
                required
                value={formData.weekNumber}
                onChange={e => handleWeekChange(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-base font-bold text-slate-900 text-center bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              Ngày bắt đầu
            </label>
            <input
              type="text"
              required
              value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
              placeholder="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              Ngày kết thúc
            </label>
            <input
              type="text"
              required
              value={formData.endDate}
              onChange={e => setFormData({ ...formData, endDate: e.target.value })}
              placeholder="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Adjustments (holidays / makeup days) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Ngày nghỉ trong tuần (nếu có)
            </label>
            <input
              type="text"
              value={formData.holidays}
              onChange={e => setFormData({ ...formData, holidays: e.target.value })}
              placeholder="VD: Nghỉ thứ Tư (Lễ 2/9)"
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Ngày học bù / Thay đổi thực tế
            </label>
            <input
              type="text"
              value={formData.makeUpDays}
              onChange={e => setFormData({ ...formData, makeUpDays: e.target.value })}
              placeholder="VD: Học bù vào thứ Bảy"
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-[11px] text-slate-500 italic">
            Quy tắc: LỊCH ĐÃ LƯU &gt; CÔNG THỨC MẶC ĐỊNH
          </span>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                ĐÃ LƯU
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                LƯU LỊCH TUẦN
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
