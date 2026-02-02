# Development Rules: Creative Class Management System

## 1. General Principles
* **Code Consistency**: Semua logika bisnis wajib ditempatkan di dalam `Service Layer`, bukan di Controller atau Model.
* **Naming Convention**: Gunakan *CamelCase* untuk variabel JavaScript (React) dan *snake_case* untuk variabel PHP (Laravel) serta kolom database.
* **Thin Controllers**: Controller hanya bertugas menerima request, memanggil service, dan mengembalikan response (Inertia/JSON).

---

## 2. Backend Rules (Laravel)

### 2.1. Architecture Pattern
* **Service-Repository**: Gunakan `Repositories` untuk pengambilan data (query) dan `Services` untuk memproses logika bisnis (seperti registrasi dan kalkulasi).
* **Database Transactions**: Gunakan `DB::transaction` untuk setiap proses yang melibatkan manipulasi lebih dari satu tabel (contoh: pembuatan `User` dan `Participant` sekaligus).

### 2.2. Models & Migrations
* **UUID Implementation**: Semua Primary Key yang terekspos ke publik wajib menggunakan UUID melalui trait `HasUuids`.
* **Standard Columns**: Setiap tabel utama wajib memiliki kolom `id`, `uuid`, dan `timestamps`.

### 2.3. Packages Standard
* **Roles**: Gunakan Spatie Role & Permission untuk pengecekan akses (Admin vs Participant).
* **Media**: Gunakan Spatie Media Library untuk pengelolaan file bukti pembayaran; jangan simpan file secara manual di folder public.
* **Excel**: Gunakan Laravel Excel untuk semua fitur import/export data peserta.

---

## 3. Frontend Rules (React + Inertia)

### 3.1. Component Structure
* **Atomic Design**: Pisahkan komponen UI kecil (Button, Input) di folder `Components` dan halaman utama di folder `Pages`.
* **Layouts**: Gunakan Persistent Layouts dari Inertia agar state navigasi tidak ter-reset saat berpindah halaman.

### 3.2. Styling & UI
* **Tailwind CSS**: Dilarang menggunakan *inline CSS*; gunakan utility classes dari Tailwind.
* **Brand Colors**: Gunakan palet warna yang sudah didefinisikan di `tailwind.config.js` (contoh: `text-brand-pink-400`).

---

## 4. Git & Workflow Rules
* **Commit Messages**: Gunakan format yang jelas seperti `feat:`, `fix:`, atau `refactor:` (contoh: `feat: add auto-create user logic in RegistrationService`).
* **Validation**: Semua input dari user wajib melalui `FormRequest` Laravel untuk validasi sebelum diproses oleh Service.

---

## 5. Security Standards
* **Mass Assignment**: Selalu definisikan `$fillable` di setiap model untuk mencegah celah keamanan.
* **Sanitization**: Pastikan data nomor HP dibersihkan (hanya angka) sebelum diproses sebagai `username`.
* **Authorization Check**: Selalu gunakan `$this->authorize()` atau middleware Spatie sebelum mengeksekusi aksi sensitif di Controller.