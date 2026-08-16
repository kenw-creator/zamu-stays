import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-paper">
      <AdminNav />
      <div className="flex-1 p-5 md:p-10">{children}</div>
    </div>
  );
}
