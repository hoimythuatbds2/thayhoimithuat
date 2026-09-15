import { IntegrationColorConfig, IntegrationType } from '../types';

export const INTEGRATION_COLORS: Record<IntegrationType, IntegrationColorConfig> = {
  stem: {
    type: 'stem',
    label: 'STEM',
    colorName: 'Tím',
    hex: '#7C3AED', // Purple
    bgHex: '#F3E8FF',
    description: 'Giáo dục STEM liên môn'
  },
  local_edu: {
    type: 'local_edu',
    label: 'GD địa phương',
    colorName: 'Đỏ',
    hex: '#DC2626', // Red
    bgHex: '#FEE2E2',
    description: 'Giáo dục truyền thống & văn hóa địa phương'
  },
  human_rights: {
    type: 'human_rights',
    label: 'Quyền con người',
    colorName: 'Xanh lá',
    hex: '#16A34A', // Green
    bgHex: '#DCFCE7',
    description: 'Tôn trọng quyền trẻ em và con người'
  },
  digital_competence: {
    type: 'digital_competence',
    label: 'Năng lực số',
    colorName: 'Hồng',
    hex: '#DB2777', // Pink
    bgHex: '#FCE7F3',
    description: 'Ứng dụng công nghệ số và phần mềm'
  },
  defense_security: {
    type: 'defense_security',
    label: 'Quốc phòng an ninh (ANQP)',
    colorName: 'Cam',
    hex: '#EA580C', // Orange
    bgHex: '#FFEDD5',
    description: 'Giáo dục quốc phòng và an ninh Tổ quốc'
  },
  ai_integration: {
    type: 'ai_integration',
    label: 'Lồng ghép giáo dục AI',
    colorName: 'Xanh da trời nhạt',
    hex: '#0284C7', // Sky blue / light blue
    bgHex: '#E0F2FE',
    description: 'Khái niệm & nhận thức trí tuệ nhân tạo'
  },
  digital_citizenship: {
    type: 'digital_citizenship',
    label: 'Kĩ năng công dân số',
    colorName: 'Xanh da trời đậm',
    hex: '#1D4ED8', // Dark blue
    bgHex: '#DBEAFE',
    description: 'Kĩ năng ứng xử văn minh và bảo mật số'
  },
  traffic_safety: {
    type: 'traffic_safety',
    label: 'An toàn giao thông',
    colorName: 'Nâu',
    hex: '#92400E', // Brown
    bgHex: '#FEF3C7',
    description: 'Ý thức chấp hành quy định an toàn giao thông'
  },
  none: {
    type: 'none',
    label: 'Không tích hợp',
    colorName: 'Đen',
    hex: '#111827',
    bgHex: '#F3F4F6',
    description: 'Nội dung kiến thức chuyên môn thuần túy'
  }
};
