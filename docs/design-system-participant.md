Design System: Participant Portal (Fun Loving Friends)1. Persona & VibeTarget: Individu kreatif, orang tua, dan komunitas workshop.Vibe: Playful, Energetic, Warm, & Simple.Goal: Memudahkan pendaftaran dan akses jadwal kelas dalam hitungan detik melalui smartphone.2. Palette Warna & TipografiPeserta mendapatkan palet yang lebih vibrant dibandingkan Admin untuk memicu rasa antusias.RoleHex CodeUsagePrimary#FF61D2Tombol utama (Daftar), Akses Navigasi.Secondary#49DEFFStatus "Sudah Bayar", Label kategori kreatif.Surface#FFFFFFCard pendaftaran, background konten.App Bg#FFF5FABackground aplikasi (Soft Pink Tint).3. Adaptive Navigation (Mobile vs Desktop)Untuk kenyamanan akses, kita menggunakan Bottom Navigation Bar pada mobile dan Sidebar pada layar menengah ke atas (Medium Device / MD).A. Mobile (Tab Bar)Position: Fixed di bagian bawah layar.Style: Background putih, Soft Shadow, icon dengan label di bawahnya.Items: Home, My Classes, Notifications, Profile.B. MD/Desktop (Sidebar)Position: Samping kiri.Style: Lebih lebar, menampilkan logo penuh dan navigasi vertikal.Template: Terpisah dari Admin (Admin menggunakan warna gelap/netral, Peserta menggunakan aksen pink/vibrant).4. Component Library (Tailwind Snippets)Floating Action Button (FAB)Gunakan ini di Mobile untuk pendaftaran kelas baru agar mudah dijangkau jempol.HTML<button class="fixed bottom-20 right-6 w-14 h-14 bg-brand-pink rounded-full shadow-brand text-white flex items-center justify-center md:hidden">
    <svg>...</svg>
</button>
Participant CardHTML<div class="bg-white rounded-3xl p-4 shadow-sm border-b-4 border-pink-100">
    <img class="rounded-2xl w-full h-32 object-cover mb-3" src="..." />
    <h4 class="font-bold text-slate-800">Pottery for Kids</h4>
    <p class="text-xs text-brand-pink font-bold">Besok • 10:00 WIB</p>
</div>
5. Implementasi Layout (HTML & Tailwind)Berikut adalah struktur layout yang membedakan navigasi berdasarkan ukuran layar.HTML<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: { 'brand-pink': '#FF61D2', 'brand-blue': '#49DEFF' },
                    borderRadius: { '3xl': '24px' }
                }
            }
        }
    </script>
</head>
<body class="bg-[#FFF5FA] font-['Inter'] pb-24 md:pb-0">

    <aside class="hidden md:flex fixed left-0 inset-y-0 w-64 bg-white border-r border-pink-50 flex flex-col p-6">
        <h1 class="font-['Plus_Jakarta_Sans'] text-2xl font-black text-brand-pink mb-10">FLF.FUN</h1>
        <nav class="space-y-4">
            <a href="#" class="flex items-center space-x-3 text-brand-pink font-bold bg-pink-50 p-4 rounded-2xl"><span>Beranda</span></a>
            <a href="#" class="flex items-center space-x-3 text-slate-400 p-4 font-semibold"><span>Kelas Saya</span></a>
        </nav>
    </aside>

    <nav class="md:hidden fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-pink-100 flex justify-around p-4 z-50 rounded-t-3xl shadow-2xl">
        <a href="#" class="flex flex-col items-center text-brand-pink">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
            <span class="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a href="#" class="flex flex-col items-center text-slate-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor">...</svg>
            <span class="text-[10px] font-bold mt-1">Classes</span>
        </a>
        <a href="#" class="flex flex-col items-center text-slate-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor">...</svg>
            <span class="text-[10px] font-bold mt-1">Profile</span>
        </a>
    </nav>

    <main class="md:ml-64 p-6">
        <header class="mb-8">
            <h2 class="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-slate-800">Halo, Kak Ahdi! ✨</h2>
            <p class="text-slate-500 text-sm">Mau belajar apa hari ini?</p>
        </header>

        <div class="flex space-x-3 overflow-x-auto pb-4 no-scrollbar">
            <button class="bg-brand-pink text-white px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap">Semua</button>
            <button class="bg-white text-slate-400 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-sm">Painting</button>
            <button class="bg-white text-slate-400 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-sm">Ceramic</button>
        </div>

        <div class="grid grid-cols-1 gap-6 mt-4">
            <div class="bg-white rounded-[32px] p-2 shadow-xl shadow-pink-100/50">
                <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80" class="rounded-[28px] h-48 w-full object-cover" />
                <div class="p-4">
                    <span class="bg-blue-50 text-brand-blue text-[10px] font-black px-2 py-1 rounded-lg uppercase">Art & Fun</span>
                    <h3 class="font-bold text-lg text-slate-800 mt-2">Abstract Acrylic Painting</h3>
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-brand-pink font-extrabold text-xl">Rp 150k</span>
                        <button class="bg-brand-pink text-white px-6 py-2 rounded-2xl font-bold text-sm">Daftar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
Key Highlights dari Desain Ini:Mobile-First (Tab Bar): Navigasi di bawah memudahkan jempol pengguna mencapai menu utama tanpa harus meregangkan jari ke atas.Cheerful Visuals: Menggunakan radius yang sangat bulat (rounded-[32px]) dan bayangan lembut berwarna pink (shadow-pink-100) agar terasa lebih ramah.Adaptive Template: Layout akan otomatis berubah menjadi Sidebar saat dibuka di laptop/tablet (MD), sehingga tetap profesional namun berbeda dari tampilan kaku dashboard admin.