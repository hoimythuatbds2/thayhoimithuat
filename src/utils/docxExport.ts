import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
  VerticalMergeType
} from 'docx';
import { saveAs } from 'file-saver';
import { GeneratedWeeklyPlan } from '../types';
import { INTEGRATION_COLORS } from '../data/integrationColors';
import { getMergedTimetableInfo } from './timetableMerge';

export async function exportToDocx(plan: GeneratedWeeklyPlan, filenameOption?: 'short' | 'full') {
  const weekPadded = String(plan.weekNumber).padStart(2, '0');
  const filename = filenameOption === 'full' 
    ? `KHBD_TUAN_${weekPadded}_${plan.settings.schoolYear.replace(/\s+/g, '')}.docx`
    : `TUAN_${weekPadded}.docx`;

  const borderStyleSolid = {
    top: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    left: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    right: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
  };

  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  // Header & Footer
  const docHeader = new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.BOTH,
        children: [
          new TextRun({ text: 'Kế hoạch bài dạy môn Mĩ thuật     ', font: 'Times New Roman', size: 22 }),
          new TextRun({ text: PageNumber.CURRENT, font: 'Times New Roman', size: 22 }),
          new TextRun({ text: `                                                      GV: ${plan.settings.teacherName}`, font: 'Times New Roman', size: 22 })
        ]
      })
    ]
  });

  const docFooter = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.BOTH,
        children: [
          new TextRun({ text: `${plan.settings.schoolName}`, font: 'Times New Roman', size: 22 }),
          new TextRun({ text: `                                                      Năm học: ${plan.settings.schoolYear}`, font: 'Times New Roman', size: 22 })
        ]
      })
    ]
  });

  const children: (Paragraph | Table)[] = [];

  // ================= PHẦN 1: BẢNG BÁO BÀI =================
  children.push(
    new Paragraph({
      alignment: AlignmentType.BOTH,
      children: [
        new TextRun({ text: 'Báo bài môn Mĩ thuật', font: 'Times New Roman', size: 24 }),
        new TextRun({ text: `                                                         GV: ${plan.settings.teacherName}`, font: 'Times New Roman', size: 24 })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.BOTH,
      children: [
        new TextRun({ text: `${plan.settings.schoolName}`, font: 'Times New Roman', size: 24 }),
        new TextRun({ text: `                                              Năm học: ${plan.settings.schoolYear}`, font: 'Times New Roman', size: 24 })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({ text: `BÁO BÀI TUẦN ${plan.weekNumber}`, bold: true, font: 'Times New Roman', size: 26 })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({ text: `(Từ ngày ${plan.weekCalendar.startDate} đến ngày ${plan.weekCalendar.endDate})`, italics: true, font: 'Times New Roman', size: 22 })
      ]
    })
  );

  // Timetable table
  const timetableHeaderRow = new TableRow({
    children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ', bold: true, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Buổi', bold: true, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
      new TableCell({ width: { size: 600, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tiết', bold: true, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
      new TableCell({ width: { size: 1100, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn', bold: true, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
      new TableCell({ width: { size: 900, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Lớp', bold: true, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
      new TableCell({ width: { size: 2700, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tên bài', bold: true, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
      new TableCell({ width: { size: 2700, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thiết bị, đồ dùng dạy học', bold: true, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
    ]
  });

  const mergedInfo = getMergedTimetableInfo(plan.timetable);

  const timetableRows = mergedInfo.map(({ row, daySpan, sessionSpan }) => {
    return new TableRow({
      children: [
        new TableCell({
          width: { size: 1000, type: WidthType.DXA },
          verticalMerge: daySpan > 0 ? VerticalMergeType.RESTART : VerticalMergeType.CONTINUE,
          children: daySpan > 0
            ? [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: row.dayOfWeek, bold: true, font: 'Times New Roman', size: 20 })] })]
            : [],
          borders: borderStyleSolid
        }),
        new TableCell({
          width: { size: 1000, type: WidthType.DXA },
          verticalMerge: sessionSpan > 0 ? VerticalMergeType.RESTART : VerticalMergeType.CONTINUE,
          children: sessionSpan > 0
            ? [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: row.session, font: 'Times New Roman', size: 20 })] })]
            : [],
          borders: borderStyleSolid
        }),
        new TableCell({ width: { size: 600, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.period), font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
        new TableCell({ width: { size: 1100, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: row.subject, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
        new TableCell({ width: { size: 900, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: row.className, bold: true, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
        new TableCell({ width: { size: 2700, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: row.topicName, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
        new TableCell({ width: { size: 2700, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: row.equipment, font: 'Times New Roman', size: 20 })] })], borders: borderStyleSolid }),
      ]
    });
  });

  const timetableTable = new Table({
    width: { size: 10000, type: WidthType.DXA },
    rows: [timetableHeaderRow, ...timetableRows]
  });

  children.push(timetableTable);
  children.push(new Paragraph({ spacing: { after: 300 } }));

  // ================= PHẦN 2: NỘI DUNG KHBD THEO CÁC KHỐI/LỚP =================
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
      children: [
        new TextRun({ text: `TUẦN ${plan.weekNumber}`, bold: true, font: 'Times New Roman', size: 28 })
      ]
    })
  );

  plan.sections.forEach((sec) => {
    // Dates per class
    sec.scheduleDatesDescription.forEach(dDesc => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${dDesc.dayOfWeek}, ngày ${dDesc.dateStr} - Lớp `, bold: true, font: 'Times New Roman', size: 24 }),
            new TextRun({ text: dDesc.classNames.join(', '), bold: true, font: 'Times New Roman', size: 24 }),
            new TextRun({ text: ';', bold: true, font: 'Times New Roman', size: 24 })
          ]
        })
      );
    });

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 150, after: 100 },
        children: [
          new TextRun({ text: `${sec.content.subjectTitle} ${sec.grade}`, bold: true, font: 'Times New Roman', size: 26 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({ text: `${sec.content.topicTitle}`, bold: true, font: 'Times New Roman', size: 26 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: `${sec.content.periodText}`, bold: true, font: 'Times New Roman', size: 24 })
        ]
      })
    );

    // I. YÊU CẦU CẦN ĐẠT
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'I. YÊU CẦU CẦN ĐẠT', bold: true, font: 'Times New Roman', size: 24 })
        ]
      })
    );

    if (sec.content.aims.general && sec.content.aims.general.length > 0) {
      sec.content.aims.general.forEach(item => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `- ${item}`, font: 'Times New Roman', size: 24 })
            ]
          })
        );
      });
    }

    if (sec.content.aims.capabilities.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: '- Bài học góp phần hình thành, phát triển ở HS các năng lực sau:', font: 'Times New Roman', size: 24 })
          ]
        })
      );
      sec.content.aims.capabilities.forEach(cap => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `+ ${cap}`, font: 'Times New Roman', size: 24 })
            ]
          })
        );
      });
    }

    if (sec.content.aims.qualities && sec.content.aims.qualities.length > 0) {
      sec.content.aims.qualities.forEach(q => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `- ${q}`, font: 'Times New Roman', size: 24 })
            ]
          })
        );
      });
    }

    // Integrated Aims (Run Level Colors!)
    if (sec.content.aims.integrated && sec.content.aims.integrated.length > 0) {
      sec.content.aims.integrated.forEach((integ, iIndex) => {
        const colorCfg = INTEGRATION_COLORS[integ.type] || INTEGRATION_COLORS.none;
        const colorHexClean = colorCfg.hex.replace('#', '');
        
        children.push(
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({ 
                text: `${iIndex + 3}. Tích hợp ${colorCfg.label}: (${integ.activityReference || 'HĐ'})`, 
                bold: true, 
                color: colorHexClean,
                font: 'Times New Roman', 
                size: 24 
              })
            ]
          })
        );

        if (integ.code) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${integ.code}:`, bold: true, color: colorHexClean, font: 'Times New Roman', size: 24 })
              ]
            })
          );
        }

        integ.content.forEach(cnt => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `- ${cnt}`, color: colorHexClean, font: 'Times New Roman', size: 24 })
              ]
            })
          );
        });
      });
    }

    // II. ĐỒ DÙNG DẠY HỌC
    children.push(
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({ text: 'II. ĐỒ DÙNG DẠY HỌC', bold: true, font: 'Times New Roman', size: 24 })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. Giáo viên:', bold: true, font: 'Times New Roman', size: 24 })
        ]
      })
    );

    sec.content.teachingAids.teacher.forEach(aid => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `- ${aid}`, font: 'Times New Roman', size: 24 })
          ]
        })
      );
    });

    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: '2. Học sinh:', bold: true, font: 'Times New Roman', size: 24 })
        ]
      })
    );

    sec.content.teachingAids.student.forEach(aid => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `- ${aid}`, font: 'Times New Roman', size: 24 })
          ]
        })
      );
    });

    // III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU
    children.push(
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({ text: sec.content.activities.sectionTitle || 'III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU', bold: true, font: 'Times New Roman', size: 24 })
        ]
      })
    );

    // 2-column Table
    const activityHeaderRow = new TableRow({
      children: [
        new TableCell({
          width: { size: 5500, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hoạt động của GV', bold: true, font: 'Times New Roman', size: 22 })] })],
          borders: borderStyleSolid
        }),
        new TableCell({
          width: { size: 4500, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hoạt động của HS', bold: true, font: 'Times New Roman', size: 22 })] })],
          borders: borderStyleSolid
        })
      ]
    });

    const activityRows = sec.content.activities.steps.map(step => {
      const gvParagraphs = step.teacherActivity.split('\n').map(line => {
        let isBold = false;
        if (line.startsWith('1. Hoạt động') || line.startsWith('2. Hoạt động') || line.startsWith('3. Hoạt động') || line.startsWith('4. Hoạt động') || line.startsWith('2.1.') || line.startsWith('2.2.') || line.startsWith('2.3.') || line.startsWith('2.4.')) {
          isBold = true;
        }

        // Color highlighting at RUN level if integrated
        let runColor = '000000';
        if (step.integratedType && step.integratedType !== 'none') {
          if (line.includes('Anqp:') || line.includes('Ai:') || line.includes('Năng lực số:') || line.includes('STEM:')) {
            runColor = INTEGRATION_COLORS[step.integratedType]?.hex.replace('#', '') || '000000';
          }
        }

        return new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ 
              text: line, 
              bold: isBold, 
              color: runColor,
              font: 'Times New Roman', 
              size: 22 
            })
          ]
        });
      });

      const hsParagraphs = step.studentActivity.split('\n').map(line => {
        return new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: line, font: 'Times New Roman', size: 22 })
          ]
        });
      });

      return new TableRow({
        children: [
          new TableCell({
            width: { size: 5500, type: WidthType.DXA },
            children: gvParagraphs,
            borders: borderStyleSolid
          }),
          new TableCell({
            width: { size: 4500, type: WidthType.DXA },
            children: hsParagraphs,
            borders: borderStyleSolid
          })
        ]
      });
    });

    const activityTable = new Table({
      width: { size: 10000, type: WidthType.DXA },
      rows: [activityHeaderRow, ...activityRows]
    });

    children.push(activityTable);

    // IV. ĐIỀU CHỈNH SAU BÀI DẠY (nếu có)
    children.push(
      new Paragraph({
        spacing: { before: 200, after: 60 },
        children: [
          new TextRun({ text: 'IV. ĐIỀU CHỈNH SAU BÀI DẠY (nếu có)', bold: true, font: 'Times New Roman', size: 22 })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: sec.content.postLessonAdjustment || '…………………………………………………………………………………………………\n…………………………………………………………………………………………………', font: 'Times New Roman', size: 22 })
        ]
      }),
      new Paragraph({ spacing: { after: 300 } })
    );
  });

  // ================= PHẦN 3: KÝ / TRÌNH KÝ =================
  const signatureTable = new Table({
    width: { size: 10000, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 5000, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'NGƯỜI XÂY DỰNG KHBD', bold: true, font: 'Times New Roman', size: 24 })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 1200 },
                children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: 20 })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: plan.settings.teacherName, bold: true, font: 'Times New Roman', size: 24 })]
              })
            ],
            borders: noBorder
          }),
          new TableCell({
            width: { size: 5000, type: WidthType.DXA },
            children: [
              ...(plan.settings.approverTitle || 'CHUYÊN MÔN NHÀ TRƯỜNG\nTỔ TRƯỞNG ( TỔ PHÓ )')
                .split('\n')
                .filter(Boolean)
                .map(line => new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: line.trim(), bold: true, font: 'Times New Roman', size: 24 })]
                })),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 1200 },
                children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: 20 })]
              })
            ],
            borders: noBorder
          })
        ]
      })
    ]
  });

  children.push(signatureTable);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // ~2cm
              bottom: 1134,
              left: 1417, // ~2.5cm
              right: 1134
            }
          }
        },
        headers: { default: docHeader },
        footers: { default: docFooter },
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
