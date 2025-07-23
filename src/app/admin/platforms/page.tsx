"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { platformsAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { Plus, Edit, Trash2, Code } from "lucide-react";

interface Platform {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface PlatformForm {
  name: string;
  description: string;
}

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<PlatformForm>({
    name: "",
    description: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      setLoading(true);
      const response = await platformsAPI.getAll();
      if (response.status === "success") {
        setPlatforms(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      
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
          description: editingPlatform ? "Platform berhasil diperbarui" : "Platform berhasil ditambahkan",
          variant: "success",
        });
        fetchPlatforms();
        resetForm();
        setDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus platform ini?")) return;

    try {
      const response = await platformsAPI.delete(id);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: "Platform berhasil dihapus",
          variant: "success",
        });
        fetchPlatforms();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
    });
    setEditingPlatform(null);
    setImageFile(null);
  };

  const openEditDialog = (platform: Platform) => {
    setEditingPlatform(platform);
    setForm({
      name: platform.name,
      description: platform.description,
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
            <h1 className="text-3xl font-bold text-gray-900">Platform</h1>
            <p className="text-gray-600">Kelola platform dan teknologi yang digunakan</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Platform
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPlatform ? "Edit Platform" : "Tambah Platform"}
              </DialogTitle>
              <DialogDescription>
                {editingPlatform ? "Perbarui informasi platform" : "Tambahkan platform atau teknologi baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Platform</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. React, Node.js, AWS"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Deskripsi penggunaan platform ini..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Logo Platform</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  required={!editingPlatform}
                />
                <p className="text-xs text-gray-500">
                  Upload logo atau ikon platform (format: JPG, PNG)
                </p>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Menyimpan..." : editingPlatform ? "Perbarui" : "Tambah"}
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
                src={platform.imageUrl || "/placeholder.png"}
                alt={platform.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{platform.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{platform.description}</p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(platform)}
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada platform</h3>
            <p className="text-gray-500 text-center mb-4">
              Mulai tambahkan platform dan teknologi yang digunakan perusahaan
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Platform Pertama
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
