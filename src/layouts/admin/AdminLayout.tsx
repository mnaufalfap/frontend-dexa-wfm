import { ReactNode } from "react";
import { NavbarAdmin } from "../../components/admin/navbar/NavbarAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavbarAdmin />
      <main>{children}</main>
    </div>
  );
}
