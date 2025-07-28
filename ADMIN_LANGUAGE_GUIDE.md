# Admin Panel Language Switcher Guide

## Overview

The admin panel now includes a language switcher that works seamlessly with the backend API to support both Indonesian and English content management.

## Features Implemented

### 1. Language Switcher Component

- **Location**: Top-right corner of the admin panel header
- **Component**: Uses the existing `LanguageSwitcher` component from the landing page
- **Languages**: Indonesian (🇮🇩) and English (🇺🇸)

### 2. Menu Translations

All admin menu items now support both languages:

**Indonesian (Default)**

- Dashboard
- Profil Perusahaan
- Proyek
- Artikel
- Tim
- Layanan
- Testimoni
- Kontak
- FAQ
- Platform
- Sertifikat
- Perjalanan

**English**

- Dashboard
- Company Profile
- Projects
- Articles
- Team
- Services
- Testimonials
- Contact
- FAQs
- Platforms
- Certificates
- Journey

### 3. API Integration

The language switcher automatically:

- Stores language preference in localStorage
- Sends `Accept-Language` header with API requests
- Refreshes the page when language is changed to reload all data

## Technical Implementation

### Files Modified

1. **`/src/app/admin/layout.tsx`**

   - Added `LanguageSwitcher` component to header
   - Integrated `useTranslations` hook
   - Updated menu items to use translations

2. **`/src/lib/translations.ts`**

   - Added `admin` section with menu translations
   - Supports both Indonesian and English

3. **`/src/lib/api.ts`** (Already existed)
   - Automatically sends language preference to backend
   - Uses `Accept-Language` header based on current locale

### Language Context

The admin panel inherits the language context from the main app layout, ensuring:

- Consistent language state across the application
- Automatic persistence of language preference
- Seamless integration with existing translation system

## Backend Integration

### API Headers

When making API requests, the system automatically includes:

```
Accept-Language: id-ID,id;q=0.9  // For Indonesian
Accept-Language: en-US,en;q=0.9  // For English
```

### Expected Backend Response

The backend should respond with appropriate language-specific content based on the `Accept-Language` header.

Example response structure (assuming backend has Indonesian/English columns):

```json
{
  "status": "success",
  "data": {
    "id": "1",
    "title_id": "Judul dalam Bahasa Indonesia",
    "title_en": "Title in English",
    "description_id": "Deskripsi dalam Bahasa Indonesia",
    "description_en": "Description in English"
  }
}
```

## Usage in Admin Forms

When creating or editing content, admin users can:

1. Switch language using the top-right language switcher
2. View/edit content in the selected language
3. The backend will receive the appropriate language context via API headers

## Benefits

1. **Consistent UX**: Same language switcher behavior as the landing page
2. **Automatic Sync**: Language preference syncs across all admin pages
3. **Backend Ready**: API integration ready for multilingual content
4. **Scalable**: Easy to add more languages in the future
5. **User Friendly**: Clear visual indicators for current language

## Future Enhancements

1. **Form Field Labels**: Translate form field labels and placeholders
2. **Validation Messages**: Localize error and success messages
3. **Date/Time Formats**: Format dates according to locale
4. **RTL Support**: Add support for right-to-left languages if needed

## Testing

To test the implementation:

1. Login to admin panel at `/admin`
2. Click the language switcher (globe icon) in top-right corner
3. Select different language and observe:
   - Menu items change language
   - Page refreshes to load new language data
   - Language preference persists on page reload
