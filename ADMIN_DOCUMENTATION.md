# Admin Panel Documentation

## Overview

Sistem admin panel telah berhasil ditambahkan ke proyek Teknalogi sebagai **aplikasi terpisah** dari company profile utama. Layout dibedakan untuk memisahkan fungsi landing page dengan admin panel.

### 🎯 **Separation of Concerns**
- **Landing Page**: Halaman utama company profile tetap bersih tanpa button login
- **Admin Panel**: Dapat diakses langsung melalui URL `/login`
- **Layout Terpisah**: Admin pages tidak menggunakan navbar/footer landing page

### 🔐 Authentication
- **Login Page**: `/login` (akses langsung via URL)
- **No Login Button**: Tidak ada button login di landing page navbar
- **Credentials**: 
  - Email: `admin@teknalogi.com`
  - Password: `admin123`

### 🎛️ Admin Dashboard
- **Dashboard**: `/admin/dashboard`
  - Statistics overview
  - Recent activities
  - Quick actions

### 👥 User Management
- **Users Page**: `/admin/users`
  - View all users
  - Add new users
  - Edit existing users
  - Delete users
  - Search functionality

### 📝 Content Management
- **Posts Page**: `/admin/posts`
  - View all blog posts
  - Create new posts
  - Edit existing posts
  - Delete posts
  - Search and filter

### ⚙️ Settings
- **Settings Page**: `/admin/settings`
  - General settings
  - Security configuration
  - Notification preferences
  - Appearance customization

## Features

### ✨ UI Components Used
- Responsive design with mobile-first approach
- Dark/Light theme support (configured in settings)
- Modern UI components using Tailwind CSS
- Smooth animations with Framer Motion
- Icons from Lucide React

### 🔒 Security Features
- Route protection using Next.js middleware
- Session-based authentication
- Logout functionality with cleanup
- Form validation

### 📱 Responsive Design
- Mobile-responsive sidebar
- Collapsible navigation
- Touch-friendly buttons and forms
- Optimized for all screen sizes

## File Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx              # Login page
│   └── admin/
│       ├── layout.tsx            # Admin layout with sidebar
│       ├── dashboard/
│       │   └── page.tsx          # Dashboard page
│       ├── users/
│       │   └── page.tsx          # Users CRUD page
│       ├── posts/
│       │   └── page.tsx          # Posts CRUD page
│       └── settings/
│           └── page.tsx          # Settings page
├── components/
│   └── ui/
│       ├── input.tsx             # Input component
│       ├── card.tsx              # Card component
│       └── table.tsx             # Table component
└── middleware.ts                 # Route protection middleware
```

## How to Access

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open browser** and go to: `http://localhost:3000`

3. **Navigate to login**: Click "Login" button in navbar or go to `/login`

4. **Login with demo credentials**:
   - Email: `admin@teknalogi.com`
   - Password: `admin123`

5. **Explore admin features**:
   - Dashboard: Overview and statistics
   - Users: Manage user accounts
   - Posts: Manage blog content
   - Settings: Configure system settings

## Data Management

Currently, the system uses **local state management** for demonstration purposes. In a production environment, you would typically integrate with:

- **Database**: PostgreSQL, MySQL, or MongoDB
- **API Routes**: Next.js API routes or external API
- **State Management**: Redux, Zustand, or React Query
- **Authentication**: NextAuth.js, Auth0, or custom JWT

## Customization

### Adding New Pages
1. Create new page in `/src/app/admin/[page-name]/page.tsx`
2. Add menu item to `/src/app/admin/layout.tsx`
3. Update navigation array with new route

### Styling
- All components use Tailwind CSS
- Dark mode support built-in
- Customize colors in tailwind config
- Components follow shadcn/ui patterns

### Adding New CRUD Operations
1. Copy existing CRUD page as template
2. Update data interface/type
3. Modify form fields and table columns
4. Add search and filter functionality

## Production Deployment

Before deploying to production:

1. **Replace demo authentication** with real auth system
2. **Connect to actual database** for data persistence
3. **Add input validation** and error handling
4. **Implement proper user roles** and permissions
5. **Add API integration** for backend services
6. **Configure environment variables** for secrets

## Support

For any questions or issues with the admin panel, please refer to:
- Next.js documentation
- Tailwind CSS documentation
- Component library documentation (shadcn/ui)

---

**Note**: This is a demo implementation. Please implement proper security measures and data validation for production use.
