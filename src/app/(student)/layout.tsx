// ============================================================
// (student)/layout.tsx — Layout for STUDENT role routes
// Role verification is done here (server-side), not in middleware.
// ============================================================
import type { ReactNode } from 'react';

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="student-layout">
      {/* Student sidebar navigation — implement in components/layout/ */}
      <aside>{/* nav */}</aside>
      <main>{children}</main>
    </div>
  );
}
