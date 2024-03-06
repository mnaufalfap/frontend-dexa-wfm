import { ReactNode } from "react";
import { NavbarDefault } from "../../components/dashboard/navbar/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavbarDefault />
      <main>{children}</main>
    </div>
  );
}
