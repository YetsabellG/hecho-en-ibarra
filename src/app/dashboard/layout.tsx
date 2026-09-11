import DashboardMenu from "./DashboardMenu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <><DashboardMenu />{children}</>;
}
