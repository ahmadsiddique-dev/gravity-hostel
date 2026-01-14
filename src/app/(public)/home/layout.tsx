import Footer from "@/components/elements/Footer";
import { NavbarItem } from "@/components/elements/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <NavbarItem />
        {children}
        <Footer />
    </div>
  );
}
