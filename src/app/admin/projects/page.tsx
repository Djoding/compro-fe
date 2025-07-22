'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { projectsAPI } from '@/lib/api';
import { Plus, Search, Edit, Trash2, Eye, Loader2, Image, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  serviceCategory: string;
  imageUrl: string;
  shortDescription: string;
  elaboration: string;
  languages: string[];
  features: string[];
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    serviceCategory: '',
    shortDescription: '',
    elaboration: '',
    languages: '',
    features: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [projects, searchTerm]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll();
      if (response.status === 'success') {
        setProjects(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
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
      title: '',
      serviceCategory: '',
      shortDescription: '',
      elaboration: '',
      languages: '',
      features: '',
    });
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Gambar proyek wajib diunggah');
      return;
    }

    try {
      setSaving(true);
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('serviceCategory', formData.serviceCategory);
      formDataObj.append('shortDescription', formData.shortDescription);
      formDataObj.append('elaboration', formData.elaboration);
      formDataObj.append('languages', JSON.stringify(formData.languages.split(',').map(lang => lang.trim())));
      formDataObj.append('features', JSON.stringify(formData.features.split(',').map(feat => feat.trim())));
      formDataObj.append('image', selectedFile);

      const response = await projectsAPI.create(formDataObj);
      if (response.status === 'success') {
        await fetchProjects();
        setIsCreateOpen(false);
        resetForm();
      }
    } catch (error: any) {
      alert('Gagal membuat proyek: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      serviceCategory: project.serviceCategory,
      shortDescription: project.shortDescription,
      elaboration: project.elaboration,
      languages: project.languages.join(', '),
      features: project.features.join(', '),
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    try {
      setSaving(true);
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('serviceCategory', formData.serviceCategory);
      formDataObj.append('shortDescription', formData.shortDescription);
      formDataObj.append('elaboration', formData.elaboration);
      formDataObj.append('languages', JSON.stringify(formData.languages.split(',').map(lang => lang.trim())));
      formDataObj.append('features', JSON.stringify(formData.features.split(',').map(feat => feat.trim())));
      
      if (selectedFile) {
        formDataObj.append('image', selectedFile);
      }

      const response = await projectsAPI.update(selectedProject.id, formDataObj);
      if (response.status === 'success') {
        await fetchProjects();
        setIsEditOpen(false);
        resetForm();
        setSelectedProject(null);
      }
    } catch (error: any) {
      alert('Gagal mengupdate proyek: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
      try {
        const response = await projectsAPI.delete(id);
        if (response.status === 'success') {
          await fetchProjects();
        }
      } catch (error: any) {
        alert('Gagal menghapus proyek: ' + error.message);
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
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Proyek</h1>
          <p className="text-gray-600">Kelola portofolio proyek perusahaan</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Proyek
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Proyek Baru</DialogTitle>
              <DialogDescription>Tambahkan proyek baru ke dalam portofolio</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Gambar Proyek *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {previewUrl ? (
                    <div className="relative">
                      <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded" />
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
                      <p className="text-sm text-gray-600">Klik untuk upload gambar</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Judul Proyek *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kategori Layanan *</Label>
                  <Input
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({...formData, serviceCategory: e.target.value})}
                    placeholder="Web Development, Mobile App, etc."
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Deskripsi Singkat *</Label>
                <Textarea
                  value={formData.shortDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, shortDescription: e.target.value})}
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Elaborasi Detail *</Label>
                <Textarea
                  value={formData.elaboration}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, elaboration: e.target.value})}
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Teknologi (pisahkan dengan koma) *</Label>
                  <Input
                    value={formData.languages}
                    onChange={(e) => setFormData({...formData, languages: e.target.value})}
                    placeholder="JavaScript, React, Node.js"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fitur (pisahkan dengan koma) *</Label>
                  <Input
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    placeholder="Real-time Chat, Payment Gateway"
                    required
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Simpan
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
              <CardTitle>Daftar Proyek</CardTitle>
              <CardDescription>
                Total {projects.length} proyek dalam portofolio
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Cari proyek..."
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
                  <TableHead>Gambar</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Teknologi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{project.shortDescription}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.serviceCategory}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.languages.slice(0, 2).map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.languages.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.languages.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(project.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(project.id, project.title)}
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
            <DialogTitle>Edit Proyek</DialogTitle>
            <DialogDescription>Ubah informasi proyek</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label>Gambar Proyek</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {previewUrl ? (
                  <div className="relative">
                    <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded" />
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
                ) : selectedProject?.imageUrl ? (
                  <div className="relative">
                    <img src={selectedProject.imageUrl} alt="Current" className="w-full h-48 object-cover rounded" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <p className="text-white text-sm">Klik untuk ganti gambar</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Klik untuk upload gambar</p>
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Judul Proyek *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Kategori Layanan *</Label>
                <Input
                  value={formData.serviceCategory}
                  onChange={(e) => setFormData({...formData, serviceCategory: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Deskripsi Singkat *</Label>
              <Textarea
                value={formData.shortDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, shortDescription: e.target.value})}
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Elaborasi Detail *</Label>
              <Textarea
                value={formData.elaboration}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, elaboration: e.target.value})}
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Teknologi (pisahkan dengan koma) *</Label>
                <Input
                  value={formData.languages}
                  onChange={(e) => setFormData({...formData, languages: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Fitur (pisahkan dengan koma) *</Label>
                <Input
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  required
                />
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
