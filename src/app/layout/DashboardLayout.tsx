import { Outlet, NavLink } from "react-router-dom";
import { cn } from "@/shared/utils/cn";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold">SYGT Dashboard</h1>

        <nav className="flex flex-col gap-2">
          <NavItem to="/cajeros" label="Cajeros" />
          <NavItem to="/pagos" label="Pagos" />
          <NavItem to="/recibos" label="Recibos" />
          <NavItem to="/extornos" label="Extornos" />
          <NavItem to="/contribuyentes" label="Contribuyentes" />
          <NavItem to="/conceptos" label="Concepto Pago" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "px-3 py-2 rounded-md text-sm font-medium transition",
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-200"
        )
      }
    >
      {label}
    </NavLink>
  );
}
