import { TimetableRow } from '../types';

export interface MergedTimetableCellInfo {
  row: TimetableRow;
  index: number;
  daySpan: number;      // > 0 if this row renders the day cell with rowSpan=daySpan; 0 if merged into previous row
  sessionSpan: number;  // > 0 if this row renders the session cell with rowSpan=sessionSpan; 0 if merged into previous row
}

/**
 * Groups consecutive rows by Day of Week, and within each day groups by Session (Buổi: Sáng/Chiều).
 * For HTML: rowSpan > 0 renders <td>, rowSpan === 0 skips rendering <td>.
 * For DOCX: rowSpan > 0 uses VerticalMergeType.RESTART, rowSpan === 0 uses VerticalMergeType.CONTINUE.
 */
export function getMergedTimetableInfo(rows: TimetableRow[]): MergedTimetableCellInfo[] {
  const result: MergedTimetableCellInfo[] = [];

  let i = 0;
  while (i < rows.length) {
    const currentDay = rows[i].dayOfWeek;
    let dayCount = 0;
    while (i + dayCount < rows.length && rows[i + dayCount].dayOfWeek === currentDay) {
      dayCount++;
    }

    // Within this day group [i ... i + dayCount - 1], group consecutive rows with the same session
    let j = i;
    const dayEnd = i + dayCount;
    while (j < dayEnd) {
      const currentSession = rows[j].session;
      let sessionCount = 0;
      while (j + sessionCount < dayEnd && rows[j + sessionCount].session === currentSession) {
        sessionCount++;
      }

      for (let k = 0; k < sessionCount; k++) {
        const rowIndex = j + k;
        result[rowIndex] = {
          row: rows[rowIndex],
          index: rowIndex,
          daySpan: rowIndex === i ? dayCount : 0,
          sessionSpan: k === 0 ? sessionCount : 0,
        };
      }

      j += sessionCount;
    }

    i += dayCount;
  }

  return result;
}
