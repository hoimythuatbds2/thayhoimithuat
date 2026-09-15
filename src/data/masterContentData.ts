import { MasterLessonPlanContent, MasterContentMeta } from '../types';
import { MASTER_CONTENT_K1 } from './masterK1';
import { MASTER_CONTENT_K2 } from './masterK2';
import { MASTER_CONTENT_K3 } from './masterK3';
import { MASTER_CONTENT_K4 } from './masterK4';
import { MASTER_CONTENT_K5 } from './masterK5';

export const INITIAL_MASTER_CONTENTS: MasterContentMeta[] = [
  { grade: 1, fileName: 'k1.pdf', lastUpdated: '2026-09-01', lessonCount: 35, status: 'ready' },
  { grade: 2, fileName: 'k2.pdf', lastUpdated: '2026-09-01', lessonCount: 35, status: 'ready' },
  { grade: 3, fileName: 'k3.pdf', lastUpdated: '2026-09-01', lessonCount: 35, status: 'ready' },
  { grade: 4, fileName: 'k4.pdf', lastUpdated: '2026-09-01', lessonCount: 35, status: 'ready' },
  { grade: 5, fileName: 'k5.pdf', lastUpdated: '2026-09-01', lessonCount: 35, status: 'ready' },
];

export const CURRICULUM_SYLLABUS: Record<number, { week: number; topic: string; period: string }[]> = {
  1: [
    { week: 1, topic: "Chủ đề 1: Mĩ thuật trong nhà trường", period: "Tiết 1" },
    { week: 2, topic: "Chủ đề 2: Sáng tạo từ những chấm màu", period: "Tiết 1" },
    { week: 3, topic: "Chủ đề 2: Sáng tạo từ những chấm màu", period: "Tiết 2" },
    { week: 4, topic: "Chủ đề 2: Sáng tạo từ những chấm màu", period: "Tiết 3" },
    { week: 5, topic: "Chủ đề 2: Sáng tạo từ những chấm màu", period: "Tiết 4" },
    { week: 6, topic: "Chủ đề 3: Nét vẽ của em", period: "Tiết 1" },
    { week: 7, topic: "Chủ đề 3: Nét vẽ của em", period: "Tiết 2" },
    { week: 8, topic: "Chủ đề 3: Nét vẽ của em", period: "Tiết 3" },
    { week: 9, topic: "Chủ đề 4: Sáng tạo từ những hình cơ bản", period: "Tiết 1" },
    { week: 10, topic: "Chủ đề 4: Sáng tạo từ những hình cơ bản", period: "Tiết 2" },
    { week: 11, topic: "Chủ đề 4: Sáng tạo từ những hình cơ bản", period: "Tiết 3" },
    { week: 12, topic: "Chủ đề 4: Sáng tạo từ những hình cơ bản", period: "Tiết 4" },
    { week: 13, topic: "Chủ đề 5: Màu cơ bản trong mĩ thuật", period: "Tiết 1" },
    { week: 14, topic: "Chủ đề 5: Màu cơ bản trong mĩ thuật", period: "Tiết 2" },
    { week: 15, topic: "Chủ đề 5: Màu cơ bản trong mĩ thuật", period: "Tiết 3" },
    { week: 16, topic: "Chủ đề 5: Màu cơ bản trong mĩ thuật", period: "Tiết 4" },
    { week: 17, topic: "Kiểm tra đánh giá học kì I", period: "Tiết 1" },
    { week: 18, topic: "Chủ đề 6: Sáng tạo từ những khối cơ bản", period: "Tiết 1" },
    { week: 19, topic: "Chủ đề 6: Sáng tạo từ những khối cơ bản", period: "Tiết 2" },
    { week: 20, topic: "Chủ đề 6: Sáng tạo từ những khối cơ bản", period: "Tiết 3" },
    { week: 21, topic: "Chủ đề 6: Sáng tạo từ những khối cơ bản", period: "Tiết 4" },
    { week: 22, topic: "Chủ đề 7: Hoa, quả", period: "Tiết 1" },
    { week: 23, topic: "Chủ đề 7: Hoa, quả", period: "Tiết 2" },
    { week: 24, topic: "Chủ đề 7: Hoa, quả", period: "Tiết 3" },
    { week: 25, topic: "Chủ đề 7: Hoa, quả", period: "Tiết 4" },
    { week: 26, topic: "Chủ đề 8: Người thân của em", period: "Tiết 1" },
    { week: 27, topic: "Chủ đề 8: Người thân của em", period: "Tiết 2" },
    { week: 28, topic: "Chủ đề 8: Người thân của em", period: "Tiết 3" },
    { week: 29, topic: "Chủ đề 8: Người thân của em", period: "Tiết 4" },
    { week: 30, topic: "Chủ đề 9: Em là học sinh lớp một", period: "Tiết 1" },
    { week: 31, topic: "Chủ đề 9: Em là học sinh lớp một", period: "Tiết 2" },
    { week: 32, topic: "Chủ đề 9: Em là học sinh lớp một", period: "Tiết 3" },
    { week: 33, topic: "Chủ đề 9: Em là học sinh lớp một", period: "Tiết 4" },
    { week: 34, topic: "Kiểm tra đánh giá cuối năm học", period: "Tiết 1" },
    { week: 35, topic: "Trưng bày sản phẩm cuối năm", period: "Tiết 1" }
  ],
  2: [
    { week: 1, topic: "Chủ đề 1: Mĩ thuật trong cuộc sống", period: "Tiết 1" },
    { week: 2, topic: "Chủ đề 2: Sự thú vị của nét", period: "Tiết 1" },
    { week: 3, topic: "Chủ đề 2: Sự thú vị của nét", period: "Tiết 2" },
    { week: 4, topic: "Chủ đề 3: Sự kết hợp của các hình cơ bản", period: "Tiết 1" },
    { week: 5, topic: "Chủ đề 3: Sự kết hợp của các hình cơ bản", period: "Tiết 2" },
    { week: 6, topic: "Chủ đề 3: Sự kết hợp của các hình cơ bản", period: "Tiết 3" },
    { week: 7, topic: "Chủ đề 4: Những mảng màu yêu thích", period: "Tiết 1" },
    { week: 8, topic: "Chủ đề 4: Những mảng màu yêu thích", period: "Tiết 2" },
    { week: 9, topic: "Chủ đề 4: Những mảng màu yêu thích", period: "Tiết 3" },
    { week: 10, topic: "Chủ đề 5: Sự kết hợp thú vị của khối", period: "Tiết 1" },
    { week: 11, topic: "Chủ đề 5: Sự kết hợp thú vị của khối", period: "Tiết 2" },
    { week: 12, topic: "Chủ đề 5: Sự kết hợp thú vị của khối", period: "Tiết 3" },
    { week: 13, topic: "Chủ đề 6: Sắc màu thiên nhiên", period: "Tiết 1" },
    { week: 14, topic: "Chủ đề 6: Sắc màu thiên nhiên", period: "Tiết 2" },
    { week: 15, topic: "Chủ đề 6: Sắc màu thiên nhiên", period: "Tiết 3" },
    { week: 16, topic: "Chủ đề 6: Sắc màu thiên nhiên", period: "Tiết 4" },
    { week: 17, topic: "Kiểm tra đánh giá học kì I", period: "Tiết 1" },
    { week: 18, topic: "Chủ đề 7: Gương mặt thân quen", period: "Tiết 1" },
    { week: 19, topic: "Chủ đề 7: Gương mặt thân quen", period: "Tiết 2" },
    { week: 20, topic: "Chủ đề 7: Gương mặt thân quen", period: "Tiết 3" },
    { week: 21, topic: "Chủ đề 7: Gương mặt thân quen", period: "Tiết 4" },
    { week: 22, topic: "Chủ đề 8: Bữa cơm gia đình", period: "Tiết 1" },
    { week: 23, topic: "Chủ đề 8: Bữa cơm gia đình", period: "Tiết 2" },
    { week: 24, topic: "Chủ đề 8: Bữa cơm gia đình", period: "Tiết 3" },
    { week: 25, topic: "Chủ đề 8: Bữa cơm gia đình", period: "Tiết 4" },
    { week: 26, topic: "Chủ đề 9: Thầy cô của em", period: "Tiết 1" },
    { week: 27, topic: "Chủ đề 9: Thầy cô của em", period: "Tiết 2" },
    { week: 28, topic: "Chủ đề 9: Thầy cô của em", period: "Tiết 3" },
    { week: 29, topic: "Chủ đề 9: Thầy cô của em", period: "Tiết 4" },
    { week: 30, topic: "Chủ đề 10: Đồ chơi từ tạo hình con vật", period: "Tiết 1" },
    { week: 31, topic: "Chủ đề 10: Đồ chơi từ tạo hình con vật", period: "Tiết 2" },
    { week: 32, topic: "Chủ đề 10: Đồ chơi từ tạo hình con vật", period: "Tiết 3" },
    { week: 33, topic: "Chủ đề 10: Đồ chơi từ tạo hình con vật", period: "Tiết 4" },
    { week: 34, topic: "Kiểm tra đánh giá cuối năm học", period: "Tiết 1" },
    { week: 35, topic: "Trưng bày sản phẩm cuối năm", period: "Tiết 1" }
  ],
  3: [
    { week: 1, topic: "Chủ đề 1: Em yêu mĩ thuật", period: "Tiết 1" },
    { week: 2, topic: "Chủ đề 2: Hoa văn trên trang phục của một số dân tộc", period: "Tiết 1" },
    { week: 3, topic: "Chủ đề 2: Hoa văn trên trang phục của một số dân tộc", period: "Tiết 2" },
    { week: 4, topic: "Chủ đề 3: Màu sắc em yêu", period: "Tiết 1" },
    { week: 5, topic: "Chủ đề 3: Màu sắc em yêu", period: "Tiết 2" },
    { week: 6, topic: "Chủ đề 3: Màu sắc em yêu", period: "Tiết 3" },
    { week: 7, topic: "Chủ đề 4: Vẻ đẹp của khối", period: "Tiết 1" },
    { week: 8, topic: "Chủ đề 4: Vẻ đẹp của khối", period: "Tiết 2" },
    { week: 9, topic: "Chủ đề 4: Vẻ đẹp của khối", period: "Tiết 3" },
    { week: 10, topic: "Chủ đề 5: Một số vật liệu sử dụng trong thực hành, sáng tạo mĩ thuật", period: "Tiết 1" },
    { week: 11, topic: "Chủ đề 5: Một số vật liệu sử dụng trong thực hành, sáng tạo mĩ thuật", period: "Tiết 2" },
    { week: 12, topic: "Chủ đề 5: Một số vật liệu sử dụng trong thực hành, sáng tạo mĩ thuật", period: "Tiết 3" },
    { week: 13, topic: "Chủ đề 6: Biết ơn thầy cô", period: "Tiết 1" },
    { week: 14, topic: "Chủ đề 6: Biết ơn thầy cô", period: "Tiết 2" },
    { week: 15, topic: "Chủ đề 6: Biết ơn thầy cô", period: "Tiết 3" },
    { week: 16, topic: "Chủ đề 6: Biết ơn thầy cô", period: "Tiết 4" },
    { week: 17, topic: "Kiểm tra đánh giá cuối học kì I", period: "Tiết 1" },
    { week: 18, topic: "Chủ đề 7: Cảnh vật quanh em", period: "Tiết 1" },
    { week: 19, topic: "Chủ đề 7: Cảnh vật quanh em", period: "Tiết 2" },
    { week: 20, topic: "Chủ đề 7: Cảnh vật quanh em", period: "Tiết 3" },
    { week: 21, topic: "Chủ đề 7: Cảnh vật quanh em", period: "Tiết 4" },
    { week: 22, topic: "Chủ đề 8: Chân dung người thân trong gia đình", period: "Tiết 1" },
    { week: 23, topic: "Chủ đề 8: Chân dung người thân trong gia đình", period: "Tiết 2" },
    { week: 24, topic: "Chủ đề 8: Chân dung người thân trong gia đình", period: "Tiết 3" },
    { week: 25, topic: "Chủ đề 8: Chân dung người thân trong gia đình", period: "Tiết 4" },
    { week: 26, topic: "Chủ đề 9: Sinh hoạt trong gia đình", period: "Tiết 1" },
    { week: 27, topic: "Chủ đề 9: Sinh hoạt trong gia đình", period: "Tiết 2" },
    { week: 28, topic: "Chủ đề 9: Sinh hoạt trong gia đình", period: "Tiết 3" },
    { week: 29, topic: "Chủ đề 9: Sinh hoạt trong gia đình", period: "Tiết 4" },
    { week: 30, topic: "Chủ đề 10: An toàn giao thông", period: "Tiết 1" },
    { week: 31, topic: "Chủ đề 10: An toàn giao thông", period: "Tiết 2" },
    { week: 32, topic: "Chủ đề 10: An toàn giao thông", period: "Tiết 3" },
    { week: 33, topic: "Chủ đề 10: An toàn giao thông", period: "Tiết 4" },
    { week: 34, topic: "Kiểm tra đánh giá cuối năm học", period: "Tiết 1" },
    { week: 35, topic: "Trưng bày sản phẩm cuối năm", period: "Tiết 1" }
  ],
  4: [
    { week: 1, topic: "Chủ đề 1: Vẻ đẹp trong điêu khắc đình làng Việt Nam", period: "Tiết 1" },
    { week: 2, topic: "Chủ đề 1: Vẻ đẹp trong điêu khắc đình làng Việt Nam", period: "Tiết 2" },
    { week: 3, topic: "Chủ đề 1: Vẻ đẹp trong điêu khắc đình làng Việt Nam", period: "Tiết 3" },
    { week: 4, topic: "Chủ đề 1: Vẻ đẹp trong điêu khắc đình làng Việt Nam", period: "Tiết 4" },
    { week: 5, topic: "Chủ đề 2: Một số dạng không gian trong tranh dân gian Việt Nam", period: "Tiết 1" },
    { week: 6, topic: "Chủ đề 2: Một số dạng không gian trong tranh dân gian Việt Nam", period: "Tiết 2" },
    { week: 7, topic: "Chủ đề 2: Một số dạng không gian trong tranh dân gian Việt Nam", period: "Tiết 3" },
    { week: 8, topic: "Chủ đề 2: Một số dạng không gian trong tranh dân gian Việt Nam", period: "Tiết 4" },
    { week: 9, topic: "Chủ đề 3: Cảnh đẹp quê hương", period: "Tiết 1" },
    { week: 10, topic: "Chủ đề 3: Cảnh đẹp quê hương", period: "Tiết 2" },
    { week: 11, topic: "Chủ đề 3: Cảnh đẹp quê hương", period: "Tiết 3" },
    { week: 12, topic: "Chủ đề 3: Cảnh đẹp quê hương", period: "Tiết 4" },
    { week: 13, topic: "Chủ đề 4: Vẻ đẹp trong cuộc sống", period: "Tiết 1" },
    { week: 14, topic: "Chủ đề 4: Vẻ đẹp trong cuộc sống", period: "Tiết 2" },
    { week: 15, topic: "Chủ đề 4: Vẻ đẹp trong cuộc sống", period: "Tiết 3" },
    { week: 16, topic: "Chủ đề 4: Vẻ đẹp trong cuộc sống", period: "Tiết 4" },
    { week: 17, topic: "Kiểm tra đánh giá cuối học kì I", period: "Tiết 1" },
    { week: 18, topic: "Chủ đề 5: Những kỉ niệm đẹp", period: "Tiết 1" },
    { week: 19, topic: "Chủ đề 5: Những kỉ niệm đẹp", period: "Tiết 2" },
    { week: 20, topic: "Chủ đề 5: Những kỉ niệm đẹp", period: "Tiết 3" },
    { week: 21, topic: "Chủ đề 5: Những kỉ niệm đẹp", period: "Tiết 4" },
    { week: 22, topic: "Chủ đề 6: Mái trường yêu dấu", period: "Tiết 1" },
    { week: 23, topic: "Chủ đề 6: Mái trường yêu dấu", period: "Tiết 2" },
    { week: 24, topic: "Chủ đề 6: Mái trường yêu dấu", period: "Tiết 3" },
    { week: 25, topic: "Chủ đề 6: Mái trường yêu dấu", period: "Tiết 4" },
    { week: 26, topic: "Chủ đề 7: Môi trường xanh-sạch-đẹp", period: "Tiết 1" },
    { week: 27, topic: "Chủ đề 7: Môi trường xanh-sạch-đẹp", period: "Tiết 2" },
    { week: 28, topic: "Chủ đề 7: Môi trường xanh-sạch-đẹp", period: "Tiết 3" },
    { week: 29, topic: "Chủ đề 7: Môi trường xanh-sạch-đẹp", period: "Tiết 4" },
    { week: 30, topic: "Chủ đề 8: Quê hương thanh bình", period: "Tiết 1" },
    { week: 31, topic: "Chủ đề 8: Quê hương thanh bình", period: "Tiết 2" },
    { week: 32, topic: "Chủ đề 8: Quê hương thanh bình", period: "Tiết 3" },
    { week: 33, topic: "Chủ đề 8: Quê hương thanh bình", period: "Tiết 4" },
    { week: 34, topic: "Kiểm tra đánh giá cuối năm học", period: "Tiết 1" },
    { week: 35, topic: "Trưng bày sản phẩm cuối năm", period: "Tiết 1" }
  ],
  5: [
    { week: 1, topic: "Chủ đề 1: Yếu tố tạo hình trong thực hành, sáng tạo theo chủ đề", period: "Tiết 1" },
    { week: 2, topic: "Chủ đề 1: Yếu tố tạo hình trong thực hành, sáng tạo theo chủ đề", period: "Tiết 2" },
    { week: 3, topic: "Chủ đề 1: Yếu tố tạo hình trong thực hành, sáng tạo theo chủ đề", period: "Tiết 3" },
    { week: 4, topic: "Chủ đề 1: Yếu tố tạo hình trong thực hành, sáng tạo theo chủ đề", period: "Tiết 4" },
    { week: 5, topic: "Chủ đề 2: Hình tượng anh hùng dân tộc trong mĩ thuật tạo hình Việt Nam", period: "Tiết 1" },
    { week: 6, topic: "Chủ đề 2: Hình tượng anh hùng dân tộc trong mĩ thuật tạo hình Việt Nam", period: "Tiết 2" },
    { week: 7, topic: "Chủ đề 2: Hình tượng anh hùng dân tộc trong mĩ thuật tạo hình Việt Nam", period: "Tiết 3" },
    { week: 8, topic: "Chủ đề 2: Hình tượng anh hùng dân tộc trong mĩ thuật tạo hình Việt Nam", period: "Tiết 4" },
    { week: 9, topic: "Chủ đề 3: Gia đình", period: "Tiết 1" },
    { week: 10, topic: "Chủ đề 3: Gia đình", period: "Tiết 2" },
    { week: 11, topic: "Chủ đề 3: Gia đình", period: "Tiết 3" },
    { week: 12, topic: "Chủ đề 3: Gia đình", period: "Tiết 4" },
    { week: 13, topic: "Chủ đề 4: Những hoạt động yêu thích ở trường em", period: "Tiết 1" },
    { week: 14, topic: "Chủ đề 4: Những hoạt động yêu thích ở trường em", period: "Tiết 2" },
    { week: 15, topic: "Chủ đề 4: Những hoạt động yêu thích ở trường em", period: "Tiết 3" },
    { week: 16, topic: "Chủ đề 4: Những hoạt động yêu thích ở trường em", period: "Tiết 4" },
    { week: 17, topic: "Kiểm tra đánh giá cuối học kì I", period: "Tiết 1" },
    { week: 18, topic: "Chủ đề 5: Những việc làm bình dị mà cao quý trong cuộc sống", period: "Tiết 1" },
    { week: 19, topic: "Chủ đề 5: Những việc làm bình dị mà cao quý trong cuộc sống", period: "Tiết 2" },
    { week: 20, topic: "Chủ đề 5: Những việc làm bình dị mà cao quý trong cuộc sống", period: "Tiết 3" },
    { week: 21, topic: "Chủ đề 5: Những việc làm bình dị mà cao quý trong cuộc sống", period: "Tiết 4" },
    { week: 22, topic: "Chủ đề 6: Cảnh sắc quê hương", period: "Tiết 1" },
    { week: 23, topic: "Chủ đề 6: Cảnh sắc quê hương", period: "Tiết 2" },
    { week: 24, topic: "Chủ đề 6: Cảnh sắc quê hương", period: "Tiết 3" },
    { week: 25, topic: "Chủ đề 6: Cảnh sắc quê hương", period: "Tiết 4" },
    { week: 26, topic: "Chủ đề 7: Việt Nam đất nước, con người", period: "Tiết 1" },
    { week: 27, topic: "Chủ đề 7: Việt Nam đất nước, con người", period: "Tiết 2" },
    { week: 28, topic: "Chủ đề 7: Việt Nam đất nước, con người", period: "Tiết 3" },
    { week: 29, topic: "Chủ đề 7: Việt Nam đất nước, con người", period: "Tiết 4" },
    { week: 30, topic: "Chủ đề 8: Vì một thế giới hòa bình", period: "Tiết 1" },
    { week: 31, topic: "Chủ đề 8: Vì một thế giới hòa bình", period: "Tiết 2" },
    { week: 32, topic: "Chủ đề 8: Vì một thế giới hòa bình", period: "Tiết 3" },
    { week: 33, topic: "Chủ đề 8: Vì một thế giới hòa bình", period: "Tiết 4" },
    { week: 34, topic: "Kiểm tra đánh giá cuối năm học", period: "Tiết 1" },
    { week: 35, topic: "Trưng bày sản phẩm cuối năm", period: "Tiết 1" }
  ]
};

// Retrieve lesson plan from the master content repository for specific grade and week
export function getMasterLessonPlan(grade: number, week: number): MasterLessonPlanContent | null {
  let map: Record<number, MasterLessonPlanContent>;
  if (grade === 1) map = MASTER_CONTENT_K1;
  else if (grade === 2) map = MASTER_CONTENT_K2;
  else if (grade === 3) map = MASTER_CONTENT_K3;
  else if (grade === 4) map = MASTER_CONTENT_K4;
  else if (grade === 5) map = MASTER_CONTENT_K5;
  else return null;

  if (map[week]) {
    return map[week];
  }

  // If week specifically exists in our direct repository, return it.
  // Otherwise, fallback to base syllabus topic structure while strictly preserving Source-locked standards
  const syllabus = CURRICULUM_SYLLABUS[grade];
  const item = syllabus?.find(s => s.week === week);
  if (!item) return null;

  return {
    grade,
    week,
    subjectTitle: `MĨ THUẬT ${grade}`,
    topicTitle: item.topic.toUpperCase(),
    periodText: item.period,
    aims: {
      general: [
        `HS tìm hiểu và thực hành nội dung ${item.topic} (${item.period}).`,
        "Biết vận dụng các yếu tố mĩ thuật đã học để tạo hình và trang trí sản phẩm."
      ],
      capabilities: [
        `Nhận biết và thể hiện được đặc điểm của ${item.topic}.`,
        "Rèn luyện kĩ năng quan sát, thực hành sáng tạo sản phẩm mĩ thuật."
      ],
      qualities: [
        "Có ý thức chăm chỉ, giữ gìn vệ sinh lớp học và yêu quý sản phẩm sáng tạo của bạn bè."
      ],
      integrated: [
        {
          type: "defense_security",
          code: `${grade}.1.1`,
          activityReference: "HĐ2",
          content: [
            "Lồng ghép bồi dưỡng tình yêu quê hương đất nước qua nét đẹp mĩ thuật truyền thống."
          ]
        },
        {
          type: "ai_integration",
          code: `${grade}.A1.1`,
          activityReference: "HĐ3",
          content: [
            "Nhận biết được vai trò hỗ trợ của công nghệ số và AI trong tìm kiếm tư liệu mĩ thuật."
          ]
        }
      ]
    },
    teachingAids: {
      teacher: [
        `Sách giáo khoa, đồ dùng dạy học Mĩ thuật lớp ${grade}.`,
        "Tranh ảnh minh hoạ, video clip liên quan đến chủ đề bài học."
      ],
      student: [
        `Sách học Mĩ thuật lớp ${grade}, vở bài tập.`,
        "Bút chì, tẩy, màu vẽ, giấy vẽ, giấy màu, kéo, keo dán, đất nặn..."
      ]
    },
    activities: {
      sectionTitle: "III. CÁC HOẠT ĐỘNG DẠY-HỌC CHỦ YẾU",
      steps: [
        {
          teacherActivity: "1. Hoạt động: khởi động\n- Ổn định lớp, tổ chức trò chơi gắn với chủ đề.\n- GV giới thiệu bài học.",
          studentActivity: "- Tham gia khởi động sôi nổi.\n- Mở SGK, ghi tên bài vào vở."
        },
        {
          teacherActivity: `2. Hoạt động: hình thành kiến thức mới.\n- Hướng dẫn HS quan sát tranh ảnh, hiện vật minh hoạ trong SGK về ${item.topic}.\n- Đặt câu hỏi gợi mở để HS tìm hiểu đặc điểm, hình khối, màu sắc.`,
          studentActivity: "- HS quan sát, trao đổi nhóm và trả lời các câu hỏi của GV.\n- Tiếp thu kiến thức cốt lõi."
        },
        {
          teacherActivity: "3. Hoạt động: luyện tập, thực hành.\n- GV nêu yêu cầu bài thực hành: HS vận dụng kiến thức tạo hình sản phẩm theo yêu cầu.\n- Quan sát, giúp đỡ HS hoàn thành bài tập.\n*Trưng bày, nhận xét sản phẩm.",
          studentActivity: "- HS thực hành làm sản phẩm.\n- Trưng bày và chia sẻ cảm nhận về sản phẩm của mình, của bạn."
        },
        {
          teacherActivity: "4. Vận dụng:\n- Yêu cầu HS nêu lại kiến thức bài học.\n- Đánh giá chung tiết học, dặn dò chuẩn bị cho bài sau.",
          studentActivity: "- Nêu lại kiến thức đã học.\n- Chuẩn bị đồ dùng cho bài học tiếp theo."
        }
      ]
    },
    postLessonAdjustment: "…………………………………………………………………………………………………\n…………………………………………………………………………………………………"
  };
}
