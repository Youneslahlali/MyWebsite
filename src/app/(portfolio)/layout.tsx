import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen selection:bg-[#eaff00] selection:text-black flex flex-col">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
