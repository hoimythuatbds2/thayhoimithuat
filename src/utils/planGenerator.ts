import { 
  AppSettings, 
  GeneratedLessonPlanSection, 
  GeneratedWeeklyPlan, 
  MasterLessonPlanContent, 
  TimetableRow, 
  WeekCalendar 
} from '../types';
import { getMasterLessonPlan } from '../data/masterContentData';
import { getGradeFromClassName } from '../data/defaultData';

export function calculateDateForDayOfWeek(startDateStr: string, dayOfWeek: string): string {
  // startDateStr is in DD/MM/YYYY format
  const parts = startDateStr.split('/');
  if (parts.length !== 3) return startDateStr;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  
  const baseDate = new Date(year, month, day);
  let offset = 0;
  switch (dayOfWeek) {
    case 'Hai': offset = 0; break;
    case 'Ba': offset = 1; break;
    case 'Tư': offset = 2; break;
    case 'Năm': offset = 3; break;
    case 'Sáu': offset = 4; break;
    default: offset = 0;
  }
  
  const targetDate = new Date(baseDate);
  targetDate.setDate(baseDate.getDate() + offset);
  
  const d = String(targetDate.getDate()).padStart(2, '0');
  const m = String(targetDate.getMonth() + 1).padStart(2, '0');
  const y = targetDate.getFullYear();
  return `${d}/${m}/${y}`;
}

export function generateWeeklyPlan(
  weekNumber: number,
  weekCalendar: WeekCalendar,
  settings: AppSettings,
  timetable: TimetableRow[]
): { plan: GeneratedWeeklyPlan; error?: string } {
  // Step 6 & 7: Identify grades and classes in timetable
  const gradeMap: Map<number, {
    classes: Set<string>;
    dayClassMap: Map<string, { dayOfWeek: string; dateStr: string; classNames: Set<string> }>;
  }> = new Map();

  for (const row of timetable) {
    const grade = row.grade || getGradeFromClassName(row.className);
    if (!gradeMap.has(grade)) {
      gradeMap.set(grade, {
        classes: new Set<string>(),
        dayClassMap: new Map()
      });
    }

    const gData = gradeMap.get(grade)!;
    gData.classes.add(row.className);

    const dateStr = calculateDateForDayOfWeek(weekCalendar.startDate, row.dayOfWeek);
    const dayKey = `${row.dayOfWeek}_${dateStr}`;
    
    if (!gData.dayClassMap.has(dayKey)) {
      gData.dayClassMap.set(dayKey, {
        dayOfWeek: `Thứ ${row.dayOfWeek}`,
        dateStr,
        classNames: new Set<string>()
      });
    }
    gData.dayClassMap.get(dayKey)!.classNames.add(row.className);
  }

  // Order grades strictly by their appearance order in the timetable
  const gradesInTimetableOrder: number[] = [];
  for (const row of timetable) {
    const grade = row.grade || getGradeFromClassName(row.className);
    if (!gradesInTimetableOrder.includes(grade)) {
      gradesInTimetableOrder.push(grade);
    }
  }

  const sections: GeneratedLessonPlanSection[] = [];

  for (const grade of gradesInTimetableOrder) {
    const gData = gradeMap.get(grade);
    if (!gData) continue;
    
    // Step 8 & 9: Find MASTER CONTENT for this grade
    const content = getMasterLessonPlan(grade, weekNumber);
    if (!content) {
      return {
        plan: {} as GeneratedWeeklyPlan,
        error: `CHƯA TÌM THẤY MASTER CONTENT CỦA KHỐI ${grade}. CHƯA THỂ TẠO CHÍNH XÁC KHBD.`
      };
    }

    // Convert dayClassMap into sorted list
    const dayOrder = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];
    const scheduleDatesDescription = Array.from(gData.dayClassMap.values())
      .sort((a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek))
      .map(item => ({
        dayOfWeek: item.dayOfWeek,
        dateStr: item.dateStr,
        classNames: Array.from(item.classNames)
      }));

    sections.push({
      grade,
      classes: Array.from(gData.classes),
      scheduleDatesDescription,
      content
    });
  }

  const generatedPlan: GeneratedWeeklyPlan = {
    weekNumber,
    weekCalendar,
    settings,
    timetable,
    sections,
    generatedAt: new Date().toISOString(),
    sourceLockedValid: true
  };

  return { plan: generatedPlan };
}
