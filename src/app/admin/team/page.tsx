"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { teamAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { Plus, Edit, Trash2, Users, Linkedin, Github, Twitter, Globe } from "lucide-react";

interface SocialMedia {
  id: string;
  platform: string;
  url: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  roleCategory: string;
  specialization: string;
  imageUrl: string;
  socialMedia: SocialMedia[];
  createdAt: string;
  updatedAt: string;
}

interface TeamMemberForm {
  name: string;
  position: string;
  roleCategory: string;
  specialization: string;
  socialMedia: { platform: string; url: string }[];
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<TeamMemberForm>({
    name: "",
    position: "",
    roleCategory: "",
    specialization: "",
    socialMedia: [{ platform: "", url: "" }],
  });
  const { toast } = useToast();

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await teamAPI.getAll();
      if (response.status === "success") {
        setMembers(response.data as TeamMember[]);
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
  }, [toast]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("position", form.position);
      formData.append("roleCategory", form.roleCategory);
      formData.append("specialization", form.specialization);
      formData.append("socialMedia", JSON.stringify(form.socialMedia.filter(sm => sm.platform && sm.url)));
      
      if (imageFile) {
        formData.append("image", imageFile);
      }

      let response;
      if (editingMember) {
        response = await teamAPI.update(editingMember.id, formData);
      } else {
        response = await teamAPI.create(formData);
      }

      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: editingMember ? "Anggota tim berhasil diperbarui" : "Anggota tim berhasil ditambahkan",
          variant: "success",
        });
        fetchTeamMembers();
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
    if (!confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) return;

    try {
      const response = await teamAPI.delete(id);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: "Anggota tim berhasil dihapus",
          variant: "success",
        });
        fetchTeamMembers();
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
      position: "",
      roleCategory: "",
      specialization: "",
      socialMedia: [{ platform: "", url: "" }],
    });
    setEditingMember(null);
    setImageFile(null);
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      position: member.position,
      roleCategory: member.roleCategory,
      specialization: member.specialization,
      socialMedia: member.socialMedia.length > 0 
        ? member.socialMedia.map(sm => ({ platform: sm.platform, url: sm.url }))
        : [{ platform: "", url: "" }],
    });
    setDialogOpen(true);
  };

  const addSocialMediaField = () => {
    setForm(prev => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { platform: "", url: "" }]
    }));
  };

  const removeSocialMediaField = (index: number) => {
    setForm(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index)
    }));
  };

  const updateSocialMediaField = (index: number, field: "platform" | "url", value: string) => {
    setForm(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.map((sm, i) => 
        i === index ? { ...sm, [field]: value } : sm
      )
    }));
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin": return <Linkedin className="h-4 w-4" />;
      case "github": return <Github className="h-4 w-4" />;
      case "twitter": return <Twitter className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
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
          <Users className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tim</h1>
            <p className="text-gray-600">Kelola anggota tim perusahaan</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Anggota Tim
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? "Edit Anggota Tim" : "Tambah Anggota Tim"}
              </DialogTitle>
              <DialogDescription>
                {editingMember ? "Perbarui informasi anggota tim" : "Tambahkan anggota tim baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Posisi</Label>
                  <Input
                    id="position"
                    value={form.position}
                    onChange={(e) => setForm(prev => ({ ...prev, position: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roleCategory">Kategori Role</Label>
                  <Input
                    id="roleCategory"
                    value={form.roleCategory}
                    onChange={(e) => setForm(prev => ({ ...prev, roleCategory: e.target.value }))}
                    placeholder="e.g. Developer, Designer, Management"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Foto Profil</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    required={!editingMember}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Spesialisasi</Label>
                <Textarea
                  id="specialization"
                  value={form.specialization}
                  onChange={(e) => setForm(prev => ({ ...prev, specialization: e.target.value }))}
                  placeholder="e.g. React, Node.js, UI/UX Design"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Media Sosial</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSocialMediaField}>
                    <Plus className="h-3 w-3 mr-1" />
                    Tambah
                  </Button>
                </div>
                {form.socialMedia.map((sm, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Platform (LinkedIn, GitHub, etc.)"
                      value={sm.platform}
                      onChange={(e) => updateSocialMediaField(index, "platform", e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={sm.url}
                      onChange={(e) => updateSocialMediaField(index, "url", e.target.value)}
                    />
                    {form.socialMedia.length > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeSocialMediaField(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Menyimpan..." : editingMember ? "Perbarui" : "Tambah"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={member.imageUrl || "/placeholder.png"}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
                <Badge variant="outline">{member.roleCategory}</Badge>
                <p className="text-xs text-gray-500">{member.specialization}</p>
                
                {member.socialMedia.length > 0 && (
                  <div className="flex gap-2 pt-2">
                    {member.socialMedia.map((sm) => (
                      <a
                        key={sm.id}
                        href={sm.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        {getSocialIcon(sm.platform)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(member)}
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {members.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada anggota tim</h3>
            <p className="text-gray-500 text-center mb-4">
              Mulai tambahkan anggota tim untuk menampilkan profil mereka di website
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Anggota Tim Pertama
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
