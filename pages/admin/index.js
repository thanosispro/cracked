import UnverifiedPage from "@/components/admin/dashboard";
import LoginForm from "@/components/admin/form";
import { requireAdmin } from "@/utils/requireAdmin";

export async function getServerSideProps(ctx) {
  return requireAdmin(ctx);
}

export default function AdminIndex({ isAuthenticated }) {
  if (!isAuthenticated) return <LoginForm />;
  return <UnverifiedPage />;
}
