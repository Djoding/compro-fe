export const translations = {
  id: {
    // Navigation
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      solutions: "Solusi",
      expertise: "Keahlian",
      news: "Berita",
      contact: "Kontak",
      team: "Tim",
      certificates: "Sertifikat",
    },

    // Common UI
    ui: {
      loading: "Memuat...",
      error: "Terjadi kesalahan",
      retry: "Coba Lagi",
      save: "Simpan",
      cancel: "Batal",
      edit: "Edit",
      delete: "Hapus",
      add: "Tambah",
      search: "Cari",
      filter: "Filter",
      viewAll: "Lihat Semua",
      viewDetails: "Lihat Detail",
      readMore: "Baca Selengkapnya",
      loadMore: "Muat Lebih Banyak",
      close: "Tutup",
      back: "Kembali",
      next: "Selanjutnya",
      previous: "Sebelumnya",
    },

    // Buttons
    buttons: {
      startProject: "Mulai Proyek",
      watchStory: "Tonton Cerita Kami",
      getStarted: "Mulai Sekarang",
      learnMore: "Pelajari Lebih Lanjut",
      contactUs: "Hubungi Kami",
      sendMessage: "Kirim Pesan",
      subscribe: "Berlangganan",
    },

    // Forms
    forms: {
      name: "Nama",
      email: "Email",
      phone: "Telepon",
      company: "Perusahaan",
      message: "Pesan",
      subject: "Subjek",
      required: "Wajib diisi",
      invalidEmail: "Format email tidak valid",
      submitSuccess: "Berhasil dikirim",
      submitError: "Gagal mengirim",
    },

    // Sections
    sections: {
      hero: {
        badge: "PT. Teknalogi Transformasi Digital",
      },
      stats: {
        projects: "Proyek",
        clients: "Klien",
        years: "Tahun",
        experts: "Ahli",
      },
      about: {
        title: "Tentang Teknalogi",
        subtitle: "Transformasi Bisnis Melalui",
      },
    },
  },

  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About Us",
      solutions: "Solutions",
      expertise: "Expertise",
      news: "News",
      contact: "Contact",
      team: "Team",
      certificates: "Certificates",
    },

    // Common UI
    ui: {
      loading: "Loading...",
      error: "An error occurred",
      retry: "Try Again",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      search: "Search",
      filter: "Filter",
      viewAll: "View All",
      viewDetails: "View Details",
      readMore: "Read More",
      loadMore: "Load More",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
    },

    // Buttons
    buttons: {
      startProject: "Start Your Project",
      watchStory: "Watch Our Story",
      getStarted: "Get Started",
      learnMore: "Learn More",
      contactUs: "Contact Us",
      sendMessage: "Send Message",
      subscribe: "Subscribe",
    },

    // Forms
    forms: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      message: "Message",
      subject: "Subject",
      required: "Required",
      invalidEmail: "Invalid email format",
      submitSuccess: "Successfully sent",
      submitError: "Failed to send",
    },

    // Sections
    sections: {
      hero: {
        badge: "PT. Teknalogi Transformasi Digital",
      },
      stats: {
        projects: "Projects",
        clients: "Clients",
        years: "Years",
        experts: "Experts",
      },
      about: {
        title: "About Teknalogi",
        subtitle: "Transforming Business Through",
      },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.id;
