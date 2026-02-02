# Development Plan: Creative Class Management System

Dokumen ini membagi proses pengembangan menjadi 3 fase utama untuk memastikan stabilitas sistem dan kecepatan peluncuran (*Time to Market*).

---

## Phase 1: Core Infrastructure & Authentication (Identity First)
Fokus pada pondasi sistem, skema database, dan logika identitas unik menggunakan nomor HP.

### 1.1 Environment & Base Setup
- Setup Laravel 11 dengan **Laravel Breeze (Inertia + React)**.
- Konfigurasi Database (UUID as Primary Key).
- Instalasi Package Utama:
  - `spatie/laravel-permission` (Role & Permission).
  - `spatie/laravel-medialibrary` (Media Handling).
  - `maatwebsite/excel` (Excel Processing).

### 1.2 Auth & Role Customization
- Modifikasi autentikasi Breeze: Mengganti `email` menjadi `username` (input berupa `phone_number`).
- Setup Seeder untuk Role: `admin` dan `participant`.
- Setup Middleware untuk proteksi route Admin dan User.

### 1.3 Basic CRUD & Profile
- CRUD dasar untuk `classes` (Admin side).
- Page pendaftaran sederhana untuk User.
- Logika **Auto-Create Account**: Sinkronisasi otomatis antara `users` dan `participants` saat pendaftaran baru.

---

## Phase 2: Operations & Management (Operational Excellence)
Fokus pada alur kerja Admin untuk mengelola peserta dan verifikasi pendaftaran.

### 2.1 Management Class & Registrations
- Dashboard Admin untuk memantau sisa kuota kelas.
- Fitur **Import Participant via Excel** pada detail kelas:
  - Implementasi logika `upsert` (cek nomor HP, jika belum ada buat user & participant).
  - Assign otomatis peserta ke kelas terkait.

### 2.2 Payment System (Manual)
- Integrasi **Spatie Media Library** pada form pendaftaran untuk upload bukti transfer.
- Modul Transaksi Admin:
  - View list pendaftaran `pending`.
  - Preview bukti bayar (gambar).
  - Aksi "Verify" untuk mengubah status pembayaran dan pendaftaran secara simultan.

### 2.3 User Dashboard
- Halaman "My Classes" bagi peserta untuk melihat daftar kelas yang diikuti.
- Halaman "Payment Status" bagi peserta untuk melacak verifikasi admin.

---

## Phase 3: Optimization & Scaling (Expansion Ready)
Fokus pada penyempurnaan fitur, performa, dan kesiapan untuk fitur otomatisasi di masa depan.

### 3.1 Advanced Features
- Integrasi **Spatie Media Library Conversions**: Otomatis mengecilkan ukuran gambar bukti bayar untuk menghemat storage.
- Fitur Export data peserta kelas ke Excel/PDF untuk absensi fisik.
- Dashboard Analytics sederhana (Total Revenue per Class, Total Unique Participants).

### 3.2 System Hardening
- Implementasi **Database Transactions** pada semua Service Layer untuk integritas data.
- Refactoring menggunakan **Service-Repository Pattern** sesuai standar `systemdesign.md`.
- Optimasi UI/UX (Loading states, Toast notifications menggunakan Tailwind).

### 3.3 Future Ready (Pre-Midtrans)
- Standarisasi kolom `external_id` pada tabel `payments` agar siap diintegrasikan dengan Midtrans.
- Penyiapan sistem *Observer* atau *Event* saat status pendaftaran berubah (untuk pengiriman notifikasi otomatis di masa depan).