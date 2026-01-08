import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function ResetPassword() {
  return (
    <div>
      <Navbar />
      <ResetPasswordForm />
      <Footer />
    </div>
  );
}
