import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - Teknalogi",
  description: "Login to Teknalogi Admin Panel",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
