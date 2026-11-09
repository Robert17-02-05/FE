import type { ReactNode } from "react";

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="employer-layout">
      {/* Sidebar nhà tuyển dụng */}
      <aside>{/* nav */}</aside>
      <main>{children}</main>
    </div>
  );
}