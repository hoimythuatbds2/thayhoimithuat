# HƯỚNG DẪN ĐĂNG ỨNG DỤNG LÊN VERCEL (BẢO TOÀN BẢO MẬT 100%)

Tài liệu này hướng dẫn chi tiết cách đưa ứng dụng **Quản Lý Kế Hoạch Bài Dạy Mĩ Thuật** lên nền tảng **Vercel (https://vercel.com/)** mà vẫn giữ trọn vẹn mọi cơ chế bảo mật:
- **Serverless API Authentication**: Xác thực người dùng qua Google OAuth và Firestore `allowed_users` trên Serverless Functions.
- **Master Template Password Protection**: Bảo vệ mật khẩu thay đổi file mẫu bằng biến môi trường `TEMPLATE_PASSWORD` chạy trên Serverless Backend.
- **Admin RBAC Enforcement**: Phân quyền Admin đa tầng (Client + Server + Firestore Rules).
- **Firestore Security Rules**: Quy tắc an ninh dữ liệu đã được cấu hình chặt chẽ trên Google Cloud Firestore.

---

## 1. Kiến trúc hệ thống đã được xây dựng sẵn cho Vercel

Dự án đã được cấu hình sẵn các tệp phục vụ Vercel:
1. **`vercel.json`**: Cấu hình rewrite định tuyến toàn bộ request `/api/*` vào Serverless Function và SPA fallback cho React.
2. **`api/index.ts`**: Điểm kích hoạt Vercel Serverless Function, chuyển tiếp các API bảo mật (`/api/auth/verify-allowed-user`, `/api/admin/*`, `/api/verify-template-password`).
3. **`server.ts`**: Hoạt động linh hoạt ở cả môi trường Container thông thường (port 3000) và môi trường Vercel Serverless Function.
4. **`src/lib/firebase.ts`**: Tự động nhận diện cấu hình từ file `firebase-applet-config.json` hoặc các biến môi trường `VITE_FIREBASE_*`.

---

## 2. Các bước triển khai lên Vercel

### Bước 1: Tải mã nguồn hoặc đẩy lên GitHub
- Xuất mã nguồn từ Google AI Studio (nhấn menu Export -> Download ZIP hoặc Push to GitHub).
- Nếu tải ZIP về máy, giải nén và đưa vào kho GitHub cá nhân của bạn:
  ```bash
  git init
  git add .
  git commit -m "Khoi tao du an san sang Vercel"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
  git push -u origin main
  ```

### Bước 2: Import dự án trên Vercel
1. Đăng nhập vào [https://vercel.com/](https://vercel.com/).
2. Nhấn nút **"Add New..."** -> **"Project"**.
3. Chọn kho lưu trữ GitHub bạn vừa tạo và nhấn **"Import"**.
4. Tại mục **Build and Output Settings**:
   - **Framework Preset**: Chọn **Vite** (hoặc để nguyên hệ thống tự nhận diện).
   - **Root Directory**: `./` (để mặc định).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Bước 3: Cấu hình biến môi trường (Environment Variables) trên Vercel
Tại trang cấu hình trước khi nhấn Deploy (hoặc trong mục **Settings > Environment Variables** của dự án trên Vercel), thêm các biến sau:

| Tên biến | Bắt buộc? | Mô tả / Giá trị mẫu |
|---|---|---|
| `TEMPLATE_PASSWORD` | **Có** | Mật khẩu bí mật để chỉnh sửa TUAN_01.pdf (VD: `Admin@2025Secret`) |
| `ADMIN_EMAILS` | Tùy chọn | Danh sách email quản trị phân cách bởi dấu phẩy (nếu muốn bổ sung thêm admin) |
| `VITE_FIREBASE_API_KEY` | Tùy chọn | API Key Firebase (nếu không commit file config) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Tùy chọn | `ai-studio-trltokhochbidymt.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Tùy chọn | `ai-studio-trltokhochbidymt` |
| `VITE_FIREBASE_DATABASE_ID` | Tùy chọn | `ai-studio-trltokhochbidymt-6d8f795c-20e8-42b4-b455-af077ee7b386` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Tùy chọn | `ai-studio-trltokhochbidymt.firebasestorage.app` |
| `VITE_FIREBASE_APP_ID` | Tùy chọn | App ID của dự án Firebase |

> **Lưu ý**: Dự án đã có sẵn tệp `firebase-applet-config.json` chứa cấu hình kết nối Firebase. Do đó bạn chỉ cần thiết lập tối thiểu `TEMPLATE_PASSWORD` là hệ thống đã hoạt động hoàn hảo!

### Bước 4: Thêm tên miền Vercel vào Firebase Authentication (CỰC KỲ QUAN TRỌNG)
Để tính năng Đăng nhập bằng Google hoạt động được trên tên miền Vercel (tránh lỗi `auth/unauthorized-domain`):
1. Truy cập [Firebase Console](https://console.firebase.google.com/).
2. Chọn dự án: `ai-studio-trltokhochbidymt`.
3. Vào menu **Authentication** (bên trái) -> Chọn tab **Settings** -> **Authorized domains**.
4. Nhấn **Add domain**:
   - Thêm tên miền dự án Vercel của bạn, ví dụ: `ten-du-an-cua-ban.vercel.app`
   - (Khuyến nghị) Thêm cả `vercel.app` để áp dụng cho mọi URL xem trước (preview).
5. Nhấn **Save**.

---

## 3. Kiểm tra tính năng bảo mật sau khi triển khai

1. **Đăng nhập Google**:
   - Thử đăng nhập bằng tài khoản Admin (`hoi.mythuatbs2@gmail.com`, `ducphuc209219@gmail.com`, `nguyenhoi.education@gmail.com`).
   - Kiểm tra xem nút **Quản trị hệ thống** có hiển thị và mở được giao diện quản lý hay không.
2. **Khóa người dùng ngoài danh sách (Gatekeeper)**:
   - Thử đăng nhập bằng một email Google ngẫu nhiên chưa được thêm vào bảng `allowed_users`.
   - Hệ thống sẽ chặn ngay lập tức và hiển thị thông báo yêu cầu liên hệ Admin.
3. **Bảo vệ Master Template**:
   - Vào mục cấu hình / tải lên file mẫu tuần 1.
   - Nhập sai mật khẩu -> Hệ thống từ chối qua API serverless.
   - Nhập đúng `TEMPLATE_PASSWORD` đã đặt trên Vercel -> Hệ thống cho phép thực hiện.
4. **Phân quyền Admin**:
   - Admin có thể thêm hoặc xóa email giáo viên trong bảng `allowed_users` trực tiếp từ giao diện Vercel.

---

Chúc mừng bạn! Ứng dụng đã sẵn sàng chạy với tốc độ cao, khả năng chịu tải toàn cầu của Vercel Serverless và mạng lưới bảo mật kiên cố của Google Firebase.
