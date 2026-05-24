import Footer from "@/components/modules/HomePage/Footer";
import Navbar from "@/components/modules/HomePage/Navbar";
export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}