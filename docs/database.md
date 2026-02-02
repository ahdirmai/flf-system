# Database Documentation: Creative Class Management System

## 1. Entity Relationship Diagram (Conceptual)
Sistem ini menggunakan relasi yang berpusat pada identitas unik nomor HP untuk menghubungkan akun pengguna dengan riwayat pendaftaran kelas.

- **Users** (1:1) **Participants**
- **Participants** (1:M) **Registrations**
- **Classes** (1:M) **Registrations**
- **Registrations** (1:M) **Payments**
- **Models** (1:M) **Spatie Media**

---

## 2. Table Schemas

### A. Users Table
Menyimpan kredensial autentikasi utama menggunakan nomor HP sebagai username.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | Primary Key | |
| `uuid` | UUID | Unique, Indexed | Identifier untuk URL publik. |
| `username` | String | Unique | Diisi dengan `phone_number`. |
| `password` | String | | Default: nomor HP (untuk auto-onboarding). |
| `remember_token` | String | Nullable | |

### B. Participants Table
Profil detail peserta yang terpisah dari tabel user untuk fleksibilitas data profil.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | Primary Key | |
| `uuid` | UUID | Unique | |
| `user_id` | ForeignID | References `users.id` | Link ke akun login. |
| `name` | String | | Nama lengkap peserta. |
| `phone_number` | String | Unique, Indexed | Penanda unik utama sistem. |

### C. Classes Table
Manajemen katalog workshop kreatif.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | Primary Key | |
| `uuid` | UUID | Unique | |
| `name` | String | | Nama Workshop. |
| `slug` | String | Unique | SEO friendly URL. |
| `description` | Text | | Detail kegiatan. |
| `price` | Decimal | 12, 2 | Harga standar kelas. |
| `quota` | Integer | | Kapasitas maksimal peserta. |
| `status` | Enum | Draft, Active, Done, Archive | Status operasional kelas. |
| `start_registration` | DateTime | | |
| `end_registration` | DateTime | | |

### D. Registrations Table
Tabel pivot yang mencatat partisipasi peserta pada kelas tertentu.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | Primary Key | |
| `uuid` | UUID | Unique | |
| `participant_id` | ForeignID | References `participants.id` | |
| `class_id` | ForeignID | References `classes.id` | |
| `status` | Enum | Pending, Confirmed, Canceled | Status pendaftaran peserta. |

### E. Payments Table
Data transaksi keuangan dan integrasi bukti bayar.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | Primary Key | |
| `uuid` | UUID | Unique | |
| `registration_id` | ForeignID | References `registrations.id` | |
| `amount` | Decimal | 12, 2 | Tagihan yang harus dibayar. |
| `paid_amount` | Decimal | 12, 2 | Jumlah yang benar-benar dibayar. |
| `payment_method` | String | | Manual Transfer, Cash, dll. |
| `status` | Enum | Pending, Success, Failed | Status verifikasi admin. |

---

## 3. Spatie Specific Tables (Auto-generated)
* **`roles` & `permissions`**: Digunakan untuk memisahkan akses `admin` dan `participant`.
* **`media`**: Digunakan oleh Spatie Media Library untuk menyimpan referensi file bukti bayar yang terhubung ke tabel `payments`.

---

## 4. Implementation Notes
1.  **UUID Usage**: Gunakan trait `Illuminate\Database\Eloquent\Concerns\HasUuids` pada setiap Model agar UUID terisi otomatis saat `creating`.
2.  **Indexing**: Pastikan `phone_number` dan `uuid` selalu di-index untuk performa pencarian yang cepat.
3.  **Transactions**: Semua proses pendaftaran yang melibatkan `users`, `participants`, dan `registrations` harus dibungkus dalam `DB::transaction()`.