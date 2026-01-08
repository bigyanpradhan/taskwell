import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default async function LoginPage({ params }) {
  return (
    <div>
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
}
