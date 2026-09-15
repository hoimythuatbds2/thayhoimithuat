import { MasterLessonPlanContent } from '../types';

export const MASTER_CONTENT_K3: Record<number, MasterLessonPlanContent> = {
  1: {
    grade: 3,
    week: 1,
    subjectTitle: "MĨ THUẬT",
    topicTitle: "CHỦ ĐỀ 1: EM YÊU MĨ THUẬT",
    periodText: "(Tiết 1)",
    aims: {
      general: [
        "HS biết về một số hoạt động thực hành, sáng tạo mĩ thuật trong và ngoài nhà trường.",
        "HS biết đến một số sản phẩm MT được thực hành trong môn học."
      ],
      capabilities: [
        "HS biết về một số hoạt động thực hành, sáng tạo mĩ thuật trong và ngoài nhà trường.",
        "HS biết đến một số sản phẩm MT được thực hành trong môn học.",
        "HS biết được về một số dạng sản phẩm MT tạo hình và sản phẩm MT ứng dụng được thực hành, sáng tạo trong nhà trường.",
        "HS phân biệt được sản phẩm MT 2D và 3D.",
        "HS biết đến những hoạt động liên quan đến môn Mĩ thuật để quan tâm đến môn học hơn.",
        "HS biết được vẻ đẹp của sản phẩm MT, từ đó thêm yêu thích môn học."
      ],
      qualities: [
        "HS có ý thức tích cực tham gia các hoạt động mĩ thuật."
      ],
      integrated: [
        {
          type: "defense_security",
          code: "3.0.1",
          activityReference: "HĐ2",
          content: [
            "Nhận thức về tình yêu quê hương, đất nước.",
            "Nhận biết vẻ đẹp của các sản phẩm mĩ thuật truyền thống để nuôi dưỡng tình yêu quê hương."
          ]
        },
        {
          type: "ai_integration",
          code: "3.B2.1",
          activityReference: "HĐ3",
          content: [
            "Nhận biết và nêu được ví dụ về việc thông tin hoặc sản phẩm do AI tạo ra có thể không đúng với sự thật.",
            "Nhận biết được sự khác nhau giữa tác phẩm mĩ thuật do con người tạo ra và hình ảnh mô phỏng do AI tạo ra."
          ]
        }
      ]
    },
    teachingAids: {
      teacher: [
        "Một số sản phẩm MT 2D, 3D và sản phẩm MT tạo hình, ứng dụng để phân tích trực tiếp cho HS theo dõi, phân biệt.",
        "Một số video, clip giới thiệu về hoạt động liên quan đến môn Mĩ thuật như: Thực hành ngoài trời, tham quan bảo tàng... để chiếu cho HS quan sát."
      ],
      student: [
        "SGK mĩ thuật 3, vở bài tập mĩ thuật 3.",
        "Bút chì, bút lông, hộp màu, sáp màu, giấy vẽ, giấy màu các loại, kéo, keo dán, đất nặn, vật liệu tái sử dụng."
      ]
    },
    activities: {
      sectionTitle: "III. CÁC HOẠT ĐỘNG DẠY-HỌC CHỦ YẾU",
      steps: [
        {
          teacherActivity: "1. Hoạt động: khởi động\n- GV cho HS xem video về các hoạt động vẽ tranh, các sản phẩm mĩ thuật đẹp.\n- GV hỏi HS có yêu thích mĩ thuật không?\n- Nhận xét, khen ngợi HS.\n- Giới thiệu chủ đề bài học.",
          studentActivity: "- HS xem.\n- HS nêu.\n- Mở bài học, ghi tên bài vào vở MT."
        },
        {
          teacherActivity: "2. Hoạt động: hình thành kiến thức mới.\n2.1. Hoạt động mĩ thuật.\n- GV mời một số HS nói những hiểu biết của mình về một số hoạt động đặc thù của môn mĩ thuật mà các em đã tham gia ở trong và ngoài trường học.\n2.2. Sản phẩm mĩ thuật.\n- GV mời một số HS nói về những SPMT đã thực hiện trong năm học trước và gọi tên những SPMT này theo cách hiểu của mình.\n* Anqp:\n- Nhận thức về tình yêu quê hương, đất nước.\n- Nhận biết vẻ đẹp của các sản phẩm mĩ thuật truyền thống để nuôi dưỡng tình yêu quê hương.\n- GV hướng dẫn.",
          studentActivity: "- HS nói những hiểu biết của mình về các hoạt động mĩ thuật.\n- HS nói về những SPMT đã thực hiện trong năm học trước.\n- HS quan sát lắng nghe.",
          integratedType: "defense_security",
          integratedText: "Anqp: Nhận thức về tình yêu quê hương, đất nước. Nhận biết vẻ đẹp của các sản phẩm mĩ thuật truyền thống để nuôi dưỡng tình yêu quê hương."
        },
        {
          teacherActivity: "3. Hoạt động: luyện tập, thực hành.\n- GV cho HS viết những SPMT muốn thể hiện vào Vở bài tập MT3 hoặc vào giấy nhằm giúp HS có ý thức ban đầu về nhiệm vụ học tập sẽ thực hiện trong năm học này.\n- GV khen ngợi động viên HS.\n* Ai:\n- Nhận biết và nêu được ví dụ về việc thông tin hoặc sản phẩm do AI tạo ra có thể không đúng với sự thật.\n- Nhận biết được sự khác nhau giữa tác phẩm mĩ thuật do con người tạo ra và hình ảnh mô phỏng do AI tạo ra.\n- GV hướng dẫn.",
          studentActivity: "- HS viết những SPMT muốn thể hiện vào Vở bài tập MT3.\n- HS quan sát lắng nghe.",
          integratedType: "ai_integration",
          integratedText: "Ai: Nhận biết và nêu được ví dụ về việc thông tin hoặc sản phẩm do AI tạo ra có thể không đúng với sự thật. Nhận biết được sự khác nhau giữa tác phẩm mĩ thuật do con người tạo ra và hình ảnh mô phỏng do AI tạo ra."
        },
        {
          teacherActivity: "4. Vận dụng:\n- Yêu cầu HS nêu lại kiến thức bài học.\n- Khen ngợi, động viên HS.\n- Liên hệ bài học vào thực tế cuộc sống.\n- Đánh giá chung tiết học.\n- Xem trước chủ đề 2.\n- Chuẩn bị đầy đủ: Giấy vẽ, giấy màu, màu vẽ, keo, bút chì, kéo... cho bài sau.",
          studentActivity: "- 1, 2 HS nêu.\n- Phát huy.\n- Mở rộng kiến thức thực tế.\n- Trật tự.\n- Thực hiện ở nhà.\n- Chuẩn bị ở nhà."
        }
      ]
    },
    postLessonAdjustment: "…………………………………………………………………………………………………\n…………………………………………………………………………………………………"
  },
  2: {
    grade: 3,
    week: 2,
    subjectTitle: "MĨ THUẬT",
    topicTitle: "CHỦ ĐỀ 2: HOA VĂN TRÊN TRANG PHỤC CỦA MỘT SỐ DÂN TỘC",
    periodText: "(Tiết 1)",
    aims: {
      general: [
        "HS biết về một số hoa văn được tạo nên từ nét.",
        "HS hiểu về việc kết hợp của hoa văn trong trang trí đồ vật."
      ],
      capabilities: [
        "HS biết về một số hoa văn được tạo nên từ nét.",
        "HS hiểu về việc kết hợp của hoa văn trong trang trí đồ vật.",
        "HS có khả năng sử dụng các nét đã biết để chép một mẫu hoa văn trên trang phục mình yêu thích.",
        "HS sử dụng được mẫu hoa văn yêu thích trang trí một đồ vật bằng hình thức vẽ, nặn, đắp nổi."
      ],
      qualities: [
        "HS có ý thức gắn kết kiến thức môn học với việc trang trí, làm đẹp đồ vật trong cuộc sống.",
        "HS biết về vẻ đẹp trên trang phục của một số dân tộc, từ đó có thêm tình cảm với đồng bào ở các vùng miền của đất nước."
      ],
      integrated: [
        {
          type: "defense_security",
          code: "3.1.1",
          activityReference: "HĐ2",
          content: [
            "Giáo dục truyền thống chống giặc ngoại xâm - gắn với bản sắc dân tộc.",
            "Thể hiện niềm tự hào về bản sắc văn hóa các dân tộc anh em và ý thức bảo vệ truyền thống dân tộc."
          ]
        }
      ]
    },
    teachingAids: {
      teacher: [
        "Một số hình ảnh, video clip giới thiệu về hoa văn trên trang phục của một số dân tộc tại địa phương để trình chiếu trên PowerPoint cho HS quan sát.",
        "Hình ảnh SPMT được trang trí từ một số hoa văn để làm minh họa, phân tích về cách sử dụng hoa văn trong trang trí đồ vật để HS quan sát trực tiếp."
      ],
      student: [
        "SGK mĩ thuật 3, vở bài tập mĩ thuật 3.",
        "Giấy vẽ, giấy màu, bút chì, màu vẽ các loại, kéo, keo dán, đất nặn, vật liệu tái sử dụng."
      ]
    },
    activities: {
      sectionTitle: "III. CÁC HOẠT ĐỘNG DẠY-HỌC CHỦ YẾU",
      steps: [
        {
          teacherActivity: "1. Hoạt động: khởi động\n- GV cho HS xem video về các Lễ hội, trang phục có hoa văn đặc sắc của một số dân tộc.\n- Hỏi HS thấy hình ảnh gì trong video?\n- Khen ngợi HS.\n- GV giới thiệu chủ đề.",
          studentActivity: "- HS xem video.\n- Lễ hội và trang phục người dân tộc.\n- Mở bài học, ghi tên bài vào vở MT."
        },
        {
          teacherActivity: "2. Hoạt động: hình thành kiến thức mới.\n2.1. Quan sát\n- GV cho HS quan sát hoa văn trên trang phục của đồng bào dân tộc Mông, Ê-Đê, Chăm trong SGK MT3, trang 8, 9, 10.\n* Anqp:\n- Giáo dục truyền thống chống giặc ngoại xâm - gắn với bản sắc dân tộc.\n- Thể hiện niềm tự hào về bản sắc văn hóa các dân tộc anh em và ý thức bảo vệ truyền thống dân tộc.\n- GV hướng dẫn.",
          studentActivity: "- HS quan sát và nhận biết hoa văn trên trang phục các dân tộc.\n- HS quan sát lắng nghe.",
          integratedType: "defense_security",
          integratedText: "Anqp: Giáo dục truyền thống chống giặc ngoại xâm - gắn với bản sắc dân tộc. Thể hiện niềm tự hào về bản sắc văn hóa các dân tộc anh em và ý thức bảo vệ truyền thống dân tộc."
        },
        {
          teacherActivity: "3. Hoạt động: luyện tập, thực hành.\n- GV nêu yêu cầu bài thực hành: HS sử dụng mẫu hoa văn trang trí một đồ vật yêu thích.\n*Giới thiệu, nhận xét, chia sẻ sản phẩm.",
          studentActivity: "- HS tiến hành sử dụng mẫu hoa văn trang trí một đồ vật yêu thích.\n- HS trưng bày, chia sẻ về SP."
        },
        {
          teacherActivity: "4. Vận dụng:\n- Yêu cầu HS nêu lại kiến thức bài học.\n- Đánh giá chung tiết học.\n- Chuẩn bị đồ dùng cho tiết sau.",
          studentActivity: "- 1, 2 HS nêu.\n- Phát huy.\n- Chuẩn bị đầy đủ."
        }
      ]
    },
    postLessonAdjustment: "…………………………………………………………………………………………………\n…………………………………………………………………………………………………"
  },
  3: {
    grade: 3,
    week: 3,
    subjectTitle: "MĨ THUẬT",
    topicTitle: "CHỦ ĐỀ 2: HOA VĂN TRÊN TRANG PHỤC CỦA MỘT SỐ DÂN TỘC",
    periodText: "(Tiết 2)",
    aims: {
      general: [
        "HS hiểu về việc kết hợp của hoa văn trong trang trí đồ vật."
      ],
      capabilities: [
        "HS biết về một số hoa văn được tạo nên từ nét.",
        "HS thấy được vẻ đẹp của sản phẩm về chủ đề: Hoa văn trên trang phục của một số dân tộc trong mĩ thuật và trong cuộc sống.",
        "HS sử dụng hoa văn trang trí được một vật em yêu thích.",
        "HS sắp xếp được các sản phẩm cá nhân tạo thành sản phẩm nhóm."
      ],
      qualities: [
        "HS có ý thức gắn kết kiến thức môn học với việc trang trí, làm đẹp đồ vật trong cuộc sống."
      ],
      integrated: [
        {
          type: "ai_integration",
          code: "3.C5.1",
          activityReference: "HĐ3",
          content: [
            "Hiểu được cấu trúc nếu ... thì ... trong việc giải quyết tình huống hoặc phân loại.",
            "Hiểu được quy luật lặp lại của hoa văn trên trang phục dân tộc như một dạng 'thuật toán' (Nếu vị trí A là nét cong thì vị trí B cũng là nét cong)."
          ]
        }
      ]
    },
    teachingAids: {
      teacher: ["Hình ảnh SPMT được trang trí từ một số hoa văn."],
      student: ["SGK mĩ thuật 3, vở bài tập mĩ thuật 3, Sản phẩm của Tiết 1."]
    },
    activities: {
      sectionTitle: "III. CÁC HOẠT ĐỘNG DẠY-HỌC CHỦ YẾU",
      steps: [
        {
          teacherActivity: "1. Hoạt động: khởi động\n- GV kiểm tra sản phẩm của HS trong Tiết 1.\n- Khen ngợi HS.\n- GV giới thiệu chủ đề.",
          studentActivity: "- HS trình bày sản phẩm của Tiết 1.\n- Phát huy."
        },
        {
          teacherActivity: "2. Hoạt động: hình thành kiến thức mới.\n2.3. Thảo luận\n- GV cho HS thực hiện thảo luận theo câu hỏi trong SGK MT3, trang 12.\n* Ai:\n- Hiểu được cấu trúc nếu ... thì ... trong việc giải quyết tình huống hoặc phân loại.\n- Hiểu được quy luật lặp lại của hoa văn trên trang phục dân tộc như một dạng 'thuật toán' (Nếu vị trí A là nét cong thì vị trí B cũng là nét cong).\n- GV hướng dẫn.",
          studentActivity: "- HS thực hiện thảo luận theo câu hỏi trong SGK MT3, trang 12 và trả lời.\n- HS quan sát lắng nghe.",
          integratedType: "ai_integration",
          integratedText: "Ai: Hiểu được cấu trúc nếu ... thì ... trong việc giải quyết tình huống hoặc phân loại. Hiểu được quy luật lặp lại của hoa văn trên trang phục dân tộc như một dạng 'thuật toán' (Nếu vị trí A là nét cong thì vị trí B cũng là nét cong)."
        },
        {
          teacherActivity: "3. Hoạt động: luyện tập, thực hành.\n- GV nêu yêu cầu bài thực hành: HS sử dụng hoa văn yêu thích trang trí một chậu cây cảnh.\n*Trưng bày, nhận xét cuối chủ đề.",
          studentActivity: "- HS sử dụng hoa văn yêu thích trang trí một chậu cây cảnh.\n- HS trưng bày SPMT cá nhân/nhóm, chia sẻ cảm nhận."
        },
        {
          teacherActivity: "4. Vận dụng:\n- Yêu cầu HS nêu lại kiến thức bài học.\n- Đánh giá chung tiết học.",
          studentActivity: "- HS nêu.\n- Phát huy."
        }
      ]
    },
    postLessonAdjustment: "…………………………………………………………………………………………………\n…………………………………………………………………………………………………"
  }
};
