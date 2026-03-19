import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen selection:bg-[#eaff00] selection:text-black">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
