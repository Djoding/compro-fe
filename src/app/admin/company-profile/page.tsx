"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { companyProfileAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await companyProfileAPI.getProfile();
      if (response.status === "success") {
        setProfile(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(error),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await companyProfileAPI.updateProfile(profile);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: "Profil perusahaan berhasil diperbarui",
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

  const handleInputChange = (field: keyof CompanyProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Profil Perusahaan</h1>
          <p className="text-gray-600">Kelola informasi dasar tentang perusahaan</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gambaran Umum Perusahaan</CardTitle>
            <CardDescription>Deskripsi singkat tentang perusahaan yang akan ditampilkan di halaman utama</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Masukkan gambaran umum perusahaan..."
              value={profile.companyOverview}
              onChange={e => handleInputChange("companyOverview", e.target.value)}
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visi Perusahaan</CardTitle>
            <CardDescription>Pernyataan visi yang menggambarkan tujuan jangka panjang perusahaan</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Masukkan visi perusahaan..."
              value={profile.vision}
              onChange={e => handleInputChange("vision", e.target.value)}
              rows={3}
              className="resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Misi Perusahaan</CardTitle>
            <CardDescription>Pernyataan misi yang menjelaskan cara perusahaan mencapai visinya</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Masukkan misi perusahaan..."
              value={profile.mission}
              onChange={e => handleInputChange("mission", e.target.value)}
              rows={3}
              className="resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nilai-Nilai Inti</CardTitle>
            <CardDescription>Nilai-nilai fundamental yang menjadi landasan operasional perusahaan</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Masukkan nilai-nilai inti perusahaan..."
              value={profile.coreValues}
              onChange={e => handleInputChange("coreValues", e.target.value)}
              rows={3}
              className="resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Layanan Pelanggan</CardTitle>
            <CardDescription>Komitmen perusahaan terhadap pelayanan pelanggan</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Masukkan komitmen layanan pelanggan..."
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
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
