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

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className={isAuthPage ? "" : "min-h-screen"}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}
