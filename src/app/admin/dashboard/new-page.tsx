"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { companyProfileAPI, contactAPI, articlesAPI } from "@/lib/api";
import { Users, FolderOpen, MessageCircle, TrendingUp, Clock, Star, Eye, Calendar } from "lucide-react";

interface Stats {
  projectsCompleted: number;
  teamMembers: number;
  clientTestimonials: number;
}

interface RecentActivity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  status: "success" | "warning" | "info";
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  publishedAt: string;
  isFeatured: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projectsCompleted: 0,
    teamMembers: 0,
    clientTestimonials: 0
  });
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "project",
      message: 'Proyek "E-Commerce Platform" telah diselesaikan',
      timestamp: "2 jam yang lalu",
      status: "success"
    },
    {
      id: "2",
      type: "article",
      message: 'Artikel baru "AI dalam Web Development" dipublikasikan',
      timestamp: "5 jam yang lalu",
      status: "info"
    },
    {
      id: "3",
      type: "contact",
      message: "3 pesan baru dari klien potensial",
      timestamp: "1 hari yang lalu",
      status: "warning"
    }
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch stats
        const statsResponse = await companyProfileAPI.getStats();
        if (statsResponse.status === "success") {
          setStats(statsResponse.data as Stats);
        }

        // Fetch recent contact messages
        const messagesResponse = await contactAPI.getMessages();
        if (messagesResponse.status === "success") {
          setContactMessages((messagesResponse.data as ContactMessage[]).slice(0, 5)); // Get latest 5 messages
        }

        // Fetch recent articles
        const articlesResponse = await articlesAPI.getAll();
        if (articlesResponse.status === "success") {
          setRecentArticles((articlesResponse.data as Article[]).slice(0, 5)); // Get latest 5 articles
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Selamat datang kembali! Berikut adalah ringkasan aktivitas terbaru.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Proyek Selesai</CardTitle>
            <FolderOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.projectsCompleted}</div>
            <p className="text-xs text-blue-600">Total proyek yang telah diselesaikan</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Anggota Tim</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.teamMembers}</div>
            <p className="text-xs text-green-600">Professional yang berpengalaman</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Testimoni Klien</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.clientTestimonials}</div>
            <p className="text-xs text-purple-600">Feedback positif dari klien</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Pesan Masuk</CardTitle>
            <MessageCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{contactMessages.length}</div>
            <p className="text-xs text-orange-600">Pesan dari klien potensial</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>Update sistem dan aktivitas admin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Contact Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Pesan Terbaru
            </CardTitle>
            <CardDescription>Pesan masuk dari klien potensial</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactMessages.length > 0 ? (
              contactMessages.map(message => (
                <div key={message.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{message.name}</p>
                    <p className="text-xs text-gray-600 mb-1">{message.email}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{message.subject}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{formatDate(message.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Belum ada pesan masuk</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Artikel Terbaru
          </CardTitle>
          <CardDescription>Artikel dan berita yang baru dipublikasikan</CardDescription>
        </CardHeader>
        <CardContent>
          {recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentArticles.map(article => (
                <div key={article.id} className="p-4 rounded-lg bg-gray-50 border">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    {article.isFeatured && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Oleh {article.author}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Belum ada artikel yang dipublikasikan</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
