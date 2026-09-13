import DashboardMenu from "./DashboardMenu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen max-w-full overflow-x-hidden"><DashboardMenu />{children}</div>;
}
