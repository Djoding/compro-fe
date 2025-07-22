"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { usePathname } from "next/navigation";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if current page is login or admin
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/admin');

  if (isAuthPage) {
    // For auth pages (login/admin), return children directly without navbar/footer
    return <>{children}</>;
  }

  // For regular pages, include navbar, main wrapper, and footer
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
