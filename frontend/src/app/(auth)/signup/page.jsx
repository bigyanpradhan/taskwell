import SignupForm from "@/components/auth/SignUpForm";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default async function SignupPage({ params }) {
  return (
    <div>
      <Navbar />
      <SignupForm />
      <Footer />
    </div>
  );
}
