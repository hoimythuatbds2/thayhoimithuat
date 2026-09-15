import React from 'react';
import { GeneratedWeeklyPlan } from '../types';
import { INTEGRATION_COLORS } from '../data/integrationColors';
import { getMergedTimetableInfo } from '../utils/timetableMerge';

interface Props {
  plan: GeneratedWeeklyPlan;
}

export const DocumentPreview: React.FC<Props> = ({ plan }) => {
  const mergedTimetable = getMergedTimetableInfo(plan.timetable);

  return (
    <div className="bg-slate-100/70 p-4 sm:p-8 rounded-2xl border border-slate-200 shadow-inner flex justify-center">
      {/* A4 Paper Simulation Container */}
      <div 
        id="printable-lesson-plan"
        className="bg-white text-black shadow-lg rounded-sm w-full max-w-[850px] p-8 sm:p-12 font-serif text-[13.5px] leading-relaxed border border-slate-300"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center text-[12px] border-b border-slate-300 pb-1 mb-6 text-slate-700">
          <span>Kế hoạch bài dạy môn Mĩ thuật</span>
          <span>GV: {plan.settings.teacherName}</span>
        </div>

        {/* ================= PHẦN 1: BÁO BÀI ================= */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-start text-xs font-semibold uppercase mb-3">
            <div className="text-left">
              <div>Báo bài môn Mĩ thuật</div>
              <div>{plan.settings.schoolName}</div>
            </div>
            <div className="text-right">
              <div>GV: {plan.settings.teacherName}</div>
              <div>Năm học: {plan.settings.schoolYear}</div>
            </div>
          </div>
          <h1 className="text-base font-bold uppercase mt-3">
            BÁO BÀI TUẦN {plan.weekNumber}
          </h1>
          <p className="text-xs italic">
            (Từ ngày {plan.weekCalendar.startDate} đến ngày {plan.weekCalendar.endDate})
          </p>
        </div>

        {/* Bảng báo bài 7 cột - Gộp Thứ & Buổi nếu giống nhau */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-black text-xs text-center">
            <thead>
              <tr className="bg-slate-100 font-bold">
                <th className="border border-black py-1.5 px-2 w-14">Thứ</th>
                <th className="border border-black py-1.5 px-2 w-14">Buổi</th>
                <th className="border border-black py-1.5 px-2 w-12">Tiết</th>
                <th className="border border-black py-1.5 px-2 w-20">Môn</th>
                <th className="border border-black py-1.5 px-2 w-14">Lớp</th>
                <th className="border border-black py-1.5 px-3 text-left">Tên bài</th>
                <th className="border border-black py-1.5 px-3 text-left">Thiết bị, đồ dùng dạy học</th>
              </tr>
            </thead>
            <tbody>
              {mergedTimetable.map(({ row, daySpan, sessionSpan }) => (
                <tr key={row.id}>
                  {daySpan > 0 && (
                    <td 
                      rowSpan={daySpan} 
                      className="border border-black py-1 px-1.5 font-bold align-middle bg-slate-50/40"
                    >
                      {row.dayOfWeek}
                    </td>
                  )}
                  {sessionSpan > 0 && (
                    <td 
                      rowSpan={sessionSpan} 
                      className="border border-black py-1 px-1.5 align-middle bg-slate-50/20"
                    >
                      {row.session}
                    </td>
                  )}
                  <td className="border border-black py-1 px-1 font-semibold">{row.period}</td>
                  <td className="border border-black py-1 px-1">{row.subject}</td>
                  <td className="border border-black py-1 px-1 font-bold">{row.className}</td>
                  <td className="border border-black py-1 px-2 text-left">{row.topicName}</td>
                  <td className="border border-black py-1 px-2 text-left text-[11px]">{row.equipment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= PHẦN 2: NỘI DUNG KHBD ================= */}
        <div className="text-center my-6">
          <h2 className="text-base font-bold uppercase">
            TUẦN {plan.weekNumber}
          </h2>
        </div>

        <div className="space-y-8">
          {plan.sections.map((section) => (
            <div key={section.grade} className="border-t border-slate-300 pt-6 first:border-0 first:pt-0">
              {/* Dates by class */}
              <div className="text-xs font-bold mb-3 space-y-0.5">
                {section.scheduleDatesDescription.map((dDesc, idx) => (
                  <div key={idx}>
                    {dDesc.dayOfWeek}, ngày {dDesc.dateStr} - Lớp {dDesc.classNames.join(', ')};
                  </div>
                ))}
              </div>

              {/* Subject & Topic Titles */}
              <div className="text-center mb-5">
                <h3 className="text-sm font-bold uppercase">
                  {section.content.subjectTitle} {section.grade}
                </h3>
                <h4 className="text-sm font-bold uppercase mt-1">
                  {section.content.topicTitle}
                </h4>
                <div className="text-xs font-bold mt-0.5">
                  {section.content.periodText}
                </div>
              </div>

              {/* I. YÊU CẦU CẦN ĐẠT */}
              <div className="mb-5">
                <h5 className="font-bold text-xs uppercase mb-1.5">I. YÊU CẦU CẦN ĐẠT</h5>
                
                {section.content.aims.general && section.content.aims.general.length > 0 && (
                  <ul className="list-disc list-inside space-y-0.5 text-xs">
                    {section.content.aims.general.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.content.aims.capabilities.length > 0 && (
                  <div className="mt-1.5 text-xs">
                    <p className="font-semibold">- Bài học góp phần hình thành, phát triển ở HS các năng lực sau:</p>
                    <ul className="list-none pl-4 space-y-0.5 mt-0.5">
                      {section.content.aims.capabilities.map((cap, idx) => (
                        <li key={idx}>+ {cap}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.content.aims.qualities && section.content.aims.qualities.length > 0 && (
                  <div className="mt-1.5 text-xs">
                    <p className="font-semibold">- Phẩm chất chủ yếu:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {section.content.aims.qualities.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Integrated Aims with RUN-LEVEL colors */}
                {section.content.aims.integrated && section.content.aims.integrated.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {section.content.aims.integrated.map((integ, idx) => {
                      const colorCfg = INTEGRATION_COLORS[integ.type] || INTEGRATION_COLORS.none;
                      return (
                        <div 
                          key={idx}
                          className="p-2 rounded-md border text-xs"
                          style={{ borderColor: colorCfg.hex, backgroundColor: colorCfg.bgHex }}
                        >
                          <div className="font-bold" style={{ color: colorCfg.hex }}>
                            {idx + 3}. Tích hợp {colorCfg.label}: ({integ.activityReference})
                          </div>
                          {integ.code && (
                            <div className="font-bold mt-0.5" style={{ color: colorCfg.hex }}>
                              {integ.code}:
                            </div>
                          )}
                          <ul className="list-disc list-inside space-y-0.5 mt-0.5" style={{ color: colorCfg.hex }}>
                            {integ.content.map((cnt, cIdx) => (
                              <li key={cIdx}>{cnt}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* II. ĐỒ DÙNG DẠY HỌC */}
              <div className="mb-5 text-xs">
                <h5 className="font-bold uppercase mb-1.5">II. ĐỒ DÙNG DẠY HỌC</h5>
                <div className="mb-2">
                  <span className="font-bold">1. Giáo viên:</span>
                  <div className="pl-4 space-y-0.5 mt-0.5">
                    {section.content.teachingAids.teacher.map((aid, idx) => (
                      <div key={idx}>- {aid}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-bold">2. Học sinh:</span>
                  <div className="pl-4 space-y-0.5 mt-0.5">
                    {section.content.teachingAids.student.map((aid, idx) => (
                      <div key={idx}>- {aid}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU (Bảng 2 cột) */}
              <div className="mb-5">
                <h5 className="font-bold text-xs uppercase mb-2">
                  {section.content.activities.sectionTitle || 'III. CÁC HOẠT ĐỘNG DẠY-HỌC CHỦ YẾU'}
                </h5>
                <table className="w-full border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-center">
                      <th className="border border-black py-1.5 px-3 w-[55%]">Hoạt động của GV</th>
                      <th className="border border-black py-1.5 px-3 w-[45%]">Hoạt động của HS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.content.activities.steps.map((step, sIdx) => {
                      const colorCfg = step.integratedType ? INTEGRATION_COLORS[step.integratedType] : undefined;

                      return (
                        <tr key={sIdx} className="align-top">
                          <td className="border border-black p-2.5">
                            <div className="whitespace-pre-line leading-relaxed">
                              {step.teacherActivity.split('\n').map((line, lIdx) => {
                                const isIntegrationLine = colorCfg && (
                                  line.includes('Anqp:') || 
                                  line.includes('Ai:') || 
                                  line.includes('STEM:') || 
                                  line.includes('Năng lực số:')
                                );

                                return (
                                  <div 
                                    key={lIdx} 
                                    className={`mb-1 ${line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('2.1') || line.startsWith('2.2') || line.startsWith('2.3') ? 'font-bold text-slate-900' : ''}`}
                                    style={isIntegrationLine ? { color: colorCfg.hex, fontWeight: 600 } : undefined}
                                  >
                                    {line}
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                          <td className="border border-black p-2.5">
                            <div className="whitespace-pre-line leading-relaxed text-slate-800">
                              {step.studentActivity}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* IV. ĐIỀU CHỈNH SAU BÀI DẠY */}
              <div className="mb-4 text-xs">
                <h5 className="font-bold uppercase mb-1">IV. ĐIỀU CHỈNH SAU BÀI DẠY (nếu có)</h5>
                <p className="text-slate-500 whitespace-pre-line font-mono text-[11px]">
                  {section.content.postLessonAdjustment || '…………………………………………………………………………………………………\n…………………………………………………………………………………………………'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PHẦN 3: PHẦN KÝ / TRÌNH KÝ ================= */}
        <div className="mt-12 pt-6 border-t border-slate-300">
          <div className="grid grid-cols-2 text-center text-xs">
            <div>
              <div className="font-bold uppercase">NGƯỜI XÂY DỰNG KHBD</div>
              <div className="italic text-[11px] text-slate-500 mt-0.5">(Ký và ghi rõ họ tên)</div>
              <div className="h-16"></div>
              <div className="font-bold text-sm">{plan.settings.teacherName}</div>
            </div>

            <div>
              <div className="font-bold uppercase whitespace-pre-line leading-tight">
                {plan.settings.approverTitle}
              </div>
              <div className="italic text-[11px] text-slate-500 mt-0.5">(Ký và ghi rõ họ tên)</div>
              <div className="h-16"></div>
              <div className="font-bold text-slate-400">...................................................</div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-between items-center text-[11px] border-t border-slate-300 pt-1 mt-8 text-slate-500">
          <span>{plan.settings.schoolName}</span>
          <span>Năm học: {plan.settings.schoolYear}</span>
        </div>
      </div>
    </div>
  );
};
