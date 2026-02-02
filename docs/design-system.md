# Design System: Creative Class Management (Fun Loving Friends)

## 1. Brand Essence
Sistem ini mencerminkan identitas **Fun Loving Friends** yang ceria, kreatif, dan inklusif. Desain diprioritaskan untuk kemudahan penggunaan bagi peserta workshop (mobile-first) dan efisiensi admin dalam mengelola operasional.

---

## 2. Visual Style & Color Palette
Mengambil inspirasi dari palet warna pastel dan vibrant yang sering muncul pada poster workshop mereka.

| Role | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary** | `#F472B6` | Brand utama, tombol aksi utama, dan active states. |
| **Secondary** | `#60A5FA` | Informasi pendaftaran, link, dan badge kategori. |
| **Accent** | `#FBBF24` | Status "Pending", highlight promo, dan peringatan. |
| **Success** | `#34D399` | Status "Verified", pembayaran berhasil, dan toast success. |
| **Danger** | `#F87171` | Tombol delete, status "Rejected", dan error messages. |
| **Base Bg** | `#F9FAFB` | Latar belakang aplikasi. |

---

## 3. Typography
Menggunakan font yang bersih dan modern untuk menjaga keterbacaan pada dashboard admin.

- **Headings:** `Plus Jakarta Sans` (Bold/Semi-bold).
- **Body Text:** `Inter` atau `Plus Jakarta Sans` (Regular).
- **Technical/Code:** `JetBrains Mono` (Opsional untuk ID Transaksi/UUID).

---

## 4. Components & UI Patterns

### A. Buttons & Inputs
- **Border Radius:** `12px` (Large) untuk memberikan kesan "soft" dan bersahabat.
- **Inputs:** Menggunakan *floating labels* untuk form pendaftaran agar ringkas di layar mobile.
- **Shadows:** Menggunakan `shadow-sm` untuk card dan `shadow-md` untuk tombol aktif.

### B. Cards (Class & Participant)
- Menampilkan visual sisa kuota (`quota`) dengan progress bar berwarna **Primary**.
- Badge status otomatis berdasarkan `status` kelas (Draft, Active, Done, Archive).

### C. Tables (Admin Side)
- Baris tabel dengan efek `hover:bg-pink-50` untuk memudahkan tracking data participant.
- Aksi CRUD yang mudah dijangkau dengan ikon dari `Lucide React`.

---

## 5. User Experience (UX) Principles

### Identification by Phone Number
- **Auto-recognition:** Ketika user memasukkan nomor HP yang sudah ada di database `participants`, sistem otomatis mengisi (auto-fill) nama mereka.
- **Seamless Registration:** Jika nomor tidak ditemukan, form akan melebar (expand) untuk meminta input nama tanpa berpindah halaman.

### Responsive Design
- Karena pendaftaran sering diakses via link Bio Instagram, halaman pendaftaran harus memiliki performa LCP (Largest Contentful Paint) yang cepat di perangkat mobile.

---

## 6. Implementation Notes (Laravel + Tailwind)
Gunakan konfigurasi Tailwind berikut untuk konsistensi:

```javascript
// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                // Menggunakan Plus Jakarta Sans sebagai font utama sesuai designsystem.md
                sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
                body: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Palet warna spesifik untuk Fun Loving Friends
                brand: {
                    pink: {
                        50: '#fdf2f8',
                        100: '#fce7f3',
                        200: '#fbcfe8',
                        300: '#f9a8d4',
                        400: '#f472b6', // Primary
                        500: '#ec4899',
                        600: '#db2777',
                    },
                    blue: {
                        50: '#eff6ff',
                        400: '#60a5fa', // Secondary
                        600: '#2563eb',
                    },
                    yellow: {
                        400: '#fbbf24', // Accent
                    },
                },
                // Warna status untuk manajemen pendaftaran
                status: {
                    success: '#34d399',
                    pending: '#fbbf24',
                    danger: '#f87171',
                }
            },
            borderRadius: {
                // Border radius yang lebih 'soft' sesuai estetika creative class
                'xl': '12px',
                '2xl': '16px',
            },
            boxShadow: {
                // Soft shadow untuk elemen card
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'brand': '0 4px 14px 0 rgba(244, 114, 182, 0.39)',
            },
        },
    },

    plugins: [
        forms, // Penting untuk styling input form pendaftaran
        typography, // Membantu styling konten deskripsi kelas (Rich Text)
    ],
};

```