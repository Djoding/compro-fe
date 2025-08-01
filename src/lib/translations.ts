export const translations = {
  id: {
    // Navigation
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      solutions: "Solusi",
      expertise: "Keahlian",
      contact: "Kontak",
      team: "Tim",
      certificates: "Sertifikat",
      companyOverview: "Ikhtisar Perusahaan",
    },

    // Admin Panel
    admin: {
      title: "Panel Admin",
      welcome: "Selamat datang di Panel Admin",
      logout: "Logout",
      logoutConfirmation: {
        title: "Konfirmasi Logout",
        message:
          "Apakah Anda yakin ingin keluar dari panel admin? Anda akan perlu login kembali untuk mengakses halaman ini.",
        cancel: "Batal",
        confirm: "Ya, Logout",
      },
      common: {
        success: "Berhasil",
        error: "Error",
        cancel: "Batal",
        save: "Simpan",
        saving: "Menyimpan...",
        edit: "Edit",
        delete: "Hapus",
        add: "Tambah",
        update: "Perbarui",
        search: "Cari",
        loading: "Memuat...",
        confirm: "Konfirmasi",
        back: "Kembali",
        next: "Selanjutnya",
      },
      menu: {
        dashboard: "Dashboard",
        companyProfile: "Profil Perusahaan",
        projects: "Proyek",
        team: "Tim",
        services: "Layanan",
        testimonials: "Testimoni",
        contact: "Kontak",
        faqs: "FAQ",
        platforms: "Platform",
        certificates: "Sertifikat",
        journey: "Perjalanan",
      },
      pages: {
        services: {
          title: "Layanan",
          subtitle: "Kelola layanan yang ditawarkan perusahaan",
          addService: "Tambah Layanan",
          editService: "Edit Layanan",
          addDescription: "Tambahkan layanan baru yang ditawarkan",
          editDescription: "Perbarui informasi layanan",
          form: {
            name: "Nama Layanan",
            description: "Deskripsi",
            descriptionPlaceholder: "Deskripsi lengkap tentang layanan ini...",
            technologies: "Teknologi",
            technologiesHint: "Pisahkan setiap teknologi dengan koma",
          },
          technologies: "Teknologi",
          deleteConfirm: "Apakah Anda yakin ingin menghapus layanan ini?",
          empty: {
            title: "Belum ada layanan",
            subtitle: "Mulai tambahkan layanan yang ditawarkan perusahaan",
            addFirst: "Tambah Layanan Pertama",
          },
          addSuccess: "Layanan berhasil ditambahkan",
          updateSuccess: "Layanan berhasil diperbarui",
          deleteSuccess: "Layanan berhasil dihapus",
        },
        projects: {
          title: "Manajemen Proyek",
          subtitle: "Kelola portofolio proyek perusahaan",
          addProject: "Tambah Proyek",
          editProject: "Edit Proyek",
          addDescription: "Tambahkan proyek baru ke dalam portofolio",
          editDescription: "Ubah informasi proyek",
          form: {
            title: "Judul Proyek",
            serviceCategory: "Kategori Layanan",
            shortDescription: "Deskripsi Singkat",
            elaboration: "Elaborasi Detail",
            technologies: "Teknologi (pisahkan dengan koma)",
            features: "Fitur (pisahkan dengan koma)",
            image: "Gambar Proyek",
            imageRequired: "Gambar proyek wajib diunggah",
            imageOptional: "Klik untuk ganti gambar",
          },
          list: {
            title: "Daftar Proyek",
            total: "Total {count} proyek dalam portofolio",
            search: "Cari proyek...",
            image: "Gambar",
            category: "Kategori",
            date: "Tanggal",
            actions: "Aksi",
          },
          deleteConfirm: 'Apakah Anda yakin ingin menghapus proyek "{title}"?',
          errors: {
            createFailed: "Gagal membuat proyek: {error}",
            updateFailed: "Gagal mengupdate proyek: {error}",
            deleteFailed: "Gagal menghapus proyek: {error}",
            genericError: "Terjadi kesalahan",
          },
          success: {
            created: "Proyek berhasil dibuat",
            updated: "Proyek berhasil diperbarui",
            deleted: "Proyek berhasil dihapus",
          },
        },
        testimonials: {
          title: "Manajemen Testimoni",
          subtitle: "Kelola testimoni dari klien",
          addTestimonial: "Tambah Testimoni",
          editTestimonial: "Edit Testimoni",
          addDescription: "Tambahkan testimoni dari klien",
          editDescription: "Ubah informasi testimoni",
          form: {
            clientName: "Nama Klien",
            company: "Perusahaan",
            position: "Posisi",
            testimonial: "Testimoni",
            image: "Foto Klien (Optional)",
            imagePlaceholder: "Klik untuk upload foto",
            testimonialPlaceholder: "Tulis testimoni dari klien...",
          },
          list: {
            title: "Daftar Testimoni",
            total: "Total {count} testimoni dari klien",
            search: "Cari testimoni...",
            photo: "Foto",
            client: "Klien",
            company: "Perusahaan",
            position: "Posisi",
            testimonial: "Testimoni",
            date: "Tanggal",
            actions: "Aksi",
          },
          deleteConfirm:
            'Apakah Anda yakin ingin menghapus testimoni dari "{clientName}"?',
          errors: {
            createFailed: "Gagal membuat testimonial: {error}",
            updateFailed: "Gagal mengupdate testimonial: {error}",
            deleteFailed: "Gagal menghapus testimonial: {error}",
            genericError: "Terjadi kesalahan",
          },
          success: {
            created: "Testimoni berhasil dibuat",
            updated: "Testimoni berhasil diperbarui",
            deleted: "Testimoni berhasil dihapus",
          },
        },
        faqs: {
          title: "FAQ",
          subtitle: "Kelola pertanyaan yang sering diajukan",
          addFaq: "Tambah FAQ",
          editFaq: "Edit FAQ",
          addDescription: "Tambahkan pertanyaan dan jawaban baru",
          editDescription: "Perbarui pertanyaan dan jawaban",
          form: {
            question: "Pertanyaan",
            answer: "Jawaban",
            questionPlaceholder: "Masukkan pertanyaan yang sering diajukan...",
            answerPlaceholder: "Masukkan jawaban lengkap untuk pertanyaan...",
          },
          deleteConfirm: "Apakah Anda yakin ingin menghapus FAQ ini?",
          empty: {
            title: "Belum ada FAQ",
            subtitle:
              "Mulai tambahkan pertanyaan yang sering diajukan untuk membantu pengunjung",
            addFirst: "Tambah FAQ Pertama",
          },
          addSuccess: "FAQ berhasil ditambahkan",
          updateSuccess: "FAQ berhasil diperbarui",
          deleteSuccess: "FAQ berhasil dihapus",
        },
        companyProfile: {
          title: "Profil Perusahaan",
          subtitle: "Kelola informasi profil perusahaan",
          form: {
            companyOverview: "Gambaran Perusahaan",
            coreValues: "Nilai Inti",
            vision: "Visi",
            mission: "Misi",
            customerService: "Layanan Pelanggan",
            companyOverviewPlaceholder:
              "Tulis gambaran umum tentang perusahaan...",
            coreValuesPlaceholder: "Tulis nilai-nilai inti perusahaan...",
            visionPlaceholder: "Tulis visi perusahaan...",
            missionPlaceholder: "Tulis misi perusahaan...",
            customerServicePlaceholder: "Tulis tentang layanan pelanggan...",
          },
          vision: {
            description:
              "Pernyataan visi yang menggambarkan tujuan jangka panjang perusahaan",
            placeholder: "Masukkan visi perusahaan...",
          },
          mission: {
            title: "Misi Perusahaan",
            description:
              "Pernyataan misi yang menjelaskan cara perusahaan mencapai visinya",
            placeholder: "Masukkan misi perusahaan...",
          },
          coreValues: {
            title: "Nilai-Nilai Inti",
            description:
              "Nilai-nilai fundamental yang menjadi landasan operasional perusahaan",
            placeholder: "Masukkan nilai-nilai inti perusahaan...",
          },
          customerService: {
            title: "Layanan Pelanggan",
            description: "Komitmen perusahaan terhadap pelayanan pelanggan",
            placeholder: "Masukkan komitmen layanan pelanggan...",
          },
          saveButton: "Simpan Perubahan",
          saving: "Menyimpan...",
          saveSuccess: "Profil perusahaan berhasil disimpan",
          saveError: "Gagal menyimpan profil perusahaan",
        },
        contact: {
          title: "Kontak & Pesan",
          subtitle: "Kelola informasi kontak dan pesan masuk",

          // Contact info section
          contactInfo: {
            title: "Informasi Kontak",
            description: "Informasi kontak yang ditampilkan di website",
            address: "Alamat",
            phone: "Telepon",
            email: "Email",
            operationHours: "Jam Operasional",
          },

          // Messages section
          messages: {
            title: "Pesan Masuk ({count})",
            description: "Pesan dari pengunjung website",
            noMessages: "Belum ada pesan masuk",
            deleteConfirm: "Apakah Anda yakin ingin menghapus pesan ini?",
          },

          // Edit dialog
          editDialog: {
            title: "Edit Informasi Kontak",
            description:
              "Perbarui informasi kontak yang akan ditampilkan di website",
            button: "Edit Info Kontak",
          },

          // Form fields
          form: {
            address: "Alamat",
            addressPlaceholder: "Alamat lengkap perusahaan",
            phone: "Nomor Telepon",
            phonePlaceholder: "+62 21 1234 5678",
            email: "Email",
            emailPlaceholder: "contact@company.com",
            operationHours: "Jam Operasional",
            operationHoursPlaceholder: "Senin - Jumat, 09:00 - 17:00 WIB",
            cancel: "Batal",
            save: "Simpan",
            saving: "Menyimpan...",
          },

          // Success and error messages
          success: "Informasi kontak berhasil diperbarui",
          deleteSuccess: "Pesan berhasil dihapus",
          error: "Gagal memperbarui informasi kontak: {error}",
          fetchError: "Gagal memuat data kontak: {error}",
          deleteError: "Gagal menghapus pesan: {error}",
        },
        platforms: {
          title: "Platform",
          subtitle: "Kelola platform dan teknologi yang digunakan",
          addButton: "Tambah Platform",

          // Dialog
          addDialog: {
            title: "Tambah Platform",
            description: "Tambahkan platform atau teknologi baru",
            editTitle: "Edit Platform",
            editDescription: "Perbarui informasi platform",
          },

          // Form fields
          form: {
            name: "Nama Platform",
            namePlaceholder: "e.g. React, Node.js, AWS",
            description: "Deskripsi",
            descriptionPlaceholder: "Deskripsi penggunaan platform ini...",
            image: "Logo Platform",
            imageHelp: "Upload logo atau ikon platform (format: JPG, PNG)",
            cancel: "Batal",
            save: "Tambah",
            update: "Perbarui",
            saving: "Menyimpan...",
          },

          // Actions
          edit: "Edit",
          deleteConfirm: "Apakah Anda yakin ingin menghapus platform ini?",

          // Empty state
          empty: {
            title: "Belum ada platform",
            subtitle:
              "Mulai tambahkan platform dan teknologi yang digunakan perusahaan",
            addFirst: "Tambah Platform Pertama",
          },

          // Success and error messages
          addSuccess: "Platform berhasil ditambahkan",
          updateSuccess: "Platform berhasil diperbarui",
          deleteSuccess: "Platform berhasil dihapus",
          error: "Gagal memproses platform: {error}",
          fetchError: "Gagal memuat data platform: {error}",
        },
        certificates: {
          title: "Sertifikat",
          subtitle: "Kelola sertifikat dan penghargaan perusahaan",
          addButton: "Tambah Sertifikat",

          // Dialog
          addDialog: {
            title: "Tambah Sertifikat",
            description: "Upload gambar sertifikat atau penghargaan perusahaan",
          },

          // Form fields
          form: {
            fileLabel: "File Sertifikat",
            clickToSelect: "Klik untuk memilih file atau drag & drop",
            supportedFormats: "Format yang didukung: JPG, PNG, PDF (Max 5MB)",
            selectFile: "Pilih File",
            selectedFile: "File terpilih: {filename}",
            noFileSelected: "Pilih file sertifikat terlebih dahulu",
            cancel: "Batal",
            upload: "Upload",
            uploading: "Mengupload...",
          },

          // Certificate info
          addedDate: "Ditambahkan: {date}",
          deleteConfirm: "Apakah Anda yakin ingin menghapus sertifikat ini?",

          // Empty state
          empty: {
            title: "Belum ada sertifikat",
            subtitle: "Mulai upload sertifikat dan penghargaan perusahaan",
            addFirst: "Upload Sertifikat Pertama",
          },

          // Success and error messages
          addSuccess: "Sertifikat berhasil ditambahkan",
          deleteSuccess: "Sertifikat berhasil dihapus",
          error: "Gagal memproses sertifikat: {error}",
          fetchError: "Gagal memuat data sertifikat: {error}",
        },
        journey: {
          title: "Perjalanan Perusahaan",
          subtitle: "Kelola milestone dan pencapaian perusahaan",
          addButton: "Tambah Milestone",

          // Dialog
          addDialog: {
            title: "Tambah Milestone",
            description: "Tambahkan milestone baru dalam perjalanan perusahaan",
            editTitle: "Edit Milestone",
            editDescription: "Perbarui milestone perusahaan",
          },

          // Form fields
          form: {
            year: "Tahun",
            yearPlaceholder: "2024",
            title: "Judul Milestone",
            titlePlaceholder:
              "e.g. Pendirian Perusahaan, Ekspansi Internasional",
            description: "Deskripsi",
            descriptionPlaceholder:
              "Deskripsi lengkap tentang pencapaian ini...",
            cancel: "Batal",
            save: "Tambah",
            update: "Perbarui",
            saving: "Menyimpan...",
          },

          // Actions
          deleteConfirm: "Apakah Anda yakin ingin menghapus milestone ini?",

          // Empty state
          empty: {
            title: "Belum ada milestone",
            subtitle:
              "Mulai dokumentasikan perjalanan dan pencapaian perusahaan",
            addFirst: "Tambah Milestone Pertama",
          },

          // Success and error messages
          addSuccess: "Perjalanan berhasil ditambahkan",
          updateSuccess: "Perjalanan berhasil diperbarui",
          deleteSuccess: "Milestone berhasil dihapus",
          error: "Gagal memproses milestone: {error}",
          fetchError: "Gagal memuat data perjalanan: {error}",
        },
        team: {
          title: "Tim",
          subtitle: "Kelola anggota tim perusahaan",
          addMember: "Tambah Anggota Tim",
          editMember: "Edit Anggota Tim",
          addDescription: "Tambahkan anggota tim baru",
          editDescription: "Perbarui informasi anggota tim",
          form: {
            name: "Nama",
            position: "Posisi",
            roleCategory: "Kategori Role",
            specialization: "Spesialisasi",
            image: "Foto Profil",
            socialMedia: "Media Sosial",
            addSocial: "Tambah",
            platform: "Platform (LinkedIn, GitHub, etc.)",
            url: "URL",
          },
          deleteConfirm: "Apakah Anda yakin ingin menghapus anggota tim ini?",
          empty: {
            title: "Belum ada anggota tim",
            subtitle:
              "Mulai tambahkan anggota tim untuk menampilkan profil mereka di website",
            addFirst: "Tambah Anggota Tim Pertama",
          },
          addSuccess: "Anggota tim berhasil ditambahkan",
          updateSuccess: "Anggota tim berhasil diperbarui",
          deleteSuccess: "Anggota tim berhasil dihapus",
        },
        users: {
          title: "Users Management",
          subtitle: "Manage all users in your system",
          addUser: "Add User",
          editUser: "Edit User",
          addDescription: "Create a new user account",
          editDescription: "Update user information",
          form: {
            name: "Name",
            email: "Email",
            role: "Role",
            status: "Status",
            namePlaceholder: "Enter user name",
            emailPlaceholder: "Enter email address",
          },
          list: {
            title: "Users List",
            total: "{count} user(s) found",
            search: "Search users...",
            name: "Name",
            email: "Email",
            role: "Role",
            status: "Status",
            createdAt: "Created At",
            actions: "Actions",
          },
          roles: {
            user: "User",
            admin: "Admin",
            moderator: "Moderator",
          },
          status: {
            active: "Active",
            inactive: "Inactive",
          },
          deleteConfirm: "Are you sure you want to delete this user?",
          addSuccess: "User added successfully",
          updateSuccess: "User updated successfully",
          deleteSuccess: "User deleted successfully",
        },
      },
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
      loadingServices: "Memuat layanan...",
      loadingTestimonials: "Memuat testimoni...",
      loadingTeam: "Memuat tim...",
      loadingPortfolio: "Memuat portfolio...",
      loadingContactInfo: "Memuat informasi kontak...",
      loadingCompanyInfo: "Memuat informasi perusahaan...",
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
        badge: "Tentang",
        transformingTitle: "Mengubah Bisnis Melalui",
        morphingTexts: {
          digitalInnovation: "Inovasi Digital",
          businessGrowth: "Pertumbuhan Bisnis",
          technologySolutions: "Solusi Teknologi",
          futureSuccess: "Kesuksesan Masa Depan",
        },
        stats: {
          projectsCompleted: "Proyek Selesai",
          projectsCompletedDesc: "Solusi digital yang berhasil diberikan",
          happyClients: "Klien Puas",
          happyClientsDesc: "Bisnis yang ditransformasi melalui teknologi",
          yearsExperience: "Tahun Pengalaman",
          yearsExperienceDesc: "Tahun keahlian inovasi digital",
          teamMembers: "Anggota Tim",
          teamMembersDesc: "Profesional terampil siap membantu",
        },
        values: {
          innovationFirst: {
            title: "Inovasi Pertama",
            description:
              "Kami memprioritaskan solusi terdepan yang mendorong transformasi bisnis yang bermakna dan keunggulan kompetitif.",
          },
          clientCentric: {
            title: "Berpusat pada Klien",
            description:
              "Kesuksesan Anda adalah kesuksesan kami. Kami bekerja sama dengan klien untuk memahami dan melampaui ekspektasi mereka.",
          },
          creativeSolutions: {
            title: "Solusi Kreatif",
            description:
              "Kami berpikir di luar kotak untuk memberikan solusi unik yang disesuaikan dengan tantangan spesifik Anda.",
          },
          qualityExcellence: {
            title: "Keunggulan Kualitas",
            description:
              "Kami mempertahankan standar tertinggi dalam segala hal yang kami lakukan, memastikan solusi yang handal dan skalabel.",
          },
        },
        mission: {
          title: "Misi Kami",
          fallbackText:
            "Mempercepat pertumbuhan bisnis melalui solusi digital inovatif, memastikan bisnis Anda tidak hanya bertahan tetapi unggul dengan menyediakan arsitektur yang fleksibel dan skalabel dalam dunia digital yang terus berkembang.",
        },
        fallbackDescription:
          "PT. Teknalogi Transformasi Digital berdedikasi membantu bisnis berkembang di era digital. Kami menyediakan solusi teknologi komprehensif yang meningkatkan efisiensi, mendorong inovasi, dan membuka peluang pertumbuhan baru.",
      },
      testimonials: {
        badge: "Testimoni Klien",
        title: "Apa Kata Klien Kami",
        subtitle:
          "Jangan hanya percaya kata kami. Inilah yang dikatakan klien kami tentang pengalaman mereka bekerja dengan Teknalogi dan hasil yang telah kami capai bersama.",
        stats: {
          projectsCompleted: "Proyek Selesai",
          clientSatisfaction: "Kepuasan Klien",
          yearsExperience: "Tahun Pengalaman",
          supportAvailable: "Support Tersedia",
        },
      },
    },

    // Pages
    pages: {
      about: {
        badge: "Tentang Teknalogi",
        title: "Memimpin Inovasi Digital",
        titleSpan: "Sejak 2019",
        subtitle:
          "PT. Teknalogi Transformasi Digital telah menjadi yang terdepan dalam inovasi digital, membantu bisnis bertransformasi dan berkembang di era digital melalui solusi teknologi mutakhir.",
        loading: "Memuat informasi tentang...",
        visionMission: {
          title: "Visi & Misi Kami",
          subtitle: "Prinsip panduan yang menggerakkan semua yang kami lakukan",
        },
        coreValues: {
          title: "Nilai Inti Kami",
          subtitle:
            "Prinsip yang memandu keputusan kami dan membentuk budaya kami",
        },
        scrollingText:
          "Keunggulan • Inovasi • Kemitraan • Kepercayaan • Pertumbuhan • Keunggulan • Inovasi • Kemitraan • Kepercayaan • Pertumbuhan •",
        journey: {
          title: "Perjalanan Perusahaan Kami",
          subtitle:
            "Melihat kembali pencapaian penting kami dan evolusi sebagai mitra transformasi digital",
        },
        cta: {
          title: "Siap Memulai Perjalanan Digital Anda?",
          subtitle:
            "Bergabunglah dengan semakin banyak bisnis yang mempercayai Teknalogi untuk mempercepat transformasi digital mereka.",
          primaryButton: "Mulai Hari Ini",
          secondaryButton: "Pelajari Lebih Lanjut Tentang Kami",
        },
        fallback: {
          visionMission: {
            vision: {
              title: "Visi",
              content:
                "Menjadi mitra transformasi digital terdepan di Indonesia, memberdayakan bisnis dari segala ukuran untuk berkembang di era digital melalui solusi teknologi inovatif yang menciptakan keunggulan kompetitif yang berkelanjutan.",
            },
            mission: {
              title: "Misi",
              content:
                "Mempercepat pertumbuhan bisnis melalui solusi digital inovatif, memastikan bisnis Anda tidak hanya bertahan tetapi unggul dengan menyediakan arsitektur yang fleksibel dan scalable dalam dunia digital yang terus berkembang.",
            },
          },
          coreValues: {
            passionExcellence: {
              title: "Semangat Keunggulan",
              description:
                "Kami didorong oleh komitmen yang tak tergoyahkan untuk memberikan hasil luar biasa yang melebihi ekspektasi.",
            },
            innovationFirst: {
              title: "Inovasi Utama",
              description:
                "Kami merangkul teknologi mutakhir dan solusi kreatif untuk menyelesaikan tantangan bisnis yang kompleks.",
            },
            clientSuccess: {
              title: "Fokus Sukses Klien",
              description:
                "Kesuksesan Anda adalah kesuksesan kami. Kami bekerja sebagai mitra sejati yang berinvestasi dalam pertumbuhan jangka panjang Anda.",
            },
            transparencyTrust: {
              title: "Transparansi & Kepercayaan",
              description:
                "Kami percaya pada komunikasi terbuka dan hubungan jujur yang dibangun atas kepercayaan dan saling menghormati.",
            },
          },
          timeline: {
            2019: {
              title: "Perusahaan Didirikan",
              description:
                "PT Teknalogi didirikan dengan visi untuk mentransformasi bisnis melalui teknologi.",
              milestone: "Dimulai dengan 3 anggota pendiri",
            },
            2020: {
              title: "Klien Besar Pertama",
              description:
                "Berhasil mengantarkan proyek transformasi digital tingkat enterprise pertama kami.",
              milestone: "Tim berkembang menjadi 8 profesional",
            },
            2021: {
              title: "Ekspansi Layanan",
              description:
                "Memperluas layanan kami untuk mencakup solusi cloud, pengembangan mobile, dan cybersecurity.",
              milestone: "Melayani 25+ klien di seluruh Indonesia",
            },
            2022: {
              title: "Kemitraan Teknologi",
              description:
                "Membentuk kemitraan strategis dengan penyedia teknologi utama dan platform cloud.",
              milestone: "Meraih status AWS Partner",
            },
            2023: {
              title: "Fokus Inovasi",
              description:
                "Meluncurkan praktik AI dan machine learning kami untuk membantu klien memanfaatkan analitik canggih.",
              milestone: "Mengantarkan 50+ proyek sukses",
            },
            2024: {
              title: "Pertumbuhan Berkelanjutan",
              description:
                "Memperluas tim dan kemampuan kami untuk melayani lebih banyak klien dengan solusi digital komprehensif.",
              milestone: "15+ developer dan konsultan ahli",
            },
          },
        },
      },
      certificates: {
        badge: "Sertifikasi & Kredensial",
        title: "Keahlian Terbukti &",
        titleSpan: "Kredibilitas Profesional",
        subtitle:
          "Tim kami memiliki sertifikasi dan kredensial terdepan di industri, memastikan kami memberikan solusi menggunakan teknologi terbaru dan praktik terbaik.",
        loading: "Memuat sertifikat...",
        companyAchievements: "Sertifikasi & Kemitraan Perusahaan",
        stats: {
          totalCertificates: "Total Sertifikat",
          activeCertifications: "Sertifikasi Aktif",
          expertiseAreas: "Area Keahlian",
          teamMembers: "Anggota Tim Bersertifikat",
        },
      },
      contact: {
        badge: "Hubungi Kami",
        title: "Siap Memulai",
        titleSpan: "Proyek Anda?",
        subtitle:
          "Mari diskusikan tujuan transformasi digital Anda. Tim ahli kami siap membantu Anda menavigasi kompleksitas teknologi modern dan memberikan hasil yang luar biasa.",
        faq: {
          title: "Pertanyaan yang Sering Diajukan",
          subtitle: "Jawaban cepat untuk pertanyaan umum tentang layanan kami",
        },
        quickContact: {
          visitOffice: "Kunjungi Kantor Kami",
          jakartaOffice: "Kantor Jakarta",
          callUs: "Hubungi Kami",
          availableDuringHours: "Tersedia selama jam kerja",
          callNow: "Telepon Sekarang",
          emailUs: "Email Kami",
          responseTime: "Kami biasanya merespon dalam 24 jam",
          sendEmail: "Kirim Email",
          businessHours: "Jam Kerja",
          jakartaTime: "Waktu Jakarta (GMT+7)",
          viewSchedule: "Lihat Jadwal",
          getDirections: "Petunjuk Arah",
        },
      },
      expertise: {
        badge: "Keahlian Kami",
        title: "Keunggulan Teknis",
        titleSpan: "Lintas Teknologi",
        subtitle:
          "Tim ahli kami membawa pengetahuan teknis mendalam di berbagai teknologi dan platform untuk memberikan solusi digital yang luar biasa.",
        coreCompetencies: {
          title: "Kompetensi Inti",
          subtitle: "Keahlian mendalam di seluruh stack teknologi",
        },
        platformPartners: {
          title: "Mitra Platform",
          subtitle:
            "Kemitraan bersertifikat dengan platform teknologi terdepan",
        },
        expertiseAreas: {
          fullStackDevelopment: {
            title: "Pengembangan Full-Stack",
            description:
              "Pengembangan aplikasi web end-to-end menggunakan framework modern dan praktik terbaik.",
            projects: "25+ Proyek",
          },
          mobileDevelopment: {
            title: "Pengembangan Mobile",
            description:
              "Aplikasi mobile native dan cross-platform untuk platform iOS dan Android.",
            projects: "15+ Aplikasi",
          },
          cloudArchitecture: {
            title: "Arsitektur Cloud",
            description:
              "Desain dan deployment infrastruktur cloud yang scalable di platform cloud utama.",
            projects: "20+ Migrasi",
          },
          dataEngineering: {
            title: "Data Engineering",
            description:
              "Pemrosesan big data, analitik, dan solusi business intelligence.",
            projects: "10+ Solusi",
          },
          cybersecurity: {
            title: "Keamanan Siber",
            description:
              "Audit keamanan komprehensif, penetration testing, dan solusi compliance.",
            projects: "30+ Audit",
          },
          apiDevelopment: {
            title: "Pengembangan API",
            description:
              "Desain, pengembangan, dan dokumentasi API RESTful dan GraphQL.",
            projects: "40+ API",
          },
        },
        platforms: {
          aws: {
            name: "Amazon Web Services",
            description: "Partner solusi cloud bersertifikat",
            level: "Lanjutan",
          },
          azure: {
            name: "Microsoft Azure",
            description: "Deployment cloud enterprise",
            level: "Menengah",
          },
          gcp: {
            name: "Google Cloud Platform",
            description: "Machine learning dan analitik",
            level: "Menengah",
          },
          vercel: {
            name: "Vercel",
            description: "Hosting aplikasi web modern",
            level: "Ahli",
          },
          mongodb: {
            name: "MongoDB Atlas",
            description: "Solusi database as a service",
            level: "Lanjutan",
          },
          stripe: {
            name: "Stripe",
            description: "Integrasi pemrosesan pembayaran",
            level: "Ahli",
          },
        },
      },
      solutions: {
        badge: "Solusi Kami",
        title: "Solusi Digital Yang",
        titleSpan: "Menghasilkan Hasil",
        subtitle:
          "Jelajahi portofolio komprehensif proyek transformasi digital yang sukses. Setiap solusi dibuat untuk memenuhi kebutuhan bisnis spesifik dan memberikan dampak yang terukur.",
      },
      team: {
        badge: "Tim Kami",
        title: "Bertemu Dengan",
        titleSpan: "Tim Ahli Kami",
        subtitle:
          "Tim profesional berpengalaman dan berdedikasi yang berkomitmen untuk memberikan solusi teknologi inovatif dan layanan pelanggan yang luar biasa.",
        loading: "Memuat tim...",
        organizationChart: "Struktur Organisasi",
        filterAll: "Semua",
        stats: {
          totalTeamMembers: "Total Anggota Tim",
          seniorsAndExperts: "Senior & Ahli",
          yearsExperience: "Tahun Pengalaman",
          projectsDelivered: "Proyek Diselesaikan",
        },
        cta: {
          title: "Ingin Bergabung dengan Tim Kami?",
          subtitle:
            "Kami selalu mencari talenta terbaik untuk bergabung dengan misi kami mentransformasi bisnis melalui teknologi.",
          button: "Lihat Peluang Karir",
        },
        fallbackMember: "Team Member",
      },
    },

    // Footer
    footer: {
      companyDescription:
        "Mempercepat Bisnis Anda Melalui Inovasi Digital. Kami merancang dan membangun solusi teknologi khusus yang meningkatkan efisiensi dan membuka potensi baru.",
      quickLinks: {
        title: "Tautan Cepat",
        aboutUs: "Tentang Kami",
        solutions: "Solusi",
        expertise: "Keahlian",
        contact: "Kontak",
      },
      services: {
        title: "Layanan Kami",
        webDevelopment: "Pengembangan Web",
        mobileApps: "Aplikasi Mobile",
        cloudSolutions: "Solusi Cloud",
        digitalTransformation: "Transformasi Digital",
        consulting: "Konsultasi",
      },
      contactInfo: {
        title: "Info Kontak",
        address: "Alamat",
        phone: "Telepon",
        email: "Email",
      },
      newsletter: {
        title: "Tetap Terhubung",
        description:
          "Berlangganan newsletter kami untuk mendapatkan wawasan teknologi terbaru dan update perusahaan.",
        placeholder: "Masukkan email Anda",
        subscribe: "Berlangganan",
      },
      copyright:
        "© 2025 PT. Teknalogi Transformasi Digital. Semua hak dilindungi.",
      links: {
        privacyPolicy: "Kebijakan Privasi",
        termsOfService: "Syarat Layanan",
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
      contact: "Contact",
      team: "Team",
      certificates: "Certificates",
      companyOverview: "Company Overview",
    },

    // Admin Panel
    admin: {
      title: "Admin Panel",
      welcome: "Welcome to Admin Panel",
      logout: "Logout",
      logoutConfirmation: {
        title: "Logout Confirmation",
        message:
          "Are you sure you want to log out from the admin panel? You will need to login again to access this page.",
        cancel: "Cancel",
        confirm: "Yes, Logout",
      },
      common: {
        success: "Success",
        error: "Error",
        cancel: "Cancel",
        save: "Save",
        saving: "Saving...",
        edit: "Edit",
        delete: "Delete",
        add: "Add",
        update: "Update",
        search: "Search",
        loading: "Loading...",
        confirm: "Confirm",
        back: "Back",
        next: "Next",
      },
      menu: {
        dashboard: "Dashboard",
        companyProfile: "Company Profile",
        projects: "Projects",
        team: "Team",
        services: "Services",
        testimonials: "Testimonials",
        contact: "Contact",
        faqs: "FAQs",
        platforms: "Platforms",
        certificates: "Certificates",
        journey: "Journey",
      },
      pages: {
        services: {
          title: "Services",
          subtitle: "Manage services offered by the company",
          addService: "Add Service",
          editService: "Edit Service",
          addDescription: "Add new services offered",
          editDescription: "Update service information",
          form: {
            name: "Service Name",
            description: "Description",
            descriptionPlaceholder: "Complete description of this service...",
            technologies: "Technologies",
            technologiesHint: "Separate each technology with a comma",
          },
          technologies: "Technologies",
          deleteConfirm: "Are you sure you want to delete this service?",
          empty: {
            title: "No services yet",
            subtitle: "Start adding services offered by the company",
            addFirst: "Add First Service",
          },
          addSuccess: "Service added successfully",
          updateSuccess: "Service updated successfully",
          deleteSuccess: "Service deleted successfully",
        },
        projects: {
          title: "Project Management",
          subtitle: "Manage company project portfolio",
          addProject: "Add Project",
          editProject: "Edit Project",
          addDescription: "Add a new project to the portfolio",
          editDescription: "Update project information",
          form: {
            title: "Project Title",
            serviceCategory: "Service Category",
            shortDescription: "Short Description",
            elaboration: "Detailed Elaboration",
            technologies: "Technologies (separated by commas)",
            features: "Features (separated by commas)",
            image: "Project Image",
            imageRequired: "Project image is required to upload",
            imageOptional: "Click to change image",
          },
          list: {
            title: "Project List",
            total: "Total {count} projects in portfolio",
            search: "Search projects...",
            image: "Image",
            category: "Category",
            date: "Date",
            actions: "Actions",
          },
          deleteConfirm: 'Are you sure you want to delete project "{title}"?',
          errors: {
            createFailed: "Failed to create project: {error}",
            updateFailed: "Failed to update project: {error}",
            deleteFailed: "Failed to delete project: {error}",
            genericError: "An error occurred",
          },
          success: {
            created: "Project created successfully",
            updated: "Project updated successfully",
            deleted: "Project deleted successfully",
          },
        },
        testimonials: {
          title: "Testimonials Management",
          subtitle: "Manage testimonials from clients",
          addTestimonial: "Add Testimonial",
          editTestimonial: "Edit Testimonial",
          addDescription: "Add testimonials from clients",
          editDescription: "Update testimonial information",
          form: {
            clientName: "Client Name",
            company: "Company",
            position: "Position",
            testimonial: "Testimonial",
            image: "Client Photo (Optional)",
            imagePlaceholder: "Click to upload photo",
            testimonialPlaceholder: "Write testimonial from client...",
          },
          list: {
            title: "Testimonials List",
            total: "Total {count} testimonials from clients",
            search: "Search testimonials...",
            photo: "Photo",
            client: "Client",
            company: "Company",
            position: "Position",
            testimonial: "Testimonial",
            date: "Date",
            actions: "Actions",
          },
          deleteConfirm:
            'Are you sure you want to delete testimonial from "{clientName}"?',
          errors: {
            createFailed: "Failed to create testimonial: {error}",
            updateFailed: "Failed to update testimonial: {error}",
            deleteFailed: "Failed to delete testimonial: {error}",
            genericError: "An error occurred",
          },
          success: {
            created: "Testimonial created successfully",
            updated: "Testimonial updated successfully",
            deleted: "Testimonial deleted successfully",
          },
        },
        faqs: {
          title: "FAQ",
          subtitle: "Manage frequently asked questions",
          addFaq: "Add FAQ",
          editFaq: "Edit FAQ",
          addDescription: "Add new questions and answers",
          editDescription: "Update questions and answers",
          form: {
            question: "Question",
            answer: "Answer",
            questionPlaceholder: "Enter frequently asked question...",
            answerPlaceholder: "Enter complete answer for the question...",
          },
          deleteConfirm: "Are you sure you want to delete this FAQ?",
          empty: {
            title: "No FAQs yet",
            subtitle:
              "Start adding frequently asked questions to help visitors",
            addFirst: "Add First FAQ",
          },
          addSuccess: "FAQ added successfully",
          updateSuccess: "FAQ updated successfully",
          deleteSuccess: "FAQ deleted successfully",
        },
        companyProfile: {
          title: "Company Profile",
          subtitle: "Manage company profile information",
          form: {
            companyOverview: "Company Overview",
            coreValues: "Core Values",
            vision: "Vision",
            mission: "Mission",
            customerService: "Customer Service",
            companyOverviewPlaceholder:
              "Write general overview about the company...",
            coreValuesPlaceholder: "Write company core values...",
            visionPlaceholder: "Write company vision...",
            missionPlaceholder: "Write company mission...",
            customerServicePlaceholder: "Write about customer service...",
          },
          vision: {
            description:
              "Vision statement that describes the company's long-term goals",
            placeholder: "Enter company vision...",
          },
          mission: {
            title: "Company Mission",
            description:
              "Mission statement that explains how the company achieves its vision",
            placeholder: "Enter company mission...",
          },
          coreValues: {
            title: "Core Values",
            description:
              "Fundamental values that serve as the foundation of company operations",
            placeholder: "Enter company core values...",
          },
          customerService: {
            title: "Customer Service",
            description: "Company commitment to customer service",
            placeholder: "Enter customer service commitment...",
          },
          saveButton: "Save Changes",
          saving: "Saving...",
          saveSuccess: "Company profile saved successfully",
          saveError: "Failed to save company profile",
        },
        contact: {
          title: "Contact & Messages",
          subtitle: "Manage contact information and incoming messages",

          // Contact info section
          contactInfo: {
            title: "Contact Information",
            description: "Contact information displayed on website",
            address: "Address",
            phone: "Phone",
            email: "Email",
            operationHours: "Operation Hours",
          },

          // Messages section
          messages: {
            title: "Incoming Messages ({count})",
            description: "Messages from website visitors",
            noMessages: "No messages yet",
            deleteConfirm: "Are you sure you want to delete this message?",
          },

          // Edit dialog
          editDialog: {
            title: "Edit Contact Information",
            description:
              "Update contact information to be displayed on website",
            button: "Edit Contact Info",
          },

          // Form fields
          form: {
            address: "Address",
            addressPlaceholder: "Company full address",
            phone: "Phone Number",
            phonePlaceholder: "+62 21 1234 5678",
            email: "Email",
            emailPlaceholder: "contact@company.com",
            operationHours: "Operation Hours",
            operationHoursPlaceholder: "Monday - Friday, 09:00 - 17:00 WIB",
            cancel: "Cancel",
            save: "Save",
            saving: "Saving...",
          },

          // Success and error messages
          success: "Contact information updated successfully",
          deleteSuccess: "Message deleted successfully",
          error: "Failed to update contact information: {error}",
          fetchError: "Failed to load contact data: {error}",
          deleteError: "Failed to delete message: {error}",
        },
        platforms: {
          title: "Platforms",
          subtitle: "Manage platforms and technologies used",
          addButton: "Add Platform",

          // Dialog
          addDialog: {
            title: "Add Platform",
            description: "Add new platform or technology",
            editTitle: "Edit Platform",
            editDescription: "Update platform information",
          },

          // Form fields
          form: {
            name: "Platform Name",
            namePlaceholder: "e.g. React, Node.js, AWS",
            description: "Description",
            descriptionPlaceholder: "Description of platform usage...",
            image: "Platform Logo",
            imageHelp: "Upload platform logo or icon (format: JPG, PNG)",
            cancel: "Cancel",
            save: "Add",
            update: "Update",
            saving: "Saving...",
          },

          // Actions
          edit: "Edit",
          deleteConfirm: "Are you sure you want to delete this platform?",

          // Empty state
          empty: {
            title: "No platforms yet",
            subtitle:
              "Start adding platforms and technologies used by the company",
            addFirst: "Add First Platform",
          },

          // Success and error messages
          addSuccess: "Platform added successfully",
          updateSuccess: "Platform updated successfully",
          deleteSuccess: "Platform deleted successfully",
          error: "Failed to process platform: {error}",
          fetchError: "Failed to load platform data: {error}",
        },
        certificates: {
          title: "Certificates",
          subtitle: "Manage company certificates and awards",
          addButton: "Add Certificate",

          // Dialog
          addDialog: {
            title: "Add Certificate",
            description: "Upload certificate or company award image",
          },

          // Form fields
          form: {
            fileLabel: "Certificate File",
            clickToSelect: "Click to select file or drag & drop",
            supportedFormats: "Supported formats: JPG, PNG, PDF (Max 5MB)",
            selectFile: "Select File",
            selectedFile: "Selected file: {filename}",
            noFileSelected: "Please select a certificate file first",
            cancel: "Cancel",
            upload: "Upload",
            uploading: "Uploading...",
          },

          // Certificate info
          addedDate: "Added: {date}",
          deleteConfirm: "Are you sure you want to delete this certificate?",

          // Empty state
          empty: {
            title: "No certificates yet",
            subtitle: "Start uploading company certificates and awards",
            addFirst: "Upload First Certificate",
          },

          // Success and error messages
          addSuccess: "Certificate added successfully",
          deleteSuccess: "Certificate deleted successfully",
          error: "Failed to process certificate: {error}",
          fetchError: "Failed to load certificate data: {error}",
        },
        journey: {
          title: "Company Journey",
          subtitle: "Manage company milestones and achievements",
          addButton: "Add Milestone",

          // Dialog
          addDialog: {
            title: "Add Milestone",
            description: "Add new milestone in company journey",
            editTitle: "Edit Milestone",
            editDescription: "Update company milestone",
          },

          // Form fields
          form: {
            year: "Year",
            yearPlaceholder: "2024",
            title: "Milestone Title",
            titlePlaceholder:
              "e.g. Company Establishment, International Expansion",
            description: "Description",
            descriptionPlaceholder:
              "Complete description of this achievement...",
            cancel: "Cancel",
            save: "Add",
            update: "Update",
            saving: "Saving...",
          },

          // Actions
          deleteConfirm: "Are you sure you want to delete this milestone?",

          // Empty state
          empty: {
            title: "No milestones yet",
            subtitle: "Start documenting company journey and achievements",
            addFirst: "Add First Milestone",
          },

          // Success and error messages
          addSuccess: "Journey added successfully",
          updateSuccess: "Journey updated successfully",
          deleteSuccess: "Milestone deleted successfully",
          error: "Failed to process milestone: {error}",
          fetchError: "Failed to load journey data: {error}",
        },
        team: {
          title: "Team",
          subtitle: "Manage company team members",
          addMember: "Add Team Member",
          editMember: "Edit Team Member",
          addDescription: "Add new team member",
          editDescription: "Update team member information",
          form: {
            name: "Name",
            position: "Position",
            roleCategory: "Role Category",
            specialization: "Specialization",
            image: "Profile Photo",
            socialMedia: "Social Media",
            addSocial: "Add",
            platform: "Platform (LinkedIn, GitHub, etc.)",
            url: "URL",
          },
          deleteConfirm: "Are you sure you want to delete this team member?",
          empty: {
            title: "No team members yet",
            subtitle:
              "Start adding team members to display their profiles on the website",
            addFirst: "Add First Team Member",
          },
          addSuccess: "Team member added successfully",
          updateSuccess: "Team member updated successfully",
          deleteSuccess: "Team member deleted successfully",
        },
        users: {
          title: "Users Management",
          subtitle: "Manage all users in your system",
          addUser: "Add User",
          editUser: "Edit User",
          addDescription: "Create a new user account",
          editDescription: "Update user information",
          form: {
            name: "Name",
            email: "Email",
            role: "Role",
            status: "Status",
            namePlaceholder: "Enter user name",
            emailPlaceholder: "Enter email address",
          },
          list: {
            title: "Users List",
            total: "{count} user(s) found",
            search: "Search users...",
            name: "Name",
            email: "Email",
            role: "Role",
            status: "Status",
            createdAt: "Created At",
            actions: "Actions",
          },
          roles: {
            user: "User",
            admin: "Admin",
            moderator: "Moderator",
          },
          status: {
            active: "Active",
            inactive: "Inactive",
          },
          deleteConfirm: "Are you sure you want to delete this user?",
          addSuccess: "User added successfully",
          updateSuccess: "User updated successfully",
          deleteSuccess: "User deleted successfully",
        },
      },
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
      loadingServices: "Loading services...",
      loadingTestimonials: "Loading testimonials...",
      loadingTeam: "Loading team...",
      loadingPortfolio: "Loading portfolio...",
      loadingContactInfo: "Loading contact information...",
      loadingCompanyInfo: "Loading company information...",
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
        badge: "About",
        transformingTitle: "Transforming Businesses Through",
        morphingTexts: {
          digitalInnovation: "Digital Innovation",
          businessGrowth: "Business Growth",
          technologySolutions: "Technology Solutions",
          futureSuccess: "Future Success",
        },
        stats: {
          projectsCompleted: "Projects Completed",
          projectsCompletedDesc: "Successful digital solutions delivered",
          happyClients: "Happy Clients",
          happyClientsDesc: "Businesses transformed through technology",
          yearsExperience: "Years Experience",
          yearsExperienceDesc: "Years of digital innovation expertise",
          teamMembers: "Team Members",
          teamMembersDesc: "Skilled professionals ready to help",
        },
        values: {
          innovationFirst: {
            title: "Innovation First",
            description:
              "We prioritize cutting-edge solutions that drive meaningful business transformation and competitive advantage.",
          },
          clientCentric: {
            title: "Client-Centric",
            description:
              "Your success is our success. We work closely with clients to understand and exceed their expectations.",
          },
          creativeSolutions: {
            title: "Creative Solutions",
            description:
              "We think outside the box to deliver unique, tailored solutions that address your specific challenges.",
          },
          qualityExcellence: {
            title: "Quality Excellence",
            description:
              "We maintain the highest standards in everything we do, ensuring reliable and scalable solutions.",
          },
        },
        mission: {
          title: "Our Mission",
          fallbackText:
            "To accelerate business growth through innovative digital solutions, ensuring your business not only survives but excels by providing flexible and scalable architectures in an ever-evolving digital world.",
        },
        fallbackDescription:
          "PT. Teknalogi Transformasi Digital is dedicated to helping businesses thrive in the digital age. We provide comprehensive technology solutions that enhance efficiency, drive innovation, and unlock new growth opportunities.",
      },
      testimonials: {
        badge: "Client Testimonials",
        title: "What Our Clients Say",
        subtitle:
          "Don't just take our word for it. Here's what our clients have to say about their experience working with Teknalogi and the results we've delivered together.",
        stats: {
          projectsCompleted: "Projects Completed",
          clientSatisfaction: "Client Satisfaction",
          yearsExperience: "Years Experience",
          supportAvailable: "Support Available",
        },
      },
    },

    // Pages
    pages: {
      about: {
        badge: "About Teknalogi",
        title: "Leading Digital Innovation",
        titleSpan: "Since 2019",
        subtitle:
          "PT. Teknalogi Transformasi Digital has been at the forefront of digital innovation, helping businesses transform and thrive in the digital era through cutting-edge technology solutions.",
        loading: "Loading about information...",
        visionMission: {
          title: "Our Vision & Mission",
          subtitle: "Guiding principles that drive everything we do",
        },
        coreValues: {
          title: "Our Core Values",
          subtitle:
            "The principles that guide our decisions and shape our culture",
        },
        scrollingText:
          "Excellence • Innovation • Partnership • Trust • Growth • Excellence • Innovation • Partnership • Trust • Growth •",
        journey: {
          title: "Our Company Journey",
          subtitle:
            "Looking back at our key achievements and evolution as a digital transformation partner",
        },
        cta: {
          title: "Ready to Start Your Digital Journey?",
          subtitle:
            "Join the growing number of businesses that trust Teknalogi to accelerate their digital transformation.",
          primaryButton: "Get Started Today",
          secondaryButton: "Learn More About Us",
        },
        fallback: {
          visionMission: {
            vision: {
              title: "Vision",
              content:
                "To become the leading digital transformation partner in Indonesia, empowering businesses of all sizes to thrive in the digital era through innovative technology solutions that create sustainable competitive advantages.",
            },
            mission: {
              title: "Mission",
              content:
                "To accelerate business growth through innovative digital solutions, ensuring your business not only survives but excels by providing flexible and scalable architectures in an ever-evolving digital world.",
            },
          },
          coreValues: {
            passionExcellence: {
              title: "Passion for Excellence",
              description:
                "We are driven by an unwavering commitment to delivering exceptional results that exceed expectations.",
            },
            innovationFirst: {
              title: "Innovation First",
              description:
                "We embrace cutting-edge technologies and creative solutions to solve complex business challenges.",
            },
            clientSuccess: {
              title: "Client Success Focus",
              description:
                "Your success is our success. We work as true partners invested in your long-term growth.",
            },
            transparencyTrust: {
              title: "Transparency & Trust",
              description:
                "We believe in open communication and honest relationships built on trust and mutual respect.",
            },
          },
          timeline: {
            2019: {
              title: "Company Founded",
              description:
                "PT Teknalogi was established with a vision to transform businesses through technology.",
              milestone: "Started with 3 founding members",
            },
            2020: {
              title: "First Major Client",
              description:
                "Successfully delivered our first enterprise-level digital transformation project.",
              milestone: "Team grew to 8 professionals",
            },
            2021: {
              title: "Service Expansion",
              description:
                "Expanded our services to include cloud solutions, mobile development, and cybersecurity.",
              milestone: "Serving 25+ clients across Indonesia",
            },
            2022: {
              title: "Technology Partnerships",
              description:
                "Formed strategic partnerships with major technology providers and cloud platforms.",
              milestone: "Achieved AWS Partner status",
            },
            2023: {
              title: "Innovation Focus",
              description:
                "Launched our AI and machine learning practice to help clients leverage advanced analytics.",
              milestone: "Delivered 50+ successful projects",
            },
            2024: {
              title: "Continued Growth",
              description:
                "Expanded our team and capabilities to serve more clients with comprehensive digital solutions.",
              milestone: "15+ expert developers and consultants",
            },
          },
        },
      },
      certificates: {
        badge: "Certifications & Credentials",
        title: "Proven Expertise &",
        titleSpan: "Professional Credibility",
        subtitle:
          "Our team holds industry-leading certifications and credentials, ensuring we deliver solutions using the latest technologies and best practices.",
        loading: "Loading certificates...",
        companyAchievements: "Company Certifications & Partnerships",
        stats: {
          totalCertificates: "Total Certificates",
          activeCertifications: "Active Certifications",
          expertiseAreas: "Expertise Areas",
          teamMembers: "Certified Team Members",
        },
      },
      contact: {
        badge: "Contact Us",
        title: "Ready to Start",
        titleSpan: "Your Project?",
        subtitle:
          "Let's discuss your digital transformation goals. Our expert team is ready to help you navigate the complexities of modern technology and deliver exceptional results.",
        faq: {
          title: "Frequently Asked Questions",
          subtitle: "Quick answers to common questions about our services",
        },
        quickContact: {
          visitOffice: "Visit Our Office",
          jakartaOffice: "Jakarta Office",
          callUs: "Call Us",
          availableDuringHours: "Available during business hours",
          callNow: "Call Now",
          emailUs: "Email Us",
          responseTime: "We typically respond within 24 hours",
          sendEmail: "Send Email",
          businessHours: "Business Hours",
          jakartaTime: "Jakarta Time (GMT+7)",
          viewSchedule: "View Schedule",
          getDirections: "Get Directions",
        },
      },
      expertise: {
        badge: "Our Expertise",
        title: "Technical Excellence",
        titleSpan: "Across Technologies",
        subtitle:
          "Our expert team brings deep technical knowledge across various technologies and platforms to deliver outstanding digital solutions.",
        coreCompetencies: {
          title: "Core Competencies",
          subtitle: "Deep expertise across the technology stack",
        },
        platformPartners: {
          title: "Platform Partners",
          subtitle: "Certified partnerships with leading technology platforms",
        },
        expertiseAreas: {
          fullStackDevelopment: {
            title: "Full-Stack Development",
            description:
              "End-to-end web application development using modern frameworks and best practices.",
            projects: "25+ Projects",
          },
          mobileDevelopment: {
            title: "Mobile Development",
            description:
              "Native and cross-platform mobile applications for iOS and Android platforms.",
            projects: "15+ Apps",
          },
          cloudArchitecture: {
            title: "Cloud Architecture",
            description:
              "Scalable cloud infrastructure design and deployment on major cloud platforms.",
            projects: "20+ Migrations",
          },
          dataEngineering: {
            title: "Data Engineering",
            description:
              "Big data processing, analytics, and business intelligence solutions.",
            projects: "10+ Solutions",
          },
          cybersecurity: {
            title: "Cybersecurity",
            description:
              "Comprehensive security audits, penetration testing, and compliance solutions.",
            projects: "30+ Audits",
          },
          apiDevelopment: {
            title: "API Development",
            description:
              "RESTful and GraphQL API design, development, and documentation.",
            projects: "40+ APIs",
          },
        },
        platforms: {
          aws: {
            name: "Amazon Web Services",
            description: "Certified cloud solutions partner",
            level: "Advanced",
          },
          azure: {
            name: "Microsoft Azure",
            description: "Enterprise cloud deployments",
            level: "Intermediate",
          },
          gcp: {
            name: "Google Cloud Platform",
            description: "Machine learning and analytics",
            level: "Intermediate",
          },
          vercel: {
            name: "Vercel",
            description: "Modern web application hosting",
            level: "Expert",
          },
          mongodb: {
            name: "MongoDB Atlas",
            description: "Database as a service solutions",
            level: "Advanced",
          },
          stripe: {
            name: "Stripe",
            description: "Payment processing integration",
            level: "Expert",
          },
        },
      },
      solutions: {
        badge: "Our Solutions",
        title: "Digital Solutions That",
        titleSpan: "Deliver Results",
        subtitle:
          "Explore our comprehensive portfolio of successful digital transformation projects. Each solution is crafted to meet specific business needs and deliver measurable impact.",
      },
      team: {
        badge: "Our Team",
        title: "Meet Our",
        titleSpan: "Expert Team",
        subtitle:
          "A dedicated team of experienced professionals committed to delivering innovative technology solutions and exceptional customer service.",
        loading: "Loading team...",
        organizationChart: "Organization Chart",
        filterAll: "All",
        stats: {
          totalTeamMembers: "Total Team Members",
          seniorsAndExperts: "Seniors & Experts",
          yearsExperience: "Years Experience",
          projectsDelivered: "Projects Delivered",
        },
        cta: {
          title: "Want to Join Our Team?",
          subtitle:
            "We're always looking for top talent to join our mission of transforming businesses through technology.",
          button: "View Career Opportunities",
        },
        fallbackMember: "Team Member",
      },
    },

    // Footer
    footer: {
      companyDescription:
        "Accelerating Your Business Through Digital Innovation. We design and build custom technology solutions that enhance efficiency and unlock new potential.",
      quickLinks: {
        title: "Quick Links",
        aboutUs: "About Us",
        solutions: "Solutions",
        expertise: "Expertise",
        contact: "Contact",
      },
      services: {
        title: "Our Services",
        webDevelopment: "Web Development",
        mobileApps: "Mobile Apps",
        cloudSolutions: "Cloud Solutions",
        digitalTransformation: "Digital Transformation",
        consulting: "Consulting",
      },
      contactInfo: {
        title: "Contact Info",
        address: "Address",
        phone: "Phone",
        email: "Email",
      },
      newsletter: {
        title: "Stay Updated",
        description:
          "Subscribe to our newsletter for the latest tech insights and company updates.",
        placeholder: "Enter your email",
        subscribe: "Subscribe",
      },
      copyright:
        "© 2025 PT. Teknalogi Transformasi Digital. All rights reserved.",
      links: {
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
      },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.id;
