import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ScrollIndicator from "@/components/layout/scroll-indicator";
import ConditionalLayout from "@/components/conditional-layout";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teknalogi - Accelerating Your Business Through Digital Innovation",
  description:
    "PT. Teknalogi Transformasi Digital - We are dedicated digital innovation partners focused on accelerating business growth, designing and building custom technology solutions.",
  keywords:
    "digital innovation, technology solutions, web development, cloud solutions, digital transformation",
  authors: [{ name: "Teknalogi" }],
  openGraph: {
    title: "Teknalogi - Digital Innovation Partners",
    description: "Accelerating Your Business Through Digital Innovation",
    siteName: "Teknalogi",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${ibmPlexSans.variable} ${manrope.variable}`}
    >
      <body className="antialiased font-sans">
        <ScrollIndicator />
        <Navbar />
        <ConditionalLayout>
          <main className="min-h-screen">{children}</main>
        </ConditionalLayout>
        <Footer />
      </body>
    </html>
  );
}