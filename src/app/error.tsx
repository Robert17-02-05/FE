'use client';

// ============================================================
// error.tsx — Global error boundary (Next.js)
// ============================================================
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ghi log lỗi lên monitoring service (Sentry...)
    console.error('Global error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '1rem',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
        😵 Đã có lỗi xảy ra!
      </h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        {error.message || 'Vui lòng thử lại sau.'}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '0.75rem 1.5rem',
          background: 'var(--color-primary)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
          cursor: 'pointer',
        }}
      >
        Thử lại
      </button>
    </div>
  );
}
