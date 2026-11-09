import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Không tìm thấy trang',
};

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '1rem',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Trang không tồn tại</h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        Trang bạn tìm kiếm đã bị xoá hoặc không tồn tại.
      </p>
      <Link
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          background: 'var(--color-primary)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        Về trang chủ
      </Link>
    </div>
  );
}
