import { AppSettings, MasterTemplateMeta, TimetableRow, WeekCalendar } from '../types';
import { CURRICULUM_SYLLABUS } from './masterContentData';

export const DEFAULT_SETTINGS: AppSettings = {
  teacherName: 'Nguyễn Văn Hợi',
  schoolName: 'Trường Tiểu học Bảo Đài số 2',
  schoolYear: '2026 - 2027',
  approverTitle: 'CHUYÊN MÔN NHÀ TRƯỜNG\nTỔ TRƯỞNG ( TỔ PHÓ )',
  masterPassword: ''
};

export const DEFAULT_MASTER_TEMPLATE: MasterTemplateMeta = {
  fileName: 'TUAN_01.pdf',
  fileType: 'pdf',
  uploadedAt: '01/09/2026',
  isCustom: false,
  version: '1.0 (Chuẩn quy chế PGD)'
};

/**
 * Formula from Prompt Section 12:
 * Tuần 1: 07/09/2026 – 11/09/2026
 * Ngày bắt đầu tuần N = 07/09/2026 + (N - 1) × 7 ngày
 * Ngày kết thúc = Ngày bắt đầu + 4 ngày
 */
export function calculateWeekDates(weekNum: number): { startDate: string; endDate: string; startObj: Date } {
  // Base date: 07/09/2026
  const baseStart = new Date(2026, 8, 7); // Note: month is 0-indexed (8 = September)
  const offsetDays = (weekNum - 1) * 7;
  
  const startDate = new Date(baseStart);
  startDate.setDate(baseStart.getDate() + offsetDays);
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 4);

  const formatDate = (d: Date) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    startObj: startDate
  };
}

export function getDefaultWeekCalendar(weekNum: number): WeekCalendar {
  const dates = calculateWeekDates(weekNum);
  return {
    weekNumber: weekNum,
    startDate: dates.startDate,
    endDate: dates.endDate,
    holidays: '',
    makeUpDays: '',
    notes: ''
  };
}

// Extract grade from class name: First character if numeric
export function getGradeFromClassName(className: string): number {
  if (!className) return 1;
  const match = className.trim().match(/^(\d)/);
  if (match) {
    const g = parseInt(match[1], 10);
    if (g >= 1 && g <= 5) return g;
  }
  return 1;
}

// Generate base timetable for a given week from teacher schedule
export function generateTimetableForWeek(weekNum: number): TimetableRow[] {
  // Base timetable structure matching TUAN_01.pdf
  const baseEntries: {
    dayOfWeek: 'Hai' | 'Ba' | 'Tư' | 'Năm' | 'Sáu';
    session: 'Sáng' | 'Chiều';
    period: number;
    className: string;
  }[] = [
    // Hai Chiều
    { dayOfWeek: 'Hai', session: 'Chiều', period: 1, className: '1B6' },
    { dayOfWeek: 'Hai', session: 'Chiều', period: 2, className: '2B6' },
    { dayOfWeek: 'Hai', session: 'Chiều', period: 3, className: '3B6' },
    // Ba Sáng
    { dayOfWeek: 'Ba', session: 'Sáng', period: 1, className: '1B1' },
    { dayOfWeek: 'Ba', session: 'Sáng', period: 2, className: '2B1' },
    { dayOfWeek: 'Ba', session: 'Sáng', period: 3, className: '3B1' },
    { dayOfWeek: 'Ba', session: 'Sáng', period: 4, className: '3B2' },
    // Ba Chiều
    { dayOfWeek: 'Ba', session: 'Chiều', period: 1, className: '1B2' },
    { dayOfWeek: 'Ba', session: 'Chiều', period: 2, className: '2B2' },
    { dayOfWeek: 'Ba', session: 'Chiều', period: 3, className: '1B5' },
    // Tư Sáng
    { dayOfWeek: 'Tư', session: 'Sáng', period: 1, className: '1B3' },
    { dayOfWeek: 'Tư', session: 'Sáng', period: 2, className: '3B3' },
    { dayOfWeek: 'Tư', session: 'Sáng', period: 3, className: '2B5' },
    { dayOfWeek: 'Tư', session: 'Sáng', period: 4, className: '3B4' },
    // Sáu Sáng
    { dayOfWeek: 'Sáu', session: 'Sáng', period: 1, className: '2B4' },
    { dayOfWeek: 'Sáu', session: 'Sáng', period: 2, className: '1B4' },
    { dayOfWeek: 'Sáu', session: 'Sáng', period: 3, className: '3B5' },
    { dayOfWeek: 'Sáu', session: 'Sáng', period: 4, className: '2B3' },
  ];

  return baseEntries.map((item, idx) => {
    const grade = getGradeFromClassName(item.className);
    const syllabusItem = CURRICULUM_SYLLABUS[grade]?.find(s => s.week === weekNum);
    const topicName = syllabusItem ? `${syllabusItem.topic} ${syllabusItem.period ? `(${syllabusItem.period})` : ''}` : `Mĩ thuật lớp ${grade} - Tuần ${weekNum}`;

    return {
      id: `tt_${weekNum}_${idx}_${item.className}`,
      dayOfWeek: item.dayOfWeek,
      session: item.session,
      period: item.period,
      subject: 'Mĩ thuật',
      className: item.className,
      grade,
      topicName,
      equipment: 'SGK, VBT Mĩ thuật; đồ dùng học tập theo mục II'
    };
  });
}
