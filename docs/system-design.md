# System Design: Creative Class Management System (Standardized)

## 1. Project Overview
Sistem operasional untuk **Creative Class** (Fun Loving Friends) yang mengelola siklus hidup pendaftaran peserta secara digital. Sistem ini menggunakan nomor HP sebagai pengidentifikasi unik untuk menyederhanakan akses peserta dan manajemen data admin.

### Core Technology Stack
- **Framework**: Laravel 11 (PHP 8.3).
- **Frontend**: React.js with Inertia.js.
- **Starter Kit**: Laravel Breeze (Inertia/React).
- **Permissions**: Spatie Laravel Permission.
- **Media**: Spatie Laravel Media Library.
- **Excel**: Laravel Excel (Maatwebsite).

---

## 2. Database Schema & Models
Menggunakan UUID sebagai Primary Key untuk keamanan URL dan skalabilitas data.

### Core Tables
- **`users`**: Menyimpan kredensial login dengan `username` berupa `phone_number`.
- **`participants`**: Profil detail peserta (Unique: `phone_number`), berelasi `1:1` ke `users`.
- **`classes`**: Katalog workshop (slug, description, status: Draft/Active/Done, quota).
- **`registrations`**: Tabel pivot utama yang mencatat partisipasi dan status kehadiran.
- **`payments`**: Data transaksi, jumlah bayar, metode pembayaran, dan status (Manual Verification Ready).

---

## 3. Business Logic Pattern
Sistem menerapkan **Service-Repository Pattern** untuk memisahkan logika bisnis dari Controller agar kode lebih mudah diuji dan dikelola.

### A. Auto-Onboarding Logic
Setiap kali data masuk (via Form atau Import), sistem menjalankan `RegistrationService`:
1.  **Identity Check**: Mencari `phone_number` di tabel `participants`.
2.  **Account Creation**: Jika tidak ditemukan, sistem otomatis membuat `User` baru (Default Password: Phone) dan assign role `participant` via Spatie.
3.  **Enrollment**: Menghubungkan ID Participant ke ID Kelas yang dituju.

---

## 4. Standardized Folder Structure

```text
creative-class-app/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/              # CRUD Class, Verification, Import Excel
│   │   │   └── Participant/        # Profile, MyClasses, Registration Form
│   │   └── Middleware/             # HandleInertiaRequests.php (Shared State)
│   ├── Models/                     # HasUuids & InteractsWithMedia Traits
│   ├── Repositories/               # Data Access Logic
│   │   ├── ParticipantRepository.php
│   │   ├── ClassRepository.php
│   │   └── RegistrationRepository.php
│   ├── Services/                   # Business Logic Layer
│   │   ├── RegistrationService.php  # Handle Auto-Account & Enrollment Logic
│   │   ├── PaymentService.php       # Handle Proof Upload & Verification
│   │   └── ExcelService.php         # Handle Participant Import/Export
│   └── Traits/                     # HasUuids.php, Filterable.php
├── database/
│   ├── migrations/                 # Table Schema with UUIDs
│   └── seeders/                    # Spatie Roles (Admin, Participant)
├── resources/
│   └── js/
│       ├── Components/             # Atomic UI Components (Buttons, Inputs)
│       ├── Layouts/                # AppLayout, AdminLayout, GuestLayout
│       ├── Pages/                  # React Page Components
│       └── Utils/                  # FormatCurrency.js, DatePicker.js
├── routes/
│   ├── web.php                     # Participant & Guest Routes
│   └── admin.php                   # Spatie Protected Admin Routes
└── tailwind.config.js              # Brand Specific Configuration
5. Security & Validation
Authentication: Custom Breeze LoginRequest untuk memproses phone_number sebagai identifier utama.

Authorization: Menggunakan Spatie Middleware dan Inertia auth.can untuk proteksi menu di sisi React.

Media Security: Validasi MIME type dan ukuran file (Spatie Media Library) pada unggahan bukti bayar.

Transactional Integrity: Menggunakan DB::transaction() pada Service Layer untuk memastikan pembuatan User dan Participant berjalan atomik.


---