"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/hooks/use-translations";
import { productsAPI } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Edit, Image, Loader2, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title_id: string;
  title_en: string;
  serviceCategory: string;
  imageUrl: string;
  shortDescription_id: string;
  shortDescription_en: string;
  elaboration_id: string;
  elaboration_en: string;
  languages: string[];
  features: string[];
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title_id: "",
    title_en: "",
    serviceCategory: "",
    shortDescription_id: "",
    shortDescription_en: "",
    elaboration_id: "",
    elaboration_en: "",
    languages: "",
    features: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { t, locale } = useTranslations();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.title_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.serviceCategory
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.shortDescription_id
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.shortDescription_en
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      if (response.status === "success") {
        setProducts(response.data as Product[]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
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
      title_id: "",
      title_en: "",
      serviceCategory: "",
      shortDescription_id: "",
      shortDescription_en: "",
      elaboration_id: "",
      elaboration_en: "",
      languages: "",
      features: "",
    });
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Removed image requirement validation - image is now optional

    try {
      setSaving(true);
      const formDataObj = new FormData();
      formDataObj.append("title_id", formData.title_id);
      formDataObj.append("title_en", formData.title_en);
      formDataObj.append("serviceCategory", formData.serviceCategory);
      formDataObj.append("shortDescription_id", formData.shortDescription_id);
      formDataObj.append("shortDescription_en", formData.shortDescription_en);
      formDataObj.append("elaboration_id", formData.elaboration_id);
      formDataObj.append("elaboration_en", formData.elaboration_en);
      formDataObj.append(
        "languages",
        JSON.stringify(
          (formData.languages || "").split(",").map((lang) => lang.trim())
        )
      );
      formDataObj.append(
        "features",
        JSON.stringify(
          (formData.features || "").split(",").map((feat) => feat.trim())
        )
      );

      // Only append image if file is selected
      if (selectedFile) {
        formDataObj.append("image", selectedFile);
      }

      const response = await productsAPI.create(formDataObj);
      if (response.status === "success") {
        await fetchProducts();
        setIsCreateOpen(false);
        resetForm();
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("admin.pages.products.errors.genericError") ||
            "Terjadi kesalahan";
      alert(
        t("admin.pages.products.errors.createFailed").replace(
          "{error}",
          errorMessage
        ) || "Gagal membuat produk: " + errorMessage
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      title_id: product.title_id,
      title_en: product.title_en,
      serviceCategory: product.serviceCategory,
      shortDescription_id: product.shortDescription_id,
      shortDescription_en: product.shortDescription_en,
      elaboration_id: product.elaboration_id,
      elaboration_en: product.elaboration_en,
      languages: product.languages.join(", "),
      features: product.features.join(", "),
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      setSaving(true);
      const formDataObj = new FormData();
      formDataObj.append("title_id", formData.title_id);
      formDataObj.append("title_en", formData.title_en);
      formDataObj.append("serviceCategory", formData.serviceCategory);
      formDataObj.append("shortDescription_id", formData.shortDescription_id);
      formDataObj.append("shortDescription_en", formData.shortDescription_en);
      formDataObj.append("elaboration_id", formData.elaboration_id);
      formDataObj.append("elaboration_en", formData.elaboration_en);
      formDataObj.append(
        "languages",
        JSON.stringify(
          (formData.languages || "").split(",").map((lang) => lang.trim())
        )
      );
      formDataObj.append(
        "features",
        JSON.stringify(
          (formData.features || "").split(",").map((feat) => feat.trim())
        )
      );

      if (selectedFile) {
        formDataObj.append("image", selectedFile);
      }

      const response = await productsAPI.update(
        selectedProduct.id,
        formDataObj
      );
      if (response.status === "success") {
        await fetchProducts();
        setIsEditOpen(false);
        resetForm();
        setSelectedProduct(null);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("admin.pages.products.errors.genericError") ||
            "Terjadi kesalahan";
      alert(
        t("admin.pages.products.errors.updateFailed").replace(
          "{error}",
          errorMessage
        ) || "Gagal mengupdate produk: " + errorMessage
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      window.confirm(
        t("admin.pages.products.deleteConfirm").replace("{title}", title) ||
          `Apakah Anda yakin ingin menghapus produk "${title}"?`
      )
    ) {
      try {
        const response = await productsAPI.delete(id);
        if (response.status === "success") {
          await fetchProducts();
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : t("admin.pages.products.errors.genericError") ||
              "Terjadi kesalahan";
        alert(
          t("admin.pages.products.errors.deleteFailed").replace(
            "{error}",
            errorMessage
          ) || "Gagal menghapus produk: " + errorMessage
        );
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
          <h1 className="text-3xl font-bold text-gray-900">
            {t("admin.pages.products.title") || "Manajemen Produk"}
          </h1>
          <p className="text-gray-600">
            {t("admin.pages.products.subtitle") ||
              "Kelola portofolio produk perusahaan"}
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              {t("admin.pages.products.addProduct") || "Tambah Produk"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {t("admin.pages.products.addProduct") || "Tambah Produk Baru"}
              </DialogTitle>
              <DialogDescription>
                {t("admin.pages.products.addDescription") ||
                  "Tambahkan produk baru ke dalam portofolio"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>
                  {t("admin.pages.products.form.image") || "Gambar Produk"}{" "}
                  (Opsional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded"
                      />
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
                      <p className="text-sm text-gray-600">
                        Klik untuk upload gambar (opsional)
                      </p>
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

              {/* Title Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">
                  Judul Produk / Product Title
                </h4>
                <div className="space-y-2">
                  <Label>Judul Produk (Bahasa Indonesia) *</Label>
                  <Input
                    value={formData.title_id}
                    onChange={(e) =>
                      setFormData({ ...formData, title_id: e.target.value })
                    }
                    placeholder="Sistem Informasi Manajemen, Aplikasi E-Commerce, dll."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Title (English) *</Label>
                  <Input
                    value={formData.title_en}
                    onChange={(e) =>
                      setFormData({ ...formData, title_en: e.target.value })
                    }
                    placeholder="Management Information System, E-Commerce Application, etc."
                    required
                  />
                </div>
              </div>

              {/* Service Category Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">
                  Kategori Layanan / Service Category
                </h4>
                <div className="space-y-2">
                  <Label>Kategori Layanan</Label>
                  <Input
                    value={formData.serviceCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        serviceCategory: e.target.value,
                      })
                    }
                    placeholder="Pengembangan Web, Aplikasi Mobile, dll."
                    required
                  />
                </div>
              </div>

              {/* Short Description Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">
                  Deskripsi Singkat / Short Description
                </h4>
                <div className="space-y-2">
                  <Label>Deskripsi Singkat (Bahasa Indonesia) *</Label>
                  <Textarea
                    value={formData.shortDescription_id}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({
                        ...formData,
                        shortDescription_id: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Ringkasan singkat tentang proyek ini..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Short Description (English) *</Label>
                  <Textarea
                    value={formData.shortDescription_en}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({
                        ...formData,
                        shortDescription_en: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Brief summary about this product..."
                    required
                  />
                </div>
              </div>

              {/* Elaboration Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">
                  Elaborasi Detail / Detailed Elaboration
                </h4>
                <div className="space-y-2">
                  <Label>Elaborasi Detail (Bahasa Indonesia) *</Label>
                  <Textarea
                    value={formData.elaboration_id}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({
                        ...formData,
                        elaboration_id: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Penjelasan detail tentang proyek, tantangan, dan solusi yang diberikan..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Detailed Elaboration (English) *</Label>
                  <Textarea
                    value={formData.elaboration_en}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({
                        ...formData,
                        elaboration_en: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Detailed explanation about the product, challenges, and solutions provided..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {t("admin.pages.products.form.technologies") ||
                      "Teknologi (pisahkan dengan koma)"}{" "}
                    *
                  </Label>
                  <Input
                    value={formData.languages}
                    onChange={(e) =>
                      setFormData({ ...formData, languages: e.target.value })
                    }
                    placeholder="JavaScript, React, Node.js"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {t("admin.pages.products.form.features") ||
                      "Fitur (pisahkan dengan koma)"}{" "}
                    *
                  </Label>
                  <Input
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                    placeholder="Real-time Chat, Payment Gateway"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  {t("admin.common.cancel") || "Batal"}
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
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
              <CardTitle>
                {t("admin.pages.products.list.title") || "Daftar Produk"}
              </CardTitle>
              <CardDescription>
                {t("admin.pages.products.list.total")?.replace(
                  "{count}",
                  products.length.toString()
                ) || `Total ${products.length} produk dalam portofolio`}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={
                    t("admin.pages.products.list.search") || "Cari produk..."
                  }
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
                  <TableHead>
                    {t("admin.pages.products.list.image") || "Gambar"}
                  </TableHead>
                  <TableHead>
                    {t("admin.pages.products.form.title") || "Judul"}
                  </TableHead>
                  <TableHead>
                    {t("admin.pages.products.list.category") || "Kategori"}
                  </TableHead>
                  <TableHead>
                    {t("admin.pages.products.form.technologies") || "Teknologi"}
                  </TableHead>
                  <TableHead>
                    {t("admin.pages.products.list.date") || "Tanggal"}
                  </TableHead>
                  <TableHead className="text-right">
                    {t("admin.pages.products.list.actions") || "Aksi"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={getImageUrl(product.imageUrl)}
                        alt={
                          locale === "en" ? product.title_en : product.title_id
                        }
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-medium">
                          {locale === "en"
                            ? product.title_en
                            : product.title_id}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {locale === "en"
                            ? product.shortDescription_en
                            : product.shortDescription_id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {locale === "en"
                          ? product.serviceCategory
                          : product.serviceCategory}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.languages.slice(0, 2).map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {product.languages.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{product.languages.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(product.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDelete(
                              product.id,
                              locale === "en"
                                ? product.title_en
                                : product.title_id
                            )
                          }
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
            <DialogTitle>
              {t("admin.pages.products.editProduct") || "Edit Produk"}
            </DialogTitle>
            <DialogDescription>
              {t("admin.pages.products.editDescription") ||
                "Ubah informasi produk"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label>Gambar Produk (Opsional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded"
                    />
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
                ) : selectedProduct?.imageUrl ? (
                  <div className="relative">
                    <img
                      src={getImageUrl(selectedProduct.imageUrl)}
                      alt="Current"
                      className="w-full h-48 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <p className="text-white text-sm">
                        Klik untuk ganti gambar (opsional)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Klik untuk upload gambar (opsional)
                    </p>
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

            {/* Title Fields - Bilingual */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">
                Judul Produk / Product Title
              </h4>
              <div className="space-y-2">
                <Label>Judul Produk (Bahasa Indonesia) *</Label>
                <Input
                  value={formData.title_id}
                  onChange={(e) =>
                    setFormData({ ...formData, title_id: e.target.value })
                  }
                  placeholder="Sistem Informasi Manajemen, Aplikasi E-Commerce, dll."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Product Title (English) *</Label>
                <Input
                  value={formData.title_en}
                  onChange={(e) =>
                    setFormData({ ...formData, title_en: e.target.value })
                  }
                  placeholder="Management Information System, E-Commerce Application, etc."
                  required
                />
              </div>
            </div>

            {/* Service Category Fields - Bilingual */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">
                Kategori Layanan / Service Category
              </h4>
              <div className="space-y-2">
                <Label>Kategori Layanan</Label>
                <Input
                  value={formData.serviceCategory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      serviceCategory: e.target.value,
                    })
                  }
                  placeholder="Pengembangan Web, Aplikasi Mobile, dll."
                  required
                />
              </div>
            </div>

            {/* Short Description Fields - Bilingual */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">
                Deskripsi Singkat / Short Description
              </h4>
              <div className="space-y-2">
                <Label>Deskripsi Singkat (Bahasa Indonesia) *</Label>
                <Textarea
                  value={formData.shortDescription_id}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({
                      ...formData,
                      shortDescription_id: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Ringkasan singkat tentang proyek ini..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Short Description (English) *</Label>
                <Textarea
                  value={formData.shortDescription_en}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({
                      ...formData,
                      shortDescription_en: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Brief summary about this product..."
                  required
                />
              </div>
            </div>

            {/* Elaboration Fields - Bilingual */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">
                Elaborasi Detail / Detailed Elaboration
              </h4>
              <div className="space-y-2">
                <Label>Elaborasi Detail (Bahasa Indonesia) *</Label>
                <Textarea
                  value={formData.elaboration_id}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, elaboration_id: e.target.value })
                  }
                  rows={4}
                  placeholder="Penjelasan detail tentang proyek, tantangan, dan solusi yang diberikan..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Detailed Elaboration (English) *</Label>
                <Textarea
                  value={formData.elaboration_en}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, elaboration_en: e.target.value })
                  }
                  rows={4}
                  placeholder="Detailed explanation about the product, challenges, and solutions provided..."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Teknologi (pisahkan dengan koma) *</Label>
                <Input
                  value={formData.languages}
                  onChange={(e) =>
                    setFormData({ ...formData, languages: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Fitur (pisahkan dengan koma) *</Label>
                <Input
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
              >
                {t("admin.common.cancel") || "Batal"}
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                {t("admin.common.update") || "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
