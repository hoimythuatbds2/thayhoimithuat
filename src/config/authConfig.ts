/**
 * Danh sách email quản trị viên (Admin) - chỉ các email này được thấy và sử dụng trang quản trị admin
 */
export const ADMIN_EMAILS: string[] = [
  'ducphuc209219@gmail.com',
  'nguyenhoi.education@gmail.com',
  'animizht1208@gmail.com'
];

/**
 * Danh sách email được phép khởi tạo mặc định
 */
export const ALLOWED_EMAILS: string[] = [
  'nguyenhoi.it@gmail.com',
  'mithuat.cungchiase@gmail.com',
  ...ADMIN_EMAILS
];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.some(admin => admin.toLowerCase() === normalized);
}

export function isEmailAuthorized(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return (
    isAdminEmail(normalized) ||
    ALLOWED_EMAILS.some(allowed => allowed.toLowerCase() === normalized)
  );
}
