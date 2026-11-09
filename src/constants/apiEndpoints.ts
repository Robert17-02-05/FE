// ============================================================
// apiEndpoints.ts — Tất cả API endpoints tập trung 1 chỗ
// ============================================================

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const AUTH_ENDPOINTS = {
  LOGIN:           '/auth/login',
  REGISTER:        '/auth/register',
  LOGOUT:          '/auth/logout',
  REFRESH_TOKEN:   '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD:  '/auth/reset-password',
  VERIFY_EMAIL:    '/auth/verify-email',
  ME:              '/auth/me',
} as const;

export const USER_ENDPOINTS = {
  LIST:            '/users',
  DETAIL:          (id: string) => `/users/${id}`,
  UPDATE:          (id: string) => `/users/${id}`,
  DELETE:          (id: string) => `/users/${id}`,
  UPDATE_AVATAR:   (id: string) => `/users/${id}/avatar`,
  CHANGE_PASSWORD: '/users/change-password',
} as const;

export const PRODUCT_ENDPOINTS = {
  LIST:     '/products',
  DETAIL:   (id: string) => `/products/${id}`,
  CREATE:   '/products',
  UPDATE:   (id: string) => `/products/${id}`,
  DELETE:   (id: string) => `/products/${id}`,
  SEARCH:   '/products/search',
  FEATURED: '/products/featured',
} as const;

export const CATEGORY_ENDPOINTS = {
  LIST:   '/categories',
  DETAIL: (id: string) => `/categories/${id}`,
} as const;

export const ORDER_ENDPOINTS = {
  LIST:   '/orders',
  DETAIL: (id: string) => `/orders/${id}`,
  CREATE: '/orders',
  CANCEL: (id: string) => `/orders/${id}/cancel`,
} as const;

export const BLOG_ENDPOINTS = {
  LIST:   '/posts',
  DETAIL: (slug: string) => `/posts/${slug}`,
} as const;

export const UPLOAD_ENDPOINTS = {
  IMAGE: '/upload/image',
  FILE:  '/upload/file',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR:    'Lỗi kết nối, vui lòng kiểm tra mạng.',
  SERVER_ERROR:     'Lỗi máy chủ, vui lòng thử lại sau.',
  UNAUTHORIZED:     'Phiên đăng nhập hết hạn.',
  FORBIDDEN:        'Bạn không có quyền thực hiện thao tác này.',
  NOT_FOUND:        'Không tìm thấy dữ liệu.',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ.',
} as const;
