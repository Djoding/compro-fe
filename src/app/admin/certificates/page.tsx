"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { certificatesAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { getImageUrl } from "@/lib/utils";
import { Plus, Trash2, Award, Upload } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface Certificate {
  id: string;
  title_id: string;
  title_en: string;
  imageUrl: string;
  issuedDate: string; // Keep consistent with backend
  createdAt: string;
  updatedAt: string;
}

interface CertificateForm {
  title_id: string;
  title_en: string;
  issueDate: string;
}

export default function CertificatesPage() {
  const { t } = useTranslations();
  const { locale } = useLanguage();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [form, setForm] = useState<CertificateForm>({
    title_id: "",
    title_en: "",
    issueDate: ""
  });
  const { toast } = useToast();

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await certificatesAPI.getAll();
      if (response.status === "success") {
        setCertificates(response.data as Certificate[]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("admin.pages.certificates.fetchError").replace("{error}", getFriendlyErrorMessage(error)),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Error",
        description: t("admin.pages.certificates.form.noFileSelected") || "Pilih file sertifikat terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

        if (!form.title_id.trim() || !form.title_en.trim() || !form.issueDate.trim()) {
      alert("Mohon isi semua field yang wajib");
      return;
    }

    // Validate date format
    const dateTest = new Date(form.issueDate);
    if (isNaN(dateTest.getTime())) {
      alert("Format tanggal tidak valid. Gunakan format YYYY-MM-DD");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title_id", form.title_id);
      formData.append("title_en", form.title_en);
      formData.append("issuedDate", form.issueDate); // Backend expects issuedDate, not issueDate

      const response = await certificatesAPI.create(formData);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: t("admin.pages.certificates.addSuccess") || "Sertifikat berhasil ditambahkan",
          variant: "success",
        });
        fetchCertificates();
        setSelectedFile(null);
        setForm({ title_id: "", title_en: "", issueDate: "" });
        setDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("admin.pages.certificates.error").replace("{error}", getFriendlyErrorMessage(error)),
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("admin.pages.certificates.deleteConfirm") || "Apakah Anda yakin ingin menghapus sertifikat ini?")) return;

    try {
      const response = await certificatesAPI.delete(id);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: t("admin.pages.certificates.deleteSuccess") || "Sertifikat berhasil dihapus",
          variant: "success",
        });
        fetchCertificates();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("admin.pages.certificates.error").replace("{error}", getFriendlyErrorMessage(error)),
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("admin.pages.certificates.title") || "Sertifikat"}</h1>
            <p className="text-gray-600">{t("admin.pages.certificates.subtitle") || "Kelola sertifikat dan penghargaan perusahaan"}</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t("admin.pages.certificates.addButton") || "Tambah Sertifikat"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("admin.pages.certificates.addDialog.title") || "Tambah Sertifikat"}</DialogTitle>
              <DialogDescription>
                {t("admin.pages.certificates.addDialog.description") || "Upload gambar sertifikat atau penghargaan perusahaan"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Judul Sertifikat / Certificate Title</h4>
                <div className="space-y-2">
                  <Label>Judul Sertifikat (Bahasa Indonesia) *</Label>
                  <Input
                    value={form.title_id}
                    onChange={e => setForm(prev => ({ ...prev, title_id: e.target.value }))}
                    placeholder="Contoh: Sertifikat ISO 9001, Penghargaan Teknologi Terbaik, dll."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Certificate Title (English) *</Label>
                  <Input
                    value={form.title_en}
                    onChange={e => setForm(prev => ({ ...prev, title_en: e.target.value }))}
                    placeholder="Example: ISO 9001 Certificate, Best Technology Award, etc."
                    required
                  />
                </div>
              </div>

              {/* Issue Date Field */}
              <div className="space-y-2">
                <Label htmlFor="issueDate">Tanggal Terbit / Issue Date *</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={form.issueDate}
                  onChange={e => setForm(prev => ({ ...prev, issueDate: e.target.value }))}
                  required
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label htmlFor="certificate" className="text-sm font-medium">
                  {t("admin.pages.certificates.form.fileLabel") || "File Sertifikat"} *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      {t("admin.pages.certificates.form.clickToSelect") || "Klik untuk memilih file atau drag & drop"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("admin.pages.certificates.form.supportedFormats") || "Format yang didukung: JPG, PNG, PDF (Max 5MB)"}
                    </p>
                    <input
                      id="certificate"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('certificate')?.click()}
                    >
                      {t("admin.pages.certificates.form.selectFile") || "Pilih File"}
                    </Button>
                  </div>
                </div>
                {selectedFile && (
                  <p className="text-sm text-green-600">
                    {t("admin.pages.certificates.form.selectedFile").replace("{filename}", selectedFile.name) || `File terpilih: ${selectedFile.name}`}
                  </p>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t("admin.pages.certificates.form.cancel") || "Batal"}
                </Button>
                <Button type="submit" disabled={uploading || !selectedFile || !form.title_id.trim() || !form.title_en.trim() || !form.issueDate.trim()}>
                  {uploading ? (t("admin.pages.certificates.form.uploading") || "Mengupload...") : (t("admin.pages.certificates.form.upload") || "Upload")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <Card key={certificate.id} className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img
                src={getImageUrl(certificate.imageUrl)}
                alt={locale === 'id' ? certificate.title_id : certificate.title_en}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 line-clamp-2">
                  {locale === 'id' ? certificate.title_id : certificate.title_en}
                </h3>
                <p className="text-sm text-gray-600">
                  Terbit: {new Date(certificate.issuedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {t("admin.pages.certificates.addedDate").replace("{date}", formatDate(certificate.createdAt)) || `Ditambahkan: ${formatDate(certificate.createdAt)}`}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(certificate.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t("admin.pages.certificates.empty.title") || "Belum ada sertifikat"}</h3>
            <p className="text-gray-500 text-center mb-4">
              {t("admin.pages.certificates.empty.subtitle") || "Mulai upload sertifikat dan penghargaan perusahaan"}
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("admin.pages.certificates.empty.addFirst") || "Upload Sertifikat Pertama"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
