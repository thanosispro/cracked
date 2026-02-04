import LoginForm from "@/components/admin/form";
import UploadQuestion from "@/components/admin/UploadQuestion";
import { requireAdmin } from "@/utils/requireAdmin";

export async function getServerSideProps(ctx) {
  return requireAdmin(ctx);
}

export default function BulkUploadPage({ isAuthenticated }) {
  if (!isAuthenticated) return <LoginForm />;
  return <UploadQuestion />;
}