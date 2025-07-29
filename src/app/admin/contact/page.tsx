"use client";

import { useState, useEffect } from "react";
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
import { contactAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { Phone, Mail, MapPin, Clock, MessageSquare, Trash2, Settings } from "lucide-react";

interface ContactInfo {
  id: string;
  location_id: string;
  location_en: string;
  phone: string;
  email: string;
  operationHours_id: string;
  operationHours_en: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ContactPage() {
  const { t, locale } = useTranslations();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    id: "",
    location_id: "",
    location_en: "",
    phone: "",
    email: "",
    operationHours_id: "",
    operationHours_en: ""
  });
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchContactData = async () => {
    try {
      setLoading(true);

      // Fetch contact info
      const infoResponse = await contactAPI.getInfo();
      if (infoResponse.status === "success") {
        setContactInfo(infoResponse.data as ContactInfo);
      }

      // Fetch contact messages
      const messagesResponse = await contactAPI.getMessages();
      if (messagesResponse.status === "success") {
        setMessages(messagesResponse.data as ContactMessage[]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("admin.pages.contact.fetchError").replace("{error}", getFriendlyErrorMessage(error)),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () => {
      fetchContactData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // Empty dependency array - only run on mount
  );

  const handleUpdateContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Only send the fields that should be updated
      const updateData = {
        location_id: contactInfo.location_id,
        location_en: contactInfo.location_en,
        phone: contactInfo.phone,
        email: contactInfo.email,
        operationHours_id: contactInfo.operationHours_id,
        operationHours_en: contactInfo.operationHours_en
      };

      const response = await contactAPI.updateInfo(updateData);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: t("admin.pages.contact.success") || "Informasi kontak berhasil diperbarui",
          variant: "success"
        });
        setDialogOpen(false);
        // Refresh the data to get the updated info
        fetchContactData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("admin.pages.contact.error").replace("{error}", getFriendlyErrorMessage(error)),
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm(t("admin.pages.contact.messages.deleteConfirm") || "Apakah Anda yakin ingin menghapus pesan ini?")) return;

    try {
      const response = await contactAPI.deleteMessage(id);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: t("admin.pages.contact.deleteSuccess") || "Pesan berhasil dihapus",
          variant: "success"
        });
        fetchContactData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("admin.pages.contact.deleteError").replace("{error}", getFriendlyErrorMessage(error)),
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded-lg" />
            <div className="h-64 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Phone className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("admin.pages.contact.title") || "Kontak & Pesan"}</h1>
            <p className="text-gray-600">{t("admin.pages.contact.subtitle") || "Kelola informasi kontak dan pesan masuk"}</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {t("admin.pages.contact.editDialog.button") || "Edit Info Kontak"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("admin.pages.contact.editDialog.title") || "Edit Informasi Kontak"}</DialogTitle>
              <DialogDescription>
                {t("admin.pages.contact.editDialog.description") ||
                  "Perbarui informasi kontak yang akan ditampilkan di website"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateContactInfo} className="space-y-4">
              {/* Location Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Alamat / Address</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location_id">Alamat (ID)</Label>
                    <Textarea
                      id="location_id"
                      value={contactInfo.location_id}
                      onChange={e => setContactInfo(prev => ({ ...prev, location_id: e.target.value }))}
                      placeholder="Alamat lengkap perusahaan"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location_en">Address (EN)</Label>
                    <Textarea
                      id="location_en"
                      value={contactInfo.location_en}
                      onChange={e => setContactInfo(prev => ({ ...prev, location_en: e.target.value }))}
                      placeholder="Company address in English"
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("admin.pages.contact.form.phone") || "Nomor Telepon"}</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={e => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+62 21 1234 5678"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("admin.pages.contact.form.email") || "Email"}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={e => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contact@company.com"
                    required
                  />
                </div>
              </div>

              {/* Operation Hours Fields - Bilingual */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Jam Operasional / Operation Hours</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="operationHours_id">Jam Operasional (ID)</Label>
                    <Input
                      id="operationHours_id"
                      value={contactInfo.operationHours_id}
                      onChange={e => setContactInfo(prev => ({ ...prev, operationHours_id: e.target.value }))}
                      placeholder="Senin - Jumat, 09:00 - 17:00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operationHours_en">Operation Hours (EN)</Label>
                    <Input
                      id="operationHours_en"
                      value={contactInfo.operationHours_en}
                      onChange={e => setContactInfo(prev => ({ ...prev, operationHours_en: e.target.value }))}
                      placeholder="Monday - Friday, 09:00 - 17:00"
                      required
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t("admin.pages.contact.form.cancel") || "Batal"}
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating
                    ? t("admin.pages.contact.form.saving") || "Menyimpan..."
                    : t("admin.pages.contact.form.save") || "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              {t("admin.pages.contact.contactInfo.title") || "Informasi Kontak"}
            </CardTitle>
            <CardDescription>
              {t("admin.pages.contact.contactInfo.description") || "Informasi kontak yang ditampilkan di website"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">{t("admin.pages.contact.contactInfo.address") || "Alamat"}</p>
                <p className="text-sm text-gray-600">{locale === "en" ? contactInfo.location_en : contactInfo.location_id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">{t("admin.pages.contact.contactInfo.phone") || "Telepon"}</p>
                <p className="text-sm text-gray-600">{contactInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">{t("admin.pages.contact.contactInfo.email") || "Email"}</p>
                <p className="text-sm text-gray-600">{contactInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">{t("admin.pages.contact.contactInfo.operationHours") || "Jam Operasional"}</p>
                <p className="text-sm text-gray-600">
                  {locale === "en" ? contactInfo.operationHours_en : contactInfo.operationHours_id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {t("admin.pages.contact.messages.title").replace("{count}", messages.length.toString()) ||
                `Pesan Masuk (${messages.length})`}
            </CardTitle>
            <CardDescription>
              {t("admin.pages.contact.messages.description") || "Pesan dari pengunjung website"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {messages.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map(message => (
                  <div key={message.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{message.name}</p>
                        <p className="text-sm text-gray-600">{message.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMessage(message.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div>
                      <p className="font-medium text-sm">{message.subject}</p>
                      <p className="text-sm text-gray-700 mt-1">{message.message}</p>
                    </div>

                    <p className="text-xs text-gray-500">{formatDate(message.createdAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{t("admin.pages.contact.messages.noMessages") || "Belum ada pesan masuk"}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
