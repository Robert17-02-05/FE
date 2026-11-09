import { z } from 'zod';

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string) =>
  /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(phone.replace(/\s/g, ''));

export const getPasswordStrength = (password: string): number => {
  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export const PASSWORD_STRENGTH_LABELS = ['Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
export const PASSWORD_STRENGTH_COLORS = ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#16a34a'];

export const isValidUrl = (url: string): boolean => {
  try { new URL(url); return true; }
  catch { return false; }
};

export const isValidImageFile = (file: File) =>
  ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type);

export const isFileSizeValid = (file: File, maxMB: number) =>
  file.size <= maxMB * 1024 * 1024;

// ── Zod Schemas ───────────────────────────────────────────────
export const loginSchema = z.object({
  email:    z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

export const registerSchema = z.object({
  fullName:        z.string().min(2, 'Họ tên tối thiểu 2 ký tự'),
  email:           z.string().email('Email không hợp lệ'),
  password:        z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự'),
  confirmPassword: z.string(),
  phone:           z.string()
    .regex(/^(0|\+84)(3|5|7|8|9)\d{8}$/, 'Số điện thoại không hợp lệ')
    .optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

export type LoginFormData    = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
