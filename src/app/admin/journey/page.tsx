"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { journeyAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { Plus, Edit, Trash2, MapPin, Calendar } from "lucide-react";

interface Journey {
  id: string;
  year: number;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  createdAt: string;
  updatedAt: string;
}

interface JourneyForm {
  year: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
}

export default function JourneyPage() {
  const { t, locale } = useTranslations();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJourney, setEditingJourney] = useState<Journey | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<JourneyForm>({
    year: "",
    title_id: "",
    title_en: "",
    description_id: "",
    description_en: ""
  });
  const { toast } = useToast();

  const fetchJourneys = useCallback(
    async () => {
      try {
        setLoading(true);
        const response = await journeyAPI.getAll();
        if (response.status === "success") {
          setJourneys(response.data as Journey[]);
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
    },
    [toast]
  );

  useEffect(
    () => {
      fetchJourneys();
    },
    [fetchJourneys]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate year is a valid number
      const yearNum = parseInt(form.year);
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
        toast({
          title: "Error",
          description: "Tahun harus berupa angka antara 1900-2100",
          variant: "destructive"
        });
        setSubmitting(false);
        return;
      }

      const data = {
        year: yearNum, // Convert to integer
        title_id: form.title_id,
        title_en: form.title_en,
        description_id: form.description_id,
        description_en: form.description_en
      };

      let response;
      if (editingJourney) {
        response = await journeyAPI.update(editingJourney.id, data);
      } else {
        response = await journeyAPI.create(data);
      }

      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: editingJourney
            ? t("admin.pages.journey.updateSuccess") || "Perjalanan berhasil diperbarui"
            : t("admin.pages.journey.addSuccess") || "Perjalanan berhasil ditambahkan",
          variant: "success"
        });
        fetchJourneys();
        resetForm();
        setDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(error),
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus milestone ini?")) return;

    try {
      const response = await journeyAPI.delete(id);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: "Milestone berhasil dihapus",
          variant: "success"
        });
        fetchJourneys();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(error),
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setForm({
      year: "",
      title_id: "",
      title_en: "",
      description_id: "",
      description_en: ""
    });
    setEditingJourney(null);
  };

  const openEditDialog = (journey: Journey) => {
    setEditingJourney(journey);
    setForm({
      year: journey.year.toString(),
      title_id: journey.title_id,
      title_en: journey.title_en,
      description_id: journey.description_id,
      description_en: journey.description_en
    });
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
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
          <MapPin className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("admin.pages.journey.title") || "Perjalanan Perusahaan"}</h1>
            <p className="text-gray-600">{t("admin.pages.journey.subtitle") || "Kelola milestone dan pencapaian perusahaan"}</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t("admin.pages.journey.addButton") || "Tambah Milestone"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingJourney
                  ? t("admin.pages.journey.addDialog.editTitle") || "Edit Milestone"
                  : t("admin.pages.journey.addDialog.title") || "Tambah Milestone"}
              </DialogTitle>
              <DialogDescription>
                {editingJourney
                  ? t("admin.pages.journey.addDialog.editDescription") || "Perbarui milestone perusahaan"
                  : t("admin.pages.journey.addDialog.description") || "Tambahkan milestone baru dalam perjalanan perusahaan"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="year">{t("admin.pages.journey.form.year") || "Tahun"}</Label>
                <Input
                  id="year"
                  type="number"
                  value={form.year}
                  onChange={e => setForm(prev => ({ ...prev, year: e.target.value }))}
                  placeholder={t("admin.pages.journey.form.yearPlaceholder") || "2024"}
                  min="1900"
                  max="2100"
                  required
                />
              </div>

              {/* Title Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Judul Milestone / Milestone Title</h4>
                <div className="space-y-2">
                  <Label>Judul Milestone (Bahasa Indonesia) *</Label>
                  <Input
                    value={form.title_id}
                    onChange={e => setForm(prev => ({ ...prev, title_id: e.target.value }))}
                    placeholder="Pendirian Perusahaan, Ekspansi Internasional, dll."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Milestone Title (English) *</Label>
                  <Input
                    value={form.title_en}
                    onChange={e => setForm(prev => ({ ...prev, title_en: e.target.value }))}
                    placeholder="Company Establishment, International Expansion, etc."
                    required
                  />
                </div>
              </div>

              {/* Description Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Deskripsi / Description</h4>
                <div className="space-y-2">
                  <Label>Deskripsi (Bahasa Indonesia) *</Label>
                  <Textarea
                    value={form.description_id}
                    onChange={e => setForm(prev => ({ ...prev, description_id: e.target.value }))}
                    placeholder="Deskripsi lengkap tentang pencapaian ini dalam Bahasa Indonesia..."
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description (English) *</Label>
                  <Textarea
                    value={form.description_en}
                    onChange={e => setForm(prev => ({ ...prev, description_en: e.target.value }))}
                    placeholder="Complete description about this achievement in English..."
                    rows={4}
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t("admin.pages.journey.form.cancel") || "Batal"}
                </Button>
                <Button
                  type="submit"
                  disabled={
                    submitting ||
                    !form.year.trim() ||
                    !form.title_id.trim() ||
                    !form.title_en.trim() ||
                    !form.description_id.trim() ||
                    !form.description_en.trim()
                  }
                >
                  {submitting
                    ? t("admin.pages.journey.form.saving") || "Menyimpan..."
                    : editingJourney
                    ? t("admin.pages.journey.form.update") || "Perbarui"
                    : t("admin.pages.journey.form.save") || "Tambah"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Timeline View */}
      <div className="relative">
        {journeys.length > 0 && <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200" />}

        <div className="space-y-8">
          {journeys.map(journey => (
            <div key={journey.id} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="flex-shrink-0 w-16 flex justify-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md" />
              </div>

              {/* Content */}
              <Card className="flex-1 ml-4">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">{journey.year}</span>
                      </div>
                      <CardTitle className="text-xl">{locale === "id" ? journey.title_id : journey.title_en}</CardTitle>
                      <CardDescription>{locale === "id" ? journey.description_id : journey.description_en}</CardDescription>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(journey)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(journey.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {journeys.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada milestone</h3>
            <p className="text-gray-500 text-center mb-4">Mulai dokumentasikan perjalanan dan pencapaian perusahaan</p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Milestone Pertama
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
