import LoginForm from "@/components/admin/form";
import AdminSettings from "@/components/admin/setting";
import { requireAdmin } from "@/utils/requireAdmin";

export async function getServerSideProps(ctx) {
  return requireAdmin(ctx);
}

export default function AdminSettingsPage({ isAuthenticated }) {
  if (!isAuthenticated) return <LoginForm />;
  return <AdminSettings />;
}
