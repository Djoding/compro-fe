"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { companyProfileAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { Save, Building2 } from "lucide-react";

interface CompanyProfile {
  id: string;
  companyOverview: string;
  coreValues: string;
  vision: string;
  mission: string;
  customerService: string;
}

export default function CompanyProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile>({
    id: "",
    companyOverview: "",
    coreValues: "",
    vision: "",
    mission: "",
    customerService: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslations();

  useEffect(() => {
    if (isInitialized) return; // Prevent multiple calls

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await companyProfileAPI.getProfile();
        if (response.status === "success") {
          setProfile(response.data as CompanyProfile);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: getFriendlyErrorMessage(error),
          variant: "destructive"
        });
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount to prevent glitching

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return; // Prevent multiple submissions

    setSaving(true);

    try {
      const response = await companyProfileAPI.updateProfile({ ...profile });
      if (response.status === "success") {
        toast({
          title: t("admin.common.success") || "Berhasil",
          description: t("admin.pages.companyProfile.saveSuccess") || "Profil perusahaan berhasil diperbarui",
          variant: "success"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(error),
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = useCallback((field: keyof CompanyProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  }, []);

  if (loading && !isInitialized) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("admin.pages.companyProfile.title") || "Profil Perusahaan"}</h1>
          <p className="text-gray-600">
            {t("admin.pages.companyProfile.subtitle") || "Kelola informasi dasar tentang perusahaan"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.form.companyOverview") || "Gambaran Perusahaan"}</CardTitle>
            <CardDescription>Deskripsi singkat tentang perusahaan yang akan ditampilkan di halaman utama</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={profile.companyOverview}
              onChange={e => setProfile(prev => ({ ...prev, companyOverview: e.target.value }))}
              placeholder={
                t("admin.pages.companyProfile.form.companyOverviewPlaceholder") || "Tulis gambaran umum tentang perusahaan..."
              }
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.form.vision") || "Visi Perusahaan"}</CardTitle>
            <CardDescription>
              {t("admin.pages.companyProfile.vision.description") ||
                "Pernyataan visi yang menggambarkan tujuan jangka panjang perusahaan"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t("admin.pages.companyProfile.vision.placeholder") || "Masukkan visi perusahaan..."}
              value={profile.vision}
              onChange={e => handleInputChange("vision", e.target.value)}
              rows={3}
              className="resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.mission.title") || "Misi Perusahaan"}</CardTitle>
            <CardDescription>
              {t("admin.pages.companyProfile.mission.description") ||
                "Pernyataan misi yang menjelaskan cara perusahaan mencapai visinya"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t("admin.pages.companyProfile.mission.placeholder") || "Masukkan misi perusahaan..."}
              value={profile.mission}
              onChange={e => handleInputChange("mission", e.target.value)}
              rows={3}
              className="resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.coreValues.title") || "Nilai-Nilai Inti"}</CardTitle>
            <CardDescription>
              {t("admin.pages.companyProfile.coreValues.description") ||
                "Nilai-nilai fundamental yang menjadi landasan operasional perusahaan"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t("admin.pages.companyProfile.coreValues.placeholder") || "Masukkan nilai-nilai inti perusahaan..."}
              value={profile.coreValues}
              onChange={e => handleInputChange("coreValues", e.target.value)}
              rows={3}
              className="resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.customerService.title") || "Layanan Pelanggan"}</CardTitle>
            <CardDescription>
              {t("admin.pages.companyProfile.customerService.description") ||
                "Komitmen perusahaan terhadap pelayanan pelanggan"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={
                t("admin.pages.companyProfile.customerService.placeholder") || "Masukkan komitmen layanan pelanggan..."
              }
              value={profile.customerService}
              onChange={e => handleInputChange("customerService", e.target.value)}
              rows={3}
              className="resize-none"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {saving
              ? t("admin.pages.companyProfile.saving") || "Menyimpan..."
              : t("admin.pages.companyProfile.saveButton") || "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
