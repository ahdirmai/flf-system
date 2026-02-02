# Product Requirements Document (PRD): Creative Class Management System

## 1. Document Information
- **Project Name:** Fun Loving Friends Operational System
- **Status:** Draft / Ready for Development
- **Tech Stack:** Laravel 11, Breeze, React, Inertia, Spatie (Permission & Media Library)
- **Target Platform:** Web (Responsive Mobile-First)

---

## 2. Executive Summary
Sistem ini bertujuan untuk mendigitalisasi proses bisnis "Creative Class" milik UMKM, mulai dari manajemen kelas, pendaftaran peserta berbasis nomor HP, hingga verifikasi pembayaran manual. Sistem harus mampu mengotomatisasi pembuatan akun peserta untuk meningkatkan retensi dan kemudahan akses di masa depan.

---

## 3. User Personas
| Persona | Responsibilities |
| :--- | :--- |
| **Admin** | Mengelola katalog kelas, verifikasi pembayaran, import data peserta via Excel, dan memantau kuota. |
| **Participant** | Mendaftar kelas, melihat riwayat kelas, mengunggah bukti bayar, dan mengelola profil mandiri. |

---

## 4. Functional Requirements

### 4.1. Authentication & Onboarding
- **Requirement 1:** Login menggunakan Nomor HP sebagai identifier unik.
- **Requirement 2:** Auto-create User & Participant: Jika peserta baru mendaftar atau di-import, sistem otomatis membuat akun User dengan role `participant`.
- **Requirement 3:** Default password menggunakan nomor HP untuk akun baru.

### 4.2. Class Management (Admin Only)
- **Requirement 4:** CRUD Class dengan atribut: Nama, Slug (unique), Deskripsi, Kuota, Jadwal, dan Status (Draft, Active, Done, Archive).
- **Requirement 5:** Manajemen kuota real-time yang berkurang otomatis saat pendaftaran dikonfirmasi.

### 4.3. Registration & Payment
- **Requirement 6:** Form pendaftaran mandiri yang responsif.
- **Requirement 7:** Upload bukti bayar manual menggunakan Spatie Media Library.
- **Requirement 8:** Manajemen status pendaftaran (Pending, Confirmed, Canceled).

### 4.4. Bulk Operations (Admin Only)
- **Requirement 9:** Import data peserta per kelas menggunakan file Excel/CSV.
- **Requirement 10:** Logika *upsert* pada import: Update jika peserta sudah ada, Create jika belum ada.

---

## 5. Technical Design Standards



### 5.1. Folder Structure Standard
Mengikuti pola **Service-Repository** untuk memisahkan logika bisnis dari Controller.
- `app/Services`: Logika bisnis (ex: `RegistrationService`).
- `app/Repositories`: Logika akses data (ex: `ParticipantRepository`).
- `resources/js/Pages`: Halaman React (Inertia).

### 5.2. Data Integrity
- Penggunaan **UUID** untuk semua ID yang terekspos di URL.
- **Database Transactions** pada setiap proses pembuatan akun dan pendaftaran simultan.

---

## 6. User Experience (UX) & Design
- **Theme:** Ceria, Playful, dan Creative sesuai brand *Fun Loving Friends*.
- **Color Palette:** Primary Pink (#F472B6), Secondary Blue (#60A5FA), Accent Yellow (#FBBF24).
- **Typography:** Plus Jakarta Sans (Headers) & Inter (Body).

---

## 7. Success Metrics
1. **Efficiency:** Waktu admin menginput data peserta berkurang 70% melalui fitur Import Excel.
2. **User Growth:** Database peserta terorganisir secara otomatis berdasarkan nomor HP unik.
3. **Accuracy:** Minimnya kesalahan input pembayaran karena adanya bukti gambar yang terpusat.

---

## 8. Future Roadmap
- Integrasi Payment Gateway (Midtrans) untuk otomatisasi verifikasi pembayaran.
- Sistem Notifikasi WhatsApp otomatis setelah pendaftaran sukses.
- Fitur Presensi (Check-in) menggunakan QR Code di lokasi kelas.