"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { servicesAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { Plus, Edit, Trash2, Briefcase, Code } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

interface ServiceForm {
  name: string;
  description: string;
  technologies: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<ServiceForm>({
    name: "",
    description: "",
    technologies: ""
  });
  const { toast } = useToast();
  const { t } = useTranslations();

  const fetchServices = useCallback(
    async () => {
      try {
        setLoading(true);
        const response = await servicesAPI.getAll();
        if (response.status === "success") {
          setServices(response.data as Service[]);
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
      fetchServices();
    },
    [fetchServices]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const serviceData = {
        name: form.name,
        description: form.description,
        technologies: form.technologies
          .split(",")
          .map(tech => tech.trim())
          .filter(tech => tech !== "")
      };

      let response;
      if (editingService) {
        response = await servicesAPI.update(editingService.id, serviceData);
      } else {
        response = await servicesAPI.create(serviceData);
      }

      if (response.status === "success") {
        toast({
          title: t("admin.common.success") || "Berhasil",
          description: editingService
            ? t("admin.pages.services.updateSuccess") || "Layanan berhasil diperbarui"
            : t("admin.pages.services.addSuccess") || "Layanan berhasil ditambahkan",
          variant: "success"
        });
        fetchServices();
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
    if (!confirm(t("admin.pages.services.deleteConfirm") || "Apakah Anda yakin ingin menghapus layanan ini?")) return;

    try {
      const response = await servicesAPI.delete(id);
      if (response.status === "success") {
        toast({
          title: t("admin.common.success") || "Berhasil",
          description: t("admin.pages.services.deleteSuccess") || "Layanan berhasil dihapus",
          variant: "success"
        });
        fetchServices();
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
      name: "",
      description: "",
      technologies: ""
    });
    setEditingService(null);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setForm({
      name: service.name,
      description: service.description,
      technologies: service.technologies.join(", ")
    });
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg" />
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
          <Briefcase className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("admin.pages.services.title") || "Layanan"}</h1>
            <p className="text-gray-600">{t("admin.pages.services.subtitle") || "Kelola layanan yang ditawarkan perusahaan"}</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t("admin.pages.services.addService") || "Tambah Layanan"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingService
                  ? t("admin.pages.services.editService") || "Edit Layanan"
                  : t("admin.pages.services.addService") || "Tambah Layanan"}
              </DialogTitle>
              <DialogDescription>
                {editingService
                  ? t("admin.pages.services.editDescription") || "Perbarui informasi layanan"
                  : t("admin.pages.services.addDescription") || "Tambahkan layanan baru yang ditawarkan"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("admin.pages.services.form.name") || "Nama Layanan"}</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Full-Stack Development"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("admin.pages.services.form.description") || "Deskripsi"}</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={
                    t("admin.pages.services.form.descriptionPlaceholder") || "Deskripsi lengkap tentang layanan ini..."
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">{t("admin.pages.services.form.technologies") || "Teknologi"}</Label>
                <Input
                  id="technologies"
                  value={form.technologies}
                  onChange={e => setForm(prev => ({ ...prev, technologies: e.target.value }))}
                  placeholder="React, Node.js, PostgreSQL (pisahkan dengan koma)"
                />
                <p className="text-xs text-gray-500">
                  {t("admin.pages.services.form.technologiesHint") || "Pisahkan setiap teknologi dengan koma"}
                </p>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t("admin.common.cancel") || "Batal"}
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting
                    ? t("admin.common.saving") || "Menyimpan..."
                    : editingService
                    ? t("admin.common.update") || "Perbarui"
                    : t("admin.common.add") || "Tambah"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(service => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                {service.name}
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {service.technologies && service.technologies.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Code className="h-4 w-4" />
                      {t("admin.pages.services.technologies") || "Teknologi"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(service)} className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    {t("admin.common.edit") || "Edit"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
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

      {services.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("admin.pages.services.empty.title") || "Belum ada layanan"}
            </h3>
            <p className="text-gray-500 text-center mb-4">
              {t("admin.pages.services.empty.subtitle") || "Mulai tambahkan layanan yang ditawarkan perusahaan"}
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("admin.pages.services.empty.addFirst") || "Tambah Layanan Pertama"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
