import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quên mật khẩu',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)' }}>
          Quên mật khẩu?
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
          Nhập email để nhận link đặt lại mật khẩu.
        </p>
      </div>
      {/* <ForgotPasswordForm /> */}
      <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', color: 'var(--color-text-secondary)' }}>
        <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
          ← Quay lại đăng nhập
        </Link>
      </p>
    </>
  );
}
