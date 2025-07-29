"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { companyProfileAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { Save, Building2 } from "lucide-react";

interface CompanyProfile {
  id: string;
  companyOverview_id: string;
  companyOverview_en: string;
  coreValues_id: string;
  coreValues_en: string;
  vision_id: string;
  vision_en: string;
  mission_id: string;
  mission_en: string;
  customerService_id: string;
  customerService_en: string;
}

export default function CompanyProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile>({
    id: "",
    companyOverview_id: "",
    companyOverview_en: "",
    coreValues_id: "",
    coreValues_en: "",
    vision_id: "",
    vision_en: "",
    mission_id: "",
    mission_en: "",
    customerService_id: "",
    customerService_en: ""
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
      // Send as JSON object instead of FormData since no file upload is needed
      const response = await companyProfileAPI.updateProfile({
        id: profile.id,
        companyOverview_id: profile.companyOverview_id,
        companyOverview_en: profile.companyOverview_en,
        coreValues_id: profile.coreValues_id,
        coreValues_en: profile.coreValues_en,
        vision_id: profile.vision_id,
        vision_en: profile.vision_en,
        mission_id: profile.mission_id,
        mission_en: profile.mission_en,
        customerService_id: profile.customerService_id,
        customerService_en: profile.customerService_en
      });

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
        {/* Company Overview - Bilingual */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.form.companyOverview") || "Gambaran Perusahaan"}</CardTitle>
            <CardDescription>Deskripsi singkat tentang perusahaan yang akan ditampilkan di halaman utama</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Gambaran Perusahaan (Bilingual)</h4>
              <div className="space-y-2">
                <Label>Gambaran Perusahaan (Bahasa Indonesia) *</Label>
                <Textarea
                  value={profile.companyOverview_id}
                  onChange={e => setProfile(prev => ({ ...prev, companyOverview_id: e.target.value }))}
                  placeholder="Tulis gambaran umum tentang perusahaan dalam Bahasa Indonesia..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Company Overview (English) *</Label>
                <Textarea
                  value={profile.companyOverview_en}
                  onChange={e => setProfile(prev => ({ ...prev, companyOverview_en: e.target.value }))}
                  placeholder="Write general overview about the company in English..."
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision - Bilingual */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.form.vision") || "Visi Perusahaan"}</CardTitle>
            <CardDescription>
              {t("admin.pages.companyProfile.vision.description") ||
                "Pernyataan visi yang menggambarkan tujuan jangka panjang perusahaan"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Visi / Vision</h4>
              <div className="space-y-2">
                <Label>Visi (Bahasa Indonesia) *</Label>
                <Textarea
                  value={profile.vision_id}
                  onChange={e => setProfile(prev => ({ ...prev, vision_id: e.target.value }))}
                  placeholder="Masukkan visi perusahaan dalam Bahasa Indonesia..."
                  rows={3}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label>Vision (English) *</Label>
                <Textarea
                  value={profile.vision_en}
                  onChange={e => setProfile(prev => ({ ...prev, vision_en: e.target.value }))}
                  placeholder="Enter company vision in English..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission - Bilingual */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.mission.title") || "Misi Perusahaan"}</CardTitle>
            <CardDescription>
              {t("admin.pages.companyProfile.mission.description") ||
                "Pernyataan misi yang menjelaskan cara perusahaan mencapai visinya"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Misi / Mission</h4>
              <div className="space-y-2">
                <Label>Misi (Bahasa Indonesia) *</Label>
                <Textarea
                  value={profile.mission_id}
                  onChange={e => setProfile(prev => ({ ...prev, mission_id: e.target.value }))}
                  placeholder="Masukkan misi perusahaan dalam Bahasa Indonesia..."
                  rows={3}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label>Mission (English) *</Label>
                <Textarea
                  value={profile.mission_en}
                  onChange={e => setProfile(prev => ({ ...prev, mission_en: e.target.value }))}
                  placeholder="Enter company mission in English..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Values - Bilingual */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.coreValues.title") || "Nilai-Nilai Inti"}</CardTitle>
            <CardDescription>
              {t("admin.pages.companyProfile.coreValues.description") ||
                "Nilai-nilai fundamental yang menjadi landasan operasional perusahaan"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Nilai-Nilai Inti / Core Values</h4>
              <div className="space-y-2">
                <Label>Nilai-Nilai Inti (Bahasa Indonesia) *</Label>
                <Textarea
                  value={profile.coreValues_id}
                  onChange={e => setProfile(prev => ({ ...prev, coreValues_id: e.target.value }))}
                  placeholder="Masukkan nilai-nilai inti perusahaan dalam Bahasa Indonesia..."
                  rows={3}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label>Core Values (English) *</Label>
                <Textarea
                  value={profile.coreValues_en}
                  onChange={e => setProfile(prev => ({ ...prev, coreValues_en: e.target.value }))}
                  placeholder="Enter company core values in English..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Service - Bilingual */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.pages.companyProfile.customerService.title") || "Layanan Pelanggan"}</CardTitle>
            <CardDescription>
              {t("admin.pages.companyProfile.customerService.description") ||
                "Komitmen perusahaan terhadap pelayanan pelanggan"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Layanan Pelanggan / Customer Service</h4>
              <div className="space-y-2">
                <Label>Layanan Pelanggan (Bahasa Indonesia) *</Label>
                <Textarea
                  value={profile.customerService_id}
                  onChange={e => setProfile(prev => ({ ...prev, customerService_id: e.target.value }))}
                  placeholder="Masukkan komitmen layanan pelanggan dalam Bahasa Indonesia..."
                  rows={3}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label>Customer Service (English) *</Label>
                <Textarea
                  value={profile.customerService_en}
                  onChange={e => setProfile(prev => ({ ...prev, customerService_en: e.target.value }))}
                  placeholder="Enter customer service commitment in English..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
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
