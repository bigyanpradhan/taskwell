import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function Dashboard({ params }) {
  return (
    <div>
      <Navbar />
      <div className="p-10 h-screen">Dashboard</div>
      <Footer />
    </div>
  );
}
