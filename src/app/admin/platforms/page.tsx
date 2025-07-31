"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { platformsAPI } from "@/lib/api";
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { getImageUrl } from "@/lib/utils";
import { Code, Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Platform {
  id: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface PlatformForm {
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
}

export default function PlatformsPage() {
  const { t, locale } = useTranslations();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<PlatformForm>({
    name_id: "",
    name_en: "",
    description_id: "",
    description_en: "",
  });
  const { toast } = useToast();

  const fetchPlatforms = async () => {
    try {
      setLoading(true);
      const response = await platformsAPI.getAll();
      if (response.status === "success") {
        setPlatforms(response.data as Platform[]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("admin.pages.platforms.fetchError").replace(
          "{error}",
          getFriendlyErrorMessage(error)
        ),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name_id", form.name_id);
      formData.append("name_en", form.name_en);
      formData.append("description_id", form.description_id);
      formData.append("description_en", form.description_en);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      let response;
      if (editingPlatform) {
        response = await platformsAPI.update(editingPlatform.id, formData);
      } else {
        response = await platformsAPI.create(formData);
      }

      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: editingPlatform
            ? t("admin.pages.platforms.updateSuccess") ||
              "Platform berhasil diperbarui"
            : t("admin.pages.platforms.addSuccess") ||
              "Platform berhasil ditambahkan",
          variant: "success",
        });
        fetchPlatforms();
        resetForm();
        setDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("admin.pages.platforms.error").replace(
          "{error}",
          getFriendlyErrorMessage(error)
        ),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        t("admin.pages.platforms.deleteConfirm") ||
          "Apakah Anda yakin ingin menghapus platform ini?"
      )
    )
      return;

    try {
      const response = await platformsAPI.delete(id);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description:
            t("admin.pages.platforms.deleteSuccess") ||
            "Platform berhasil dihapus",
          variant: "success",
        });
        fetchPlatforms();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("admin.pages.platforms.error").replace(
          "{error}",
          getFriendlyErrorMessage(error)
        ),
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setForm({
      name_id: "",
      name_en: "",
      description_id: "",
      description_en: "",
    });
    setEditingPlatform(null);
    setImageFile(null);
  };

  const openEditDialog = (platform: Platform) => {
    setEditingPlatform(platform);
    setForm({
      name_id: platform.name_id,
      name_en: platform.name_en,
      description_id: platform.description_id,
      description_en: platform.description_en,
    });
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
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
          <Code className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("admin.pages.platforms.title") || "Platform"}
            </h1>
            <p className="text-gray-600">
              {t("admin.pages.platforms.subtitle") ||
                "Kelola platform dan teknologi yang digunakan"}
            </p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t("admin.pages.platforms.addButton") || "Tambah Platform"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPlatform
                  ? t("admin.pages.platforms.addDialog.editTitle") ||
                    "Edit Platform"
                  : t("admin.pages.platforms.addDialog.title") ||
                    "Tambah Platform"}
              </DialogTitle>
              <DialogDescription>
                {editingPlatform
                  ? t("admin.pages.platforms.addDialog.editDescription") ||
                    "Perbarui informasi platform"
                  : t("admin.pages.platforms.addDialog.description") ||
                    "Tambahkan platform atau teknologi baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">
                  Nama Platform / Platform Name
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name_id">Nama Platform (ID)</Label>
                    <Input
                      id="name_id"
                      value={form.name_id}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          name_id: e.target.value,
                        }))
                      }
                      placeholder="React, Node.js, AWS"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name_en">Platform Name (EN)</Label>
                    <Input
                      id="name_en"
                      value={form.name_en}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          name_en: e.target.value,
                        }))
                      }
                      placeholder="React, Node.js, AWS"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">
                  Deskripsi / Description
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description_id">Deskripsi (ID)</Label>
                    <Textarea
                      id="description_id"
                      value={form.description_id}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          description_id: e.target.value,
                        }))
                      }
                      placeholder="Deskripsi penggunaan platform ini..."
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_en">Description (EN)</Label>
                    <Textarea
                      id="description_en"
                      value={form.description_en}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          description_en: e.target.value,
                        }))
                      }
                      placeholder="Description of this platform usage..."
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">
                  {t("admin.pages.platforms.form.image") || "Logo Platform"}
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  required={!editingPlatform}
                />
                <p className="text-xs text-gray-500">
                  {t("admin.pages.platforms.form.imageHelp") ||
                    "Upload logo atau ikon platform (format: JPG, PNG)"}
                </p>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  {t("admin.pages.platforms.form.cancel") || "Batal"}
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting
                    ? t("admin.pages.platforms.form.saving") || "Menyimpan..."
                    : editingPlatform
                    ? t("admin.pages.platforms.form.update") || "Perbarui"
                    : t("admin.pages.platforms.form.save") || "Tambah"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.id} className="overflow-hidden">
            <div className="aspect-square relative bg-gray-50 flex items-center justify-center">
              <img
                src={getImageUrl(platform.imageUrl)}
                alt={locale === "en" ? platform.name_en : platform.name_id}
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  {locale === "en" ? platform.name_en : platform.name_id}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {locale === "en"
                    ? platform.description_en
                    : platform.description_id}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(platform)}
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  {t("admin.pages.platforms.edit") || "Edit"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(platform.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {platforms.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Code className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("admin.pages.platforms.empty.title") || "Belum ada platform"}
            </h3>
            <p className="text-gray-500 text-center mb-4">
              {t("admin.pages.platforms.empty.subtitle") ||
                "Mulai tambahkan platform dan teknologi yang digunakan perusahaan"}
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("admin.pages.platforms.empty.addFirst") ||
                "Tambah Platform Pertama"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
