// ============================================================
// (auth)/layout.tsx — Layout riêng cho trang Auth
// Không có header/footer, chỉ hiển thị form giữa màn hình
// ============================================================
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg-secondary)',
      padding: 'var(--space-4)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'var(--color-bg-primary)',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: 'var(--shadow-xl)',
        padding: 'var(--space-8)',
      }}>
        {children}
      </div>
    </div>
  );
}
