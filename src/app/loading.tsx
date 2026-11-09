// ============================================================
// loading.tsx — Global loading UI (Next.js Suspense boundary)
// Hiển thị khi route đang load
// ============================================================
export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <div className="animate-spin" style={{
        width: 40,
        height: 40,
        border: '3px solid var(--color-border)',
        borderTop: '3px solid var(--color-primary)',
        borderRadius: '50%',
      }} />
    </div>
  );
}
