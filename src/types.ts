export interface AppSettings {
  teacherName: string;
  schoolName: string;
  schoolYear: string;
  approverTitle: string;
  masterPassword?: string;
}

export interface AllowedUserRecord {
  email: string;
  role?: string;
  status: 'active' | 'inactive';
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MasterContentMeta {
  grade: number;
  fileName: string;
  lastUpdated: string;
  lessonCount: number;
  status: 'ready' | 'missing' | 'custom';
}

export interface MasterTemplateMeta {
  fileName: string;
  fileType: 'pdf' | 'docx';
  uploadedAt?: string;
  isCustom: boolean;
  version: string;
}

export interface TimetableRow {
  id: string;
  dayOfWeek: 'Hai' | 'Ba' | 'Tư' | 'Năm' | 'Sáu';
  session: 'Sáng' | 'Chiều';
  period: number; // 1, 2, 3, 4
  subject: string; // "Mĩ thuật"
  className: string; // e.g. "1B6", "2B1"
  grade: number; // 1, 2, 3, 4, 5
  topicName: string; // e.g. "Chủ đề 1: Mĩ thuật trong nhà trường"
  periodIndexText?: string; // e.g. "(Tiết 1)"
  equipment: string; // e.g. "SGK, VBT Mĩ thuật; đồ dùng học tập theo mục II"
}

export interface WeekCalendar {
  weekNumber: number;
  startDate: string; // DD/MM/YYYY
  endDate: string; // DD/MM/YYYY
  holidays: string;
  makeUpDays: string;
  notes: string;
}

export interface ActivityStep {
  teacherActivity: string;
  studentActivity: string;
  integratedType?: IntegrationType;
  integratedText?: string;
}

export interface MasterLessonPlanContent {
  grade: number;
  week: number;
  subjectTitle: string; // "MĨ THUẬT"
  topicTitle: string; // "CHỦ ĐỀ 1: MĨ THUẬT TRONG NHÀ TRƯỜNG"
  periodText: string; // "(Tiết 1)"
  aims: {
    general?: string[];
    capabilities: string[];
    qualities?: string[];
    integrated?: {
      type: IntegrationType;
      code?: string;
      activityReference?: string;
      content: string[];
    }[];
  };
  teachingAids: {
    teacher: string[];
    student: string[];
  };
  activities: {
    sectionTitle: string; // e.g. "III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU"
    steps: ActivityStep[];
  };
  postLessonAdjustment?: string;
}

export type IntegrationType = 
  | 'stem'
  | 'local_edu'
  | 'human_rights'
  | 'digital_competence'
  | 'defense_security'
  | 'ai_integration'
  | 'digital_citizenship'
  | 'traffic_safety'
  | 'none';

export interface IntegrationColorConfig {
  type: IntegrationType;
  label: string;
  colorName: string;
  hex: string;
  bgHex: string;
  description: string;
}

export interface GeneratedLessonPlanSection {
  grade: number;
  classes: string[]; // e.g. ["1B6", "1B1", "1B2", "1B5", "1B3", "1B4"]
  scheduleDatesDescription: {
    dayOfWeek: string;
    dateStr: string;
    classNames: string[];
  }[];
  content: MasterLessonPlanContent;
}

export interface GeneratedWeeklyPlan {
  weekNumber: number;
  weekCalendar: WeekCalendar;
  settings: AppSettings;
  timetable: TimetableRow[];
  sections: GeneratedLessonPlanSection[];
  generatedAt: string;
  sourceLockedValid: boolean;
}

export interface ValidationItem {
  category: 'DỮ LIỆU' | 'SOURCE' | 'FORMAT' | 'LAYOUT' | 'HÀNH CHÍNH';
  checkName: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  detail?: string;
}

export interface ValidationReport {
  timestamp: string;
  weekNumber: number;
  overallPassed: boolean;
  totalChecks: number;
  passedCount: number;
  failedCount: number;
  items: ValidationItem[];
}

export interface FormatFingerprintReport {
  matchRate: number; // 0 - 100%
  pageMarginsMatch: boolean;
  tableStructureMatch: boolean;
  fontFamilyMatch: boolean;
  fontSizeMatch: boolean;
  runLevelColorValid: boolean;
  headerFooterMatch: boolean;
  signatureBlockMatch: boolean;
  allowedDynamicVariations: string[];
  unauthorizedDifferences: string[];
}

export interface GradeAuditResult {
  grade: number;
  fileName: string;
  classes: string[];
  topic: string;
  totalCharactersChecked: number;
  totalSentencesChecked: number;
  exactMatches: number;
  discrepancies: string[];
  status: 'PASS_100_PERCENT' | 'DISCREPANCY_FOUND';
}

export interface VerbatimAuditReport {
  timestamp: string;
  allPassed: boolean;
  totalCheckedChars: number;
  totalCheckedSentences: number;
  discrepanciesCount: number;
  grades: GradeAuditResult[];
}

