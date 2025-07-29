'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { testimonialsAPI } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';
import { Plus, Search, Edit, Trash2, Loader2, Image, X } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position_id: string;
  position_en: string;
  testimonial_id: string;
  testimonial_en: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function TestimonialsPage() {
  const { t, locale } = useTranslations();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    position_id: '',
    position_en: '',
    testimonial_id: '',
    testimonial_en: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const filtered = testimonials.filter(testimonial =>
      testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.position_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.position_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.testimonial_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.testimonial_en.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTestimonials(filtered);
  }, [testimonials, searchTerm]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await testimonialsAPI.getAll();
      if (response.status === 'success') {
        setTestimonials(response.data as Testimonial[]);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      company: '',
      position_id: '',
      position_en: '',
      testimonial_id: '',
      testimonial_en: '',
    });
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      const formDataObj = new FormData();
      formDataObj.append('clientName', formData.clientName);
      formDataObj.append('company', formData.company);
      formDataObj.append('position_id', formData.position_id);
      formDataObj.append('position_en', formData.position_en);
      formDataObj.append('testimonial_id', formData.testimonial_id);
      formDataObj.append('testimonial_en', formData.testimonial_en);
      
      if (selectedFile) {
        formDataObj.append('image', selectedFile);
      }

      const response = await testimonialsAPI.create(formDataObj);
      if (response.status === 'success') {
        await fetchTestimonials();
        setIsCreateOpen(false);
        resetForm();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t("admin.pages.testimonials.errors.genericError") || 'Terjadi kesalahan';
      alert(t("admin.pages.testimonials.errors.createFailed").replace('{error}', errorMessage) || 'Gagal membuat testimonial: ' + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      company: testimonial.company,
      position_id: testimonial.position_id,
      position_en: testimonial.position_en,
      testimonial_id: testimonial.testimonial_id,
      testimonial_en: testimonial.testimonial_en,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTestimonial) return;

    try {
      setSaving(true);
      const formDataObj = new FormData();
      formDataObj.append('clientName', formData.clientName);
      formDataObj.append('company', formData.company);
      formDataObj.append('position_id', formData.position_id);
      formDataObj.append('position_en', formData.position_en);
      formDataObj.append('testimonial_id', formData.testimonial_id);
      formDataObj.append('testimonial_en', formData.testimonial_en);
      
      if (selectedFile) {
        formDataObj.append('image', selectedFile);
      }

      const response = await testimonialsAPI.update(selectedTestimonial.id, formDataObj);
      if (response.status === 'success') {
        await fetchTestimonials();
        setIsEditOpen(false);
        resetForm();
        setSelectedTestimonial(null);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t("admin.pages.testimonials.errors.genericError") || 'Terjadi kesalahan';
      alert(t("admin.pages.testimonials.errors.updateFailed").replace('{error}', errorMessage) || 'Gagal mengupdate testimonial: ' + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (window.confirm(t("admin.pages.testimonials.deleteConfirm").replace('{clientName}', clientName) || `Apakah Anda yakin ingin menghapus testimonial dari "${clientName}"?`)) {
      try {
        const response = await testimonialsAPI.delete(id);
        if (response.status === 'success') {
          await fetchTestimonials();
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : t("admin.pages.testimonials.errors.genericError") || 'Terjadi kesalahan';
        alert(t("admin.pages.testimonials.errors.deleteFailed").replace('{error}', errorMessage) || 'Gagal menghapus testimonial: ' + errorMessage);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("admin.pages.testimonials.title") || "Manajemen Testimoni"}</h1>
          <p className="text-gray-600">{t("admin.pages.testimonials.subtitle") || "Kelola testimoni dari klien"}</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              {t("admin.pages.testimonials.addTestimonial") || "Tambah Testimoni"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("admin.pages.testimonials.addTestimonial") || "Tambah Testimoni Baru"}</DialogTitle>
              <DialogDescription>{t("admin.pages.testimonials.addDescription") || "Tambahkan testimoni dari klien"}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("admin.pages.testimonials.form.clientName") || "Nama Klien"} *</Label>
                  <Input
                    value={formData.clientName}
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("admin.pages.testimonials.form.company") || "Perusahaan"} *</Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              {/* Position Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Posisi / Position</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Posisi (ID) *</Label>
                    <Input
                      value={formData.position_id}
                      onChange={(e) => setFormData({...formData, position_id: e.target.value})}
                      placeholder="CEO, Direktur Utama"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position (EN) *</Label>
                    <Input
                      value={formData.position_en}
                      onChange={(e) => setFormData({...formData, position_en: e.target.value})}
                      placeholder="CEO, Chief Executive Officer"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Testimonial Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Testimoni / Testimonial</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Testimoni (ID) *</Label>
                    <Textarea
                      value={formData.testimonial_id}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, testimonial_id: e.target.value})}
                      rows={3}
                      placeholder="Tulis testimoni dari klien dalam Bahasa Indonesia..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Testimonial (EN) *</Label>
                    <Textarea
                      value={formData.testimonial_en}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, testimonial_en: e.target.value})}
                      rows={3}
                      placeholder="Write client testimonial in English..."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Foto Klien (Opsional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {previewUrl ? (
                    <div className="relative">
                      <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Klik untuk upload foto</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  {t("admin.common.cancel") || "Batal"}
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  {t("admin.common.save") || "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Testimoni</CardTitle>
              <CardDescription>
                Total {testimonials.length} testimoni dari klien
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={t("admin.pages.testimonials.list.search") || "Cari testimoni..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.pages.testimonials.list.photo") || "Foto"}</TableHead>
                  <TableHead>{t("admin.pages.testimonials.list.client") || "Klien"}</TableHead>
                  <TableHead>{t("admin.pages.testimonials.list.company") || "Perusahaan"}</TableHead>
                  <TableHead>{t("admin.pages.testimonials.list.position") || "Posisi"}</TableHead>
                  <TableHead>{t("admin.pages.testimonials.list.testimonial") || "Testimoni"}</TableHead>
                  <TableHead>{t("admin.pages.testimonials.list.date") || "Tanggal"}</TableHead>
                  <TableHead className="text-right">{t("admin.pages.testimonials.list.actions") || "Aksi"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      {testimonial.imageUrl ? (
                        <img 
                          src={getImageUrl(testimonial.imageUrl)} 
                          alt={testimonial.clientName}
                          className="w-12 h-12 object-cover rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.png";
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm text-gray-500">
                            {testimonial.clientName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{testimonial.clientName}</TableCell>
                    <TableCell>{testimonial.company}</TableCell>
                    <TableCell>{locale === 'en' ? testimonial.position_en : testimonial.position_id}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          "{locale === 'en' ? testimonial.testimonial_en : testimonial.testimonial_id}"
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(testimonial.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(testimonial.id, testimonial.clientName)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Testimoni</DialogTitle>
            <DialogDescription>Ubah informasi testimoni</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Klien *</Label>
                <Input
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Perusahaan *</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required
                />
              </div>
            </div>
            
            {/* Position Fields - Bilingual */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Posisi / Position</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Posisi (ID) *</Label>
                  <Input
                    value={formData.position_id}
                    onChange={(e) => setFormData({...formData, position_id: e.target.value})}
                    placeholder="CEO, Direktur Utama"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position (EN) *</Label>
                  <Input
                    value={formData.position_en}
                    onChange={(e) => setFormData({...formData, position_en: e.target.value})}
                    placeholder="CEO, Chief Executive Officer"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Testimonial Fields - Bilingual */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Testimoni / Testimonial</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Testimoni (ID) *</Label>
                  <Textarea
                    value={formData.testimonial_id}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, testimonial_id: e.target.value})}
                    rows={3}
                    placeholder="Tulis testimoni dari klien dalam Bahasa Indonesia..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Testimonial (EN) *</Label>
                  <Textarea
                    value={formData.testimonial_en}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, testimonial_en: e.target.value})}
                    rows={3}
                    placeholder="Write client testimonial in English..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Foto Klien (Opsional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {previewUrl ? (
                  <div className="relative">
                    <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : selectedTestimonial?.imageUrl ? (
                  <div className="relative">
                    <img 
                      src={getImageUrl(selectedTestimonial.imageUrl)} 
                      alt="Current" 
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <p className="text-white text-sm">Klik untuk ganti foto</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Klik untuk upload foto</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
