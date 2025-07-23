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
import { getFriendlyErrorMessage } from "@/lib/error-messages";
import { Phone, Mail, MapPin, Clock, MessageSquare, Trash2, Settings } from "lucide-react";

interface ContactInfo {
  id: string;
  location: string;
  phone: string;
  email: string;
  operationHours: string;
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
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    id: "",
    location: "",
    phone: "",
    email: "",
    operationHours: ""
  });
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setLoading(true);

      // Fetch contact info
      const infoResponse = await contactAPI.getInfo();
      if (infoResponse.status === "success") {
        setContactInfo(infoResponse.data);
      }

      // Fetch contact messages
      const messagesResponse = await contactAPI.getMessages();
      if (messagesResponse.status === "success") {
        setMessages(messagesResponse.data);
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
  };

  const handleUpdateContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await contactAPI.updateInfo(contactInfo);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: "Informasi kontak berhasil diperbarui",
          variant: "success"
        });
        setDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(error),
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;

    try {
      const response = await contactAPI.deleteMessage(id);
      if (response.status === "success") {
        toast({
          title: "Berhasil",
          description: "Pesan berhasil dihapus",
          variant: "success"
        });
        fetchContactData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(error),
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
            <h1 className="text-3xl font-bold text-gray-900">Kontak & Pesan</h1>
            <p className="text-gray-600">Kelola informasi kontak dan pesan masuk</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Edit Info Kontak
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Informasi Kontak</DialogTitle>
              <DialogDescription>Perbarui informasi kontak yang akan ditampilkan di website</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateContactInfo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Alamat</Label>
                <Textarea
                  id="location"
                  value={contactInfo.location}
                  onChange={e => setContactInfo(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Alamat lengkap perusahaan"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={e => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+62 21 1234 5678"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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

              <div className="space-y-2">
                <Label htmlFor="operationHours">Jam Operasional</Label>
                <Input
                  id="operationHours"
                  value={contactInfo.operationHours}
                  onChange={e => setContactInfo(prev => ({ ...prev, operationHours: e.target.value }))}
                  placeholder="Senin - Jumat, 09:00 - 17:00 WIB"
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating ? "Menyimpan..." : "Simpan"}
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
              Informasi Kontak
            </CardTitle>
            <CardDescription>Informasi kontak yang ditampilkan di website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Alamat</p>
                <p className="text-sm text-gray-600">{contactInfo.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Telepon</p>
                <p className="text-sm text-gray-600">{contactInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-600">{contactInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Jam Operasional</p>
                <p className="text-sm text-gray-600">{contactInfo.operationHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Pesan Masuk ({messages.length})
            </CardTitle>
            <CardDescription>Pesan dari pengunjung website</CardDescription>
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
                <p className="text-gray-500">Belum ada pesan masuk</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
