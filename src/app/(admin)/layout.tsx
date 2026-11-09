import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout">
      <aside>{/* Admin nav */}</aside>
      <main>{children}</main>
    </div>
  );
}