import { MasterLessonPlanContent } from '../types';

export const MASTER_CONTENT_K1: Record<number, MasterLessonPlanContent> = {
  1: {
    grade: 1,
    week: 1,
    subjectTitle: "MĨ THUẬT",
    topicTitle: "CHỦ ĐỀ 1: MĨ THUẬT TRONG NHÀ TRƯỜNG",
    periodText: "(Tiết 1)",
    aims: {
      general: [
        "Nhận biết được Mĩ thuật có ở xung quanh và được tạo bởi những đối tượng khác nhau.",
        "Nhận biết được một số đồ dùng, công cụ, vật liệu để hình thành, sáng tạo trong môn học (HS khuyết tật không cần đạt yêu cầu này)",
        "Biết cách bảo quản, sử dụng một số đồ dùng học tập."
      ],
      capabilities: [
        "HS nhận biết được mĩ thuật có ở xung quanh và được tạo bởi những đối tượng khác nhau.",
        "HS nhận biết được một số đồ dùng, công cụ, vật liệu để thực hành, sáng tạo trong môn học.",
        "HS nhận biết được sự biểu hiện phong phú của mĩ thuật trong cuộc sống.",
        "HS biết cách bảo quản, sử dụng một số đồ dùng học tập."
      ],
      qualities: [
        "HS có ý thức về việc giữ gìn cảnh quan, đồ dùng, sự vật, đồ vật có tính mĩ thuật trong gia đình và trong cuộc sống."
      ],
      integrated: [
        {
          type: "defense_security",
          code: "1.1.1",
          activityReference: "HĐ3",
          content: [
            "Giáo dục cho HS về tình yêu quê hương, yêu hòa bình.",
            "Nhận biết vẻ đẹp của ngôi trường và tình cảm bạn bè, thầy cô để bồi đắp tình yêu quê hương từ những điều gần gũi."
          ]
        },
        {
          type: "ai_integration",
          code: "1.A2.2",
          activityReference: "HĐ4",
          content: [
            "Nhận biết được ngoài các đồ dùng mĩ thuật truyền thống, còn có các thiết bị thông minh ứng dụng AI hỗ trợ con người hoạt động."
          ]
        }
      ]
    },
    teachingAids: {
      teacher: [
        "Một số hình ảnh, clip liên quan đến chủ đề trình chiếu trên Powerpoint để HS quan sát.",
        "Một số SPMT, đồ dùng học tập, hình ảnh liên quan đến hoạt động học tập môn mĩ thuật giúp HS quan sát trực tiếp."
      ],
      student: [
        "Sách học MT lớp 1.",
        "Vở bài tập MT 1.",
        "Bút chì, tẩy, màu vẽ, giấy vẽ, giấy màu, kéo, keo dán..."
      ]
    },
    activities: {
      sectionTitle: "III. CÁC HOẠT ĐỘNG DẠY-HỌC CHỦ YẾU",
      steps: [
        {
          teacherActivity: "1. Hoạt động: khởi động\n- GV cho HS hát bài: “Hộp bút chì màu”.\n- GV hỏi HS: Bài hát nói đến đồ dùng học tập nào?\n- Khen ngợi HS.\n- GV giới thiệu chủ đề bài học.",
          studentActivity: "- HS hát đồng thanh.\n- HS trả lời.\n- Phát huy.\n- Mở bài học trong SGK mĩ thuật 1."
        },
        {
          teacherActivity: "2. Hoạt động: hình thành kiến thức mới.\na. Nội dung 1: Sản phẩm mĩ thuật.\n+ Chuẩn bị của GV:\n- Một số SPMT tạo hình (tranh vẽ, tranh đắp nổi, hình đất nặn,...) và một số SPMT ứng dụng (lọ hoa, ống đựng bút, con rối, đồ chơi,...) để minh họa trực quan cho HS.\n+ GV tổ chức các hoạt động:\n- GV yêu cầu HS mở SGK mĩ thuật 1, trang 6, 7 và quan sát hình minh họa, cho biết đó là những sản phẩm gì?\n- GV tóm tắt một vài ý kiến lên bảng (không đánh giá).\n- GV giải thích cho HS hiểu rõ thêm thế nào là SPMT tạo hình.\n- GV giải thích cho HS hiểu rõ thêm thế nào là SPMT ứng dụng.\n- GV cần giải thích ngay trên “vật thật”, nói ngắn gọn để HS dễ hình dung.\n- Sau khi giải thích, GV yêu cầu HS kể tên một số SPMT trong nhà trường.\nChú ý: Các SPMT giới thiệu phần này sẽ là cơ sở giúp HS chiếm lĩnh kiến thức trong các bài tiếp theo, nên chỉ giới thiệu mà không đi sâu về chất liệu, cách làm.",
          studentActivity: "- HS trình bày hiểu biết của mình về những SPMT có trong sách.\n- Quan sát, tiếp thu.\n- Sản phẩm được tạo nên từ những yếu tố, nguyên lí nghệ thuật.\n- Vận dụng những yếu tố tạo hình để trang trí một sản phẩm.\n- Lắng nghe, tiếp thu.\n- HS kể tên một số SPMT trong nhà trường."
        },
        {
          teacherActivity: "b. Nội dung 2: Mĩ thuật do ai tạo nên.\n+ Chuẩn bị của GV:\n- Một số ảnh chụp để minh họa cho các nhân vật xuất hiện trong bài, mở rộng thêm các nhân vật ngoài SGK.\n+ GV tổ chức các hoạt động:\n- GV chỉ vào hình minh họa trong SGK mĩ thuật 1, trang 8, 9 và đặt câu hỏi:\n+ Những ai có thể sáng tạo ra các SPMT?\n+ Những lứa tuổi nào có thể thực hiện được các SPMT?\n- GV ghi lại một vài ý kiến của HS lên bảng (không đánh giá).\n- GV tóm tắt lại các ý kiến mà HS đã nêu ở trên và giải thích cho HS hiểu rõ thêm về những ai và những lứa tuổi nào có thể tham gia thực hiện được một SPMT.\n- Căn cứ những ý kiến tóm tắt trên bảng, GV và HS cùng đi đến nhận xét về những ai và lứa tuổi nào có thể tham gia thực hiện SPMT.",
          studentActivity: "- HS quan sát, thảo luận.\n- Họa sĩ, nhà điêu khắc, nhà nhiếp ảnh,...\n- Các em học sinh, các cụ già,...\n- Ghi nhớ.\n- Đó là những người hoạt động nghệ thuật chuyên nghiệp: họa sĩ, nhà điêu khắc, nhiếp ảnh gia, nhà thiết kế,... Lứa tuổi: người lớn tuổi, các em nhỏ,...\n- Lắng nghe, tiếp thu."
        },
        {
          teacherActivity: "c. Nội dung 3: Đồ dùng trong môn học.\n+ Chuẩn bị của GV:\n- Một số vật dụng, đồ dùng học tập sử dụng trong môn học mĩ thuật.\n+ GV tổ chức các hoạt động:\n- GV yêu cầu HS mở SGK mĩ thuật 1, trang 10, 11 và cho biết để học tập môn mĩ thuật, cần những đồ dùng gì và cách sử dụng ra sao.\n- GV tóm tắt một vài ý kiến của HS lên bảng (không đánh giá).\n- GV giải thích cho HS hiểu rõ thêm về cách sử dụng những dụng cụ đó bằng việc nêu các câu hỏi để cả lớp cùng trao đổi:\n+ Vẽ hình bằng dụng cụ nào?\n+ Khi vẽ chưa được, dùng cái gì để xóa?\n+ Vẽ trên cái gì?\n+ Tô màu bằng dụng cụ nào?\n+ Giấy màu dùng để làm gì?\n+ Keo dán, hồ dán dùng để làm gì?\n+ Có được vẽ và tô màu ra bàn, tường không? Vì sao?\n- GV khen ngợi HS.",
          studentActivity: "- HS trình bày những hiểu biết của mình về những dụng cụ học tập sử dụng trong môn học mĩ thuật.\n- Lắng nghe, ghi nhớ.\n- HS thảo luận, trả lời câu hỏi.\n- Bằng bút chì.\n- Dùng cục tẩy hoặc bút chì có tẩy để xóa.\n- Vẽ trên tờ giấy hoặc vở tập vẽ.\n- Bằng bút chì màu, sáp màu, màu dạ,...\n- Dùng trong các bài xé dán, trang trí,...\n- Dùng để dán những miếng giấy màu.\n- Không được, vì tô màu ra bàn, tường,... sẽ làm xấu lớp học.\n- Phát huy."
        },
        {
          teacherActivity: "3. Hoạt động: thực hành, luyện tập.\n- GV yêu cầu HS mở Vở bài tập mĩ thuật 1, trang 3, sử dụng những đồ dùng cần thiết và thực hành theo hướng dẫn.\n- Quan sát, giúp đỡ HS hoàn thành bài thực hành.\n- GV và HS nhận xét, đánh giá một số SPMT đã hoàn thành của HS.\n* Anqp:\n- Giáo dục cho HS về tình yêu quê hương, yêu hòa bình.\n- Nhận biết vẻ đẹp của ngôi trường và tình cảm bạn bè, thầy cô để bồi đắp tình yêu quê hương từ những điều gần gũi.",
          studentActivity: "- HS mở Vở bài tập mĩ thuật 1, trang 3, sử dụng những đồ dùng cần thiết và thực hành.\n- HS hoàn thành bài tập.\n- Nhận xét, đánh giá SPMT của mình, của bạn.\n- Lắng nghe, ghi nhớ.",
          integratedType: "defense_security",
          integratedText: "Anqp: Giáo dục cho HS về tình yêu quê hương, yêu hòa bình. Nhận biết vẻ đẹp của ngôi trường và tình cảm bạn bè, thầy cô để bồi đắp tình yêu quê hương từ những điều gần gũi."
        },
        {
          teacherActivity: "4. Vận dụng:\n- Yêu cầu HS nêu lại kiến thức bài học.\n- Khen ngợi HS.\n- GV liên hệ bài học vào thực tế cuộc sống.\n- Đánh giá chung tiết học.\n- Về nhà xem trước chủ đề 2.\n- Chuẩn bị đồ dùng học tập: Bút chì, tẩy, giấy vẽ, màu vẽ, tranh ảnh liên quan đến bài học sau.\n* Ai:\n- Nhận biết được ngoài các đồ dùng mĩ thuật truyền thống, còn có các thiết bị thông minh ứng dụng AI hỗ trợ con người hoạt động.",
          studentActivity: "- HS nêu.\n- Phát huy.\n- Lắng nghe, mở rộng kiến thức.\n- Trật tự.\n- Thực hiện ở nhà.\n- Chuẩn bị đầy đủ đồ dùng học tập cần thiết cho bài học sau.\n- Lắng nghe, ghi nhớ.",
          integratedType: "ai_integration",
          integratedText: "Ai: Nhận biết được ngoài các đồ dùng mĩ thuật truyền thống, còn có các thiết bị thông minh ứng dụng AI hỗ trợ con người hoạt động."
        }
      ]
    },
    postLessonAdjustment: "…………………………………………………………………………………………………\n…………………………………………………………………………………………………"
  },
  2: {
    grade: 1,
    week: 2,
    subjectTitle: "MĨ THUẬT",
    topicTitle: "CHỦ ĐỀ 2: SÁNG TẠO TỪ NHỮNG CHẤM MÀU",
    periodText: "(Tiết 1)",
    aims: {
      general: [
        "Tạo được chấm bằng nhiều cách khác nhau.",
        "Biết sử dụng chấm để tạo nét, tạo hình và trang trí sản phẩm.",
        "Thực hiện được các bước để làm sản phẩm."
      ],
      capabilities: [
        "HS nhận biết được chấm màu có trong tự nhiên và trong mĩ thuật.",
        "HS tạo được chấm bằng nhiều cách khác nhau."
      ],
      qualities: [
        "Có ý thức chăm chỉ tạo sản phẩm từ chấm màu."
      ],
      integrated: [
        {
          type: "defense_security",
          code: "1.1.1",
          activityReference: "HĐ1",
          content: [
            "Giáo dục tình yêu quê hương, đất nước qua vẻ đẹp thiên nhiên.",
            "Sử dụng chấm màu để thể hiện vẻ đẹp của cảnh sắc quê hương Việt Nam, khơi gợi niềm tự hào về đất nước."
          ]
        }
      ]
    },
    teachingAids: {
      teacher: [
        "Một số SPMT có sử dụng hình thức chấm màu như tranh vẽ, sản phẩm được trang trí từ những chấm màu.",
        "Một số dụng cụ học tập trong môn học như sáp màu dầu, màu acrylic, giấy trắng, tăm bông, que gỗ tròn nhỏ,...",
        "Một số loại hạt phổ biến, thông dụng, một số tờ bìa cứng khổ 15x10 cm, keo sữa cho phần thực hành gắn hạt tạo hình SPMT."
      ],
      student: [
        "Sách học MT lớp 1.",
        "Vở bài tập MT 1.",
        "Bút chì, tẩy, màu vẽ, giấy vẽ, giấy màu, kéo, keo dán, sáp màu dầu, màu acrylic, giấy trắng, tăm bông, que gỗ tròn nhỏ,..."
      ]
    },
    activities: {
      sectionTitle: "III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU",
      steps: [
        {
          teacherActivity: "1. Hoạt động: khởi động\n- GV cho HS chơi TC “Thi viết tên màu sắc”.\n- GV nêu luật chơi, cách chơi.\n- Nhận xét, tuyên dương đội chơi chiến thắng.\n- GV giới thiệu chủ đề bài học.",
          studentActivity: "- HS chọn đội chơi, bạn chơi.\n- Hai đội chơi thi viết tên các màu sắc lên bảng. Đội nào viết được nhiều tên màu trong thời gian chơi hơn là đội chiến thắng.\n- Mở bài học trong SGK mĩ thuật 1."
        },
        {
          teacherActivity: "2. Hoạt động: hình thành kiến thức mới.\n*Hoạt động 1: quan sát\n- GV yêu cầu HS mở SGK mĩ thuật 1, trang 12, 13, quan sát hình minh họa và trả lời câu hỏi:\n+ Những chấm màu xuất hiện ở đâu?\n+ Những hình ảnh trong sách được tạo nên bằng những chấm màu, nhiều chấm màu đặt cạnh nhau có tạo nên mảng màu không?\n- Khi hỏi, GV chỉ vào bức tranh: “Bãi biển ở Hây” để giải thích rõ hơn về nội dung này.\n+ Ngoài những hình minh họa trong sách, em hãy cho biết chấm màu còn xuất hiện ở đâu?\n- GV ghi ý kiến của HS lên bảng (không đánh giá).\n- Căn cứ những ý kiến phát biểu của HS, GV chốt ý:\n+ Chấm màu xuất hiện nhiều trong tự nhiên, có nhiều hình dáng, màu sắc khác nhau.\n+ Trong mĩ thuật, chấm được sử dụng để tạo nên sự sinh động.\n- GV khen ngợi, động viên HS.\n* Anqp:\n- Giáo dục tình yêu quê hương, đất nước qua vẻ đẹp thiên nhiên.\n- Sử dụng chấm màu để thể hiện vẻ đẹp của cảnh sắc quê hương Việt Nam, khơi gợi niềm tự hào về đất nước.\n- GV hướng dẫn",
          studentActivity: "- HS mở SGK mĩ thuật 1, trang 12, 13, quan sát hình minh họa và trả lời câu hỏi.\n- Trong các SPMT, trong tự nhiên,...\n- Có, nhiều chấm màu đặt cạnh nhau có tạo nên mảng màu.\n- Quan sát, tiếp thu.\n- 1, 2 HS trả lời.\n- Quan sát, ghi nhớ.\n- Lắng nghe, ghi nhớ.\n- Tiếp thu.\n- Ghi nhớ.\n- HS lắng nghe.",
          integratedType: "defense_security",
          integratedText: "Anqp: Giáo dục tình yêu quê hương, đất nước qua vẻ đẹp thiên nhiên. Sử dụng chấm màu để thể hiện vẻ đẹp của cảnh sắc quê hương Việt Nam, khơi gợi niềm tự hào về đất nước."
        },
        {
          teacherActivity: "3. Hoạt động: thực hành, luyện tập.\n- GV cho HS quan sát thêm một số tranh đã chuẩn bị, có những chấm màu tạo nên các mảng màu sắc, không gian của bức tranh.\n- Cho các nhóm thảo luận về vẻ đẹp của chấm màu trong tranh: Tạo mảng màu, tạo không gian,...\n- Các nhóm chia sẻ, nêu được về vẻ đẹp của bức tranh từ những chấm màu.\n+ Bạn thấy bức tranh có những chấm màu gì?\n+ Cảm nhận của bạn về vẻ đẹp của chấm màu trong tranh?\n- HS, GV nhận xét, khen ngợi.",
          studentActivity: "- HS quan sát một số tranh của GV, thấy được những chấm màu tạo nên các mảng màu sắc, không gian của bức tranh.\n- Các nhóm thảo luận về vẻ đẹp của chấm màu trong tranh: Tạo mảng màu, tạo không gian,...\n- Các nhóm chia sẻ, nêu được về vẻ đẹp của bức tranh từ những chấm màu.\n- HS trả lời.\n- HS nêu cảm nhận.\n- Phát huy."
        },
        {
          teacherActivity: "4. Vận dụng:\n- Yêu cầu HS nêu lại kiến thức bài học.\n- Khen ngợi HS.\n- GV liên hệ bài học vào thực tế cuộc sống.\n- Đánh giá chung tiết học.\n- Lưu giữ sản phẩm của Tiết 1 (nếu có).\n- Chuẩn bị đồ dùng học tập: Bút chì, tẩy, giấy vẽ, màu vẽ, tranh ảnh... liên quan đến bài học sau.",
          studentActivity: "- HS nêu lại KT bài học.\n- Phát huy.\n- Mở rộng kiến thức bài học vào thực tế.\n- Trật tự.\n- Thực hiện ở nhà.\n- Chuẩn bị đồ dùng học tập cho tiết sau."
        }
      ]
    },
    postLessonAdjustment: "…………………………………………………………………………………………………\n…………………………………………………………………………………………………"
  },
  3: {
    grade: 1,
    week: 3,
    subjectTitle: "MĨ THUẬT",
    topicTitle: "CHỦ ĐỀ 2: SÁNG TẠO TỪ NHỮNG CHẤM MÀU",
    periodText: "(Tiết 2)",
    aims: {
      general: [
        "Tạo được chấm bằng nhiều cách khác nhau (không bắt buộc với HSKT).",
        "Biết sử dụng chấm để tạo nét, tạo hình và trang trí sản phẩm.",
        "Thực hiện được các bước để làm sản phẩm."
      ],
      capabilities: [
        "HS nhận biết được chấm màu có trong tự nhiên và trong mĩ thuật.",
        "HS thấy được vẻ đẹp của chấm màu.",
        "HS tạo được chấm bằng nhiều cách khác nhau.",
        "HS biết sử dụng chấm để tạo nét, tạo hình và trang trí sản phẩm."
      ],
      qualities: [
        "Có ý thức chăm chỉ tạo sản phẩm từ chấm màu.",
        "Có ý thức sưu tầm và biết cách sử dụng đồ vật phế thải sạch để tạo sản phẩm góp phần làm sạch môi trường."
      ]
    },
    teachingAids: {
      teacher: [
        "Một số SPMT có sử dụng hình thức chấm màu như tranh vẽ, sản phẩm được trang trí từ những chấm màu.",
        "Một số dụng cụ học tập trong môn học như sáp màu dầu, màu acrylic, giấy trắng, tăm bông, que gỗ tròn nhỏ,...",
        "Một số loại hạt phổ biến, thông dụng, một số tờ bìa cứng khổ 15x10 cm, keo sữa cho phần thực hành gắn hạt tạo hình SPMT."
      ],
      student: [
        "Sách học MT lớp 1.",
        "Vở bài tập MT 1.",
        "Sản phẩm của Tiết 1 (nếu có).",
        "Bút chì, tẩy, màu vẽ, giấy vẽ, giấy màu, kéo, keo dán, sáp màu dầu, màu acrylic, giấy trắng, tăm bông, que gỗ tròn nhỏ,..."
      ]
    },
    activities: {
      sectionTitle: "III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU",
      steps: [
        {
          teacherActivity: "1. Hoạt động: khởi động\n- GV kiểm tra đồ dùng học tập của HS.\n- Kiểm tra sản phẩm của HS trong tiết 1 (nếu có).\n- Khen ngợi, động viên HS.\n- GV giới thiệu chủ đề bài học.",
          studentActivity: "- Trình bày đồ dùng HT.\n- Trình bày sản phẩm tiết 1 (nếu có).\n- Phát huy.\n- Mở bài học trong SGK mĩ thuật 1."
        },
        {
          teacherActivity: "2. Hoạt động: hình thành kiến thức mới.\n*Hoạt động 2: thể hiện\n- GV hướng dẫn HS quan sát cách tạo chấm màu trong SGK mĩ thuật 1, trang 14.\n- GV thị phạm một số cách tạo chấm màu cho HS quan sát như dùng que gỗ tròn nhỏ chấm 1 màu lên giấy hoặc dùng ngón tay nhúng vào màu để tạo chấm màu,…\n- Thị phạm lần 1: GV chấm 3 chấm liên tục giống nhau và mời HS trả lời câu hỏi: Các chấm này có giống nhau và được nhắc lại không?\n- Thị phạm lần 2: GV chấm màu theo hình thức xen kẽ, 1 chấm đỏ - 1 chấm vàng – 1 chấm đỏ và đặt câu hỏi: Hình thức chấm này có khác với hình thức chấm ở trên không? Khác như thế nào?\n- GV ghi tóm tắt một vài ý kiến trả lời của HS lên trên bảng (không đánh giá).\n- Căn cứ ý kiến của HS, GV giải thích: Hình thức nhắc lại và xen kẽ.\n- Khen ngợi, động viên HS.",
          studentActivity: "- HS quan sát cách tạo chấm màu trong SGK mĩ thuật 1, trang 14.\n- HS quan sát GV thị phạm một số cách tạo chấm màu.\n- Quan sát, trả lời.\n- HS nêu theo ý hiểu.\n- Quan sát, trả lời: Khác nhau về màu sắc xen kẽ.\n- Quan sát, ghi nhớ.\n- Lắng nghe, tiếp thu: Nhắc lại và xen kẽ.\n- Phát huy."
        },
        {
          teacherActivity: "3. Hoạt động: luyện tập, thực hành.\n- GV cho HS thực hành tạo chấm màu vào Vở bài tập mĩ thuật 1, trang 5 theo các cách đã giới thiệu ở trên.\n- Quan sát, giúp đỡ HS hoàn thành bài thực hành.\n*Giới thiệu, nhận xét, chia sẻ sản phẩm:\n- GV cho HS trưng bày sản phẩm, chia sẻ theo gợi ý:\n+ Em tạo SP theo hình thức nào?\n+ Em dùng màu gì để tạo chấm màu?\n+ Em đã làm như thế nào?\n- GV hướng dẫn nhận xét về cách làm, về màu sắc SP của bạn.\n- GV khen ngợi, động viên HS.",
          studentActivity: "- HS thực hành tạo chấm màu vào Vở bài tập mĩ thuật 1, trang 5.\n- Hoàn thành bài tập.\n- HS trưng bày sản phẩm, chia sẻ theo gợi ý.\n- HS nêu hình thức và màu sắc.\n- HS nhận xét về cách làm, về màu sắc SP của bạn.\n- Phát huy."
        },
        {
          teacherActivity: "4. Vận dụng:\n- Yêu cầu HS nêu lại kiến thức bài học.\n- Khen ngợi HS.\n- GV liên hệ bài học vào thực tế cuộc sống.\n- Đánh giá chung tiết học.\n- Lưu giữ sản phẩm của Tiết 2 (nếu có).\n- Nhắc HS chuẩn bị đồ dùng học tập cho bài học sau.",
          studentActivity: "- HS nêu lại KT bài học.\n- Phát huy.\n- Mở rộng kiến thức bài học vào thực tế.\n- Trật tự.\n- Thực hiện ở nhà.\n- Chuẩn bị đồ dùng học tập cho tiết sau."
        }
      ]
    },
    postLessonAdjustment: "…………………………………………………………………………………………………\n…………………………………………………………………………………………………"
  },
  4: {
    grade: 1,
    week: 4,
    subjectTitle: "MĨ THUẬT",
    topicTitle: "CHỦ ĐỀ 2: SÁNG TẠO TỪ NHỮNG CHẤM MÀU",
    periodText: "(Tiết 3)",
    aims: {
      general: [
        "Tạo được chấm bằng nhiều cách khác nhau.",
        "Biết sử dụng chấm để tạo nét, tạo hình và trang trí sản phẩm.",
        "Thực hiện được các bước để làm sản phẩm."
      ],
      capabilities: [
        "HS nhận biết được chấm màu có trong tự nhiên và trong mĩ thuật.",
        "HS thấy được vẻ đẹp của chấm màu.",
        "HS biết cách thể hiện và vận dụng tạo được SPMT từ những chấm màu.",
        "HS tạo được chấm bằng nhiều cách khác nhau."
      ],
      qualities: [
        "Có ý thức chăm chỉ tạo sản phẩm từ chấm màu.",
        "Có ý thức sưu tầm và biết cách sử dụng đồ vật phế thải sạch để tạo sản phẩm góp phần làm sạch môi trường.",
        "Biết chia sẻ, cảm nhận về sản phẩm của mình, của bạn."
      ],
      integrated: [
        {
          type: "ai_integration",
          code: "1.D1.1",
          activityReference: "HĐ3",
          content: [
            "Biết rằng để máy tính nhận ra 'chấm màu' hay vật gì, con người cần cung cấp cho nó rất nhiều ví dụ khác nhau để nó 'học'."
          ]
        }
      ]
    },
    teachingAids: {
      teacher: [
        "Một số SPMT có sử dụng hình thức chấm màu như tranh vẽ, sản phẩm được trang trí từ những chấm màu.",
        "Một số dụng cụ học tập trong môn học như sáp màu dầu, màu acrylic, giấy trắng, tăm bông, que gỗ tròn nhỏ,..."
      ],
      student: [
        "Sách học MT lớp 1, Vở bài tập MT 1, Sản phẩm của Tiết 2."
      ]
    },
    activities: {
      sectionTitle: "III. CÁC HOẠT ĐỘNG DẠY-HỌC CHỦ YẾU",
      steps: [
        {
          teacherActivity: "1. Hoạt động: khởi động\n- GV kiểm tra đồ dùng học tập của HS.\n- Kiểm tra sản phẩm của HS trong tiết 2.\n- Khen ngợi, động viên HS.\n- GV giới thiệu chủ đề bài học.",
          studentActivity: "- Trình bày đồ dùng HT.\n- Trình bày sản phẩm tiết 2.\n- Phát huy.\n- Mở bài học trong SGK mĩ thuật 1."
        },
        {
          teacherActivity: "2. Hoạt động: hình thành kiến thức mới.\n*Hoạt động 3: thảo luận\n- Căn cứ vào những chấm màu HS vừa thực hiện ở tiết 2, GV tổ chức cho HS trả lời câu hỏi: Em đã dùng những hình thức nào để sắp xếp chấm màu?\n- GV yêu cầu HS mở SGK mĩ thuật 1, trang 15, quan sát hình minh họa và thảo luận về các hình thức sắp xếp chấm màu.\n- Tùy vào sĩ số HS thực tế của lớp học, GV tổ chức hoạt động theo các cách phù hợp.",
          studentActivity: "- HS thảo luận, trả lời câu hỏi.\n- HS mở SGK mĩ thuật 1, trang 15, quan sát hình minh họa và thảo luận.\n- Đại diện các nhóm báo cáo."
        },
        {
          teacherActivity: "3. Hoạt động: luyện tập, thực hành.\n- GV yêu cầu HS vận dụng thực hành: Dùng chấm màu để trang trí một đồ vật mà em thích (hoặc vẽ hình và dùng chấm màu để trang trí theo ý thích).\n- GV quan sát, giúp đỡ HS thực hành.\n*Giới thiệu, nhận xét, chia sẻ sản phẩm:\n- GV cho HS trưng bày, chia sẻ về SP.\n* Ai:\n- Biết rằng để máy tính nhận ra 'chấm màu' hay vật gì, con người cần cung cấp cho nó rất nhiều ví dụ khác nhau để nó 'học'.\n- GV hướng dẫn",
          studentActivity: "- HS vận dụng thực hành: Dùng chấm màu để trang trí một đồ vật mà em thích.\n- HS hoàn thành bài tập.\n- HS trưng bày, chia sẻ về SP.\n- HS quan sát lắng nghe.",
          integratedType: "ai_integration",
          integratedText: "Ai: Biết rằng để máy tính nhận ra 'chấm màu' hay vật gì, con người cần cung cấp cho nó rất nhiều ví dụ khác nhau để nó 'học'."
        },
        {
          teacherActivity: "4. Vận dụng:\n- Yêu cầu HS nêu lại kiến thức bài học.\n- Khen ngợi HS.\n- GV liên hệ bài học vào thực tế cuộc sống.\n- Đánh giá chung tiết học.\n- Lưu giữ sản phẩm của Tiết 3.\n- Chuẩn bị đồ dùng học tập cho bài học sau.",
          studentActivity: "- HS nêu lại KT bài học.\n- Phát huy.\n- Mở rộng kiến thức bài học vào thực tế.\n- Thực hiện ở nhà."
        }
      ]
    },
    postLessonAdjustment: "…………………………………………………………………………………………………\n…………………………………………………………………………………………………"
  },
  5: {
    grade: 1,
    week: 5,
    subjectTitle: "MĨ THUẬT",
    topicTitle: "CHỦ ĐỀ 2: SÁNG TẠO TỪ NHỮNG CHẤM MÀU",
    periodText: "(Tiết 4)",
    aims: {
      general: [
        "Tạo được chấm bằng nhiều cách khác nhau.",
        "Biết sử dụng chấm để tạo nét, tạo hình và trang trí sản phẩm.",
        "Thực hiện được các bước để làm sản phẩm."
      ],
      capabilities: [
        "HS nhận biết được chấm màu có trong tự nhiên và trong mĩ thuật.",
        "HS thấy được vẻ đẹp của chấm màu.",
        "HS biết cách thể hiện và vận dụng tạo được SPMT từ những chấm màu."
      ],
      qualities: [
        "Có ý thức chăm chỉ tạo sản phẩm từ chấm màu.",
        "Có ý thức sưu tầm và biết cách sử dụng đồ vật phế thải sạch để tạo sản phẩm góp phần làm sạch môi trường.",
        "Biết chia sẻ, cảm nhận về sản phẩm của mình, của bạn.",
        "Biết tôn trọng, giữ gìn sản phẩm do bạn bè, họa sĩ, … tạo ra."
      ]
    },
    teachingAids: {
      teacher: [
        "Một số SPMT có sử dụng hình thức chấm màu như tranh vẽ, sản phẩm được trang trí từ những chấm màu.",
        "Một số dụng cụ học tập trong môn học: sáp màu dầu, màu acrylic, giấy trắng, que gỗ tròn nhỏ, bìa cứng, keo sữa."
      ],
      student: [
        "Sách học MT lớp 1, Vở bài tập MT 1, Sản phẩm của Tiết 3."
      ]
    },
    activities: {
      sectionTitle: "III. CÁC HOẠT ĐỘNG DẠY-HỌC CHỦ YẾU",
      steps: [
        {
          teacherActivity: "1. Hoạt động: khởi động\n- GV kiểm tra đồ dùng học tập của HS.\n- Kiểm tra sản phẩm của HS trong tiết 3.\n- Khen ngợi, động viên HS.\n- GV giới thiệu chủ đề bài học.",
          studentActivity: "- Trình bày đồ dùng HT.\n- Trình bày sản phẩm tiết 3.\n- Phát huy.\n- Mở bài học trong SGK mĩ thuật 1."
        },
        {
          teacherActivity: "2. Hoạt động: hình thành kiến thức mới.\n*Hoạt động 4: vận dụng\n- GV cho HS mở SGK mĩ thuật 1, trang 15, phần tham khảo: Trang trí chiếc lọ thủy tinh bằng hình thức chấm màu.\n- GV cho HS quan sát hình minh họa một số đồ dùng, sản phẩm mĩ thuật được trang trí bằng hình thức chấm màu trong vở thực hành mĩ thuật 1, trang 6.\n- Khen ngợi, động viên HS.",
          studentActivity: "- HS mở SGK mĩ thuật 1, trang 15, phần tham khảo: Trang trí chiếc lọ thủy tinh bằng hình thức chấm màu.\n- HS quan sát hình minh họa một số đồ dùng.\n- HS trả lời về những đồ vật khác trong cuộc sống cũng được trang trí bằng hình thức chấm màu."
        },
        {
          teacherActivity: "3. Hoạt động: luyện tập, thực hành.\n- GV nêu yêu cầu bài thực hành.\n- Quan sát, động viên, giúp HS hoàn thành bài tập.\n*Trưng bày, nhận xét cuối chủ đề:\n- GV mời HS giới thiệu, chia sẻ về bài thực hành của mình, của bạn theo các gợi ý:\n+ Em sử dụng cách nào để tạo chấm màu?\n+ Em sắp xếp các chấm màu theo hình thức nào?\n+ Em thích sản phẩm nào nhất? Vì sao?\n- GV cùng HS nhận xét, đánh giá sản phẩm chủ yếu trên tinh thần động viên, khích lệ HS.",
          studentActivity: "- Nắm được yêu cầu bài thực hành.\n- Hoàn thành bài thực hành.\n- HS giới thiệu, chia sẻ về bài thực hành của mình, của bạn.\n- HS nêu theo cảm nhận.\n- HS nhận xét, đánh giá sản phẩm của mình, của bạn."
        },
        {
          teacherActivity: "4. Vận dụng:\n- Yêu cầu HS nêu lại kiến thức bài học.\n- Khen ngợi HS.\n- GV liên hệ bài học vào thực tế cuộc sống.\n- Đánh giá chung tiết học.\n- Về nhà xem trước chủ đề 3.\n- Chuẩn bị đồ dùng học tập cho bài học sau.",
          studentActivity: "- HS nêu.\n- Phát huy.\n- Lắng nghe, mở rộng kiến thức.\n- Trật tự.\n- Thực hiện ở nhà.\n- Chuẩn bị đầy đủ đồ dùng học tập cần thiết cho bài học sau."
        }
      ]
    },
    postLessonAdjustment: "…………………………………………………………………………………………………\n…………………………………………………………………………………………………"
  }
};
