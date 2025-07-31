"use client";

import { Button } from "@/components/ui/button";
import { AdminLanguageSwitcher } from "@/components/ui/admin-language-switcher";
import { useTranslations } from "@/hooks/use-translations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuthToken, removeAuthToken } from "@/lib/api";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  X,
  Building2,
  FolderOpen,
  Briefcase,
  MessageSquare,
  Mail,
  HelpCircle,
  Monitor,
  Award,
  MapPin,
  PackageOpen
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslations();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuItems = [
    {
      label: t("admin.menu.dashboard"),
      href: "/admin/dashboard",
      icon: LayoutDashboard
    },
    {
      label: t("admin.menu.companyProfile"),
      href: "/admin/company-profile",
      icon: Building2
    },
    {
      label: t("admin.menu.projects"),
      href: "/admin/projects",
      icon: FolderOpen
    },
    {
      label: t("admin.menu.products"),
      href: "/admin/products",
      icon: PackageOpen
    },
    {
      label: t("admin.menu.team"),
      href: "/admin/team",
      icon: Users
    },
    {
      label: t("admin.menu.services"),
      href: "/admin/services",
      icon: Briefcase
    },
    {
      label: t("admin.menu.testimonials"),
      href: "/admin/testimonials",
      icon: MessageSquare
    },
    {
      label: t("admin.menu.contact"),
      href: "/admin/contact",
      icon: Mail
    },
    {
      label: t("admin.menu.faqs"),
      href: "/admin/faqs",
      icon: HelpCircle
    },
    {
      label: t("admin.menu.platforms"),
      href: "/admin/platforms",
      icon: Monitor
    },
    {
      label: t("admin.menu.certificates"),
      href: "/admin/certificates",
      icon: Award
    },
    {
      label: t("admin.menu.journey"),
      href: "/admin/journey",
      icon: MapPin
    }
  ];

  useEffect(
    () => {
      const token = getAuthToken();
      if (!token) {
        router.push("/login");
      } else {
        setIsLoggedIn(true);
      }
    },
    [router]
  );

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    try {
      removeAuthToken();
      document.cookie = "admin_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      setShowLogoutDialog(false);
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      // Even if there's an error, redirect to login for security
      router.push("/login");
    }
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t("admin.title")}</h1>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="mt-8">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-100 border-r-2 border-blue-700"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              <span className="ml-4 text-sm text-gray-600 dark:text-gray-300 font-medium">{t("admin.welcome")}</span>
            </div>

            <div className="flex items-center space-x-3">
              <AdminLanguageSwitcher />
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden sm:block">{t("admin.logout")}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-red-600" />
              {t("admin.logoutConfirmation.title") || "Konfirmasi Logout"}
            </DialogTitle>
            <DialogDescription>
              {t("admin.logoutConfirmation.message") ||
                "Apakah Anda yakin ingin keluar dari panel admin? Anda akan perlu login kembali untuk mengakses halaman ini."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={cancelLogout} className="flex-1">
              {t("admin.logoutConfirmation.cancel") || "Batal"}
            </Button>
            <Button variant="destructive" onClick={confirmLogout} className="flex-1">
              <LogOut className="mr-2 h-4 w-4" />
              {t("admin.logoutConfirmation.confirm") || "Ya, Logout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
