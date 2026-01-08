import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function ForgotPassword({ params }) {
  return (
    <div>
      <Navbar />
      <ForgotPasswordForm />
      <Footer />
    </div>
  );
}
