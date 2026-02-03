import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Ringkasan Operasional" />

            <header className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Ringkasan Operasional 👋</h2>
                    <p className="mt-1 text-sm font-medium text-slate-400">Pantau performa Creative Class Anda hari ini.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden sm:block">
                        <input type="text" placeholder="Cari pendaftaran..." className="w-64 rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <Link href={route('admin.classes.create')} className="flex items-center gap-2 rounded-2xl bg-brand-pink px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-100 transition-all hover:bg-pink-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Kelas Baru
                    </Link>
                </div>
            </header>

            <section className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-pink/5 transition-transform duration-500 group-hover:scale-150"></div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Peserta</p>
                    <div className="mt-2 flex items-end justify-between">
                        <h3 className="text-3xl font-extrabold text-slate-900">1,240</h3>
                        <span className="rounded-lg bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600">+12% Bulan Ini</span>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-blue/5 transition-transform duration-500 group-hover:scale-150"></div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Kelas Aktif</p>
                    <div className="mt-2 flex items-end justify-between">
                        <h3 className="text-3xl font-extrabold text-slate-900">12</h3>
                        <div className="flex -space-x-2">
                            <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-200"></div>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-300 text-[8px] font-bold">+4</div>
                        </div>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-yellow/5 transition-transform duration-500 group-hover:scale-150"></div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Menunggu ACC</p>
                    <div className="mt-2 flex items-end justify-between">
                        <h3 className="text-3xl font-extrabold text-brand-yellow">28</h3>
                        <button className="text-[10px] font-bold text-slate-400 underline transition-colors hover:text-brand-pink">Lihat Semua</button>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-50 p-6">
                    <div>
                        <h3 className="font-extrabold text-slate-900">Pendaftaran Terbaru</h3>
                        <p className="mt-0.5 text-xs text-slate-400">Daftar pendaftar yang masuk dalam 24 jam terakhir.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </button>
                        <button className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                                <th className="px-8 py-5 font-bold">Informasi Peserta</th>
                                <th className="px-8 py-5 font-bold">Nama Kelas</th>
                                <th className="px-8 py-5 font-bold">Metode Bayar</th>
                                <th className="px-8 py-5 font-bold">Status</th>
                                <th className="px-8 py-5 text-center font-bold">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <tr className="group transition-all hover:bg-brand-lightPink/20">
                                <td className="px-8 py-5">
                                    <div className="flex items-center">
                                        <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-pink/10 text-xs font-bold text-brand-pink">AM</div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Ahdi Mai</div>
                                            <div className="text-[10px] font-medium tracking-wide text-slate-400">081234567890</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="text-xs font-semibold text-slate-600">Perfume Making Class</span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
                                        <span className="text-xs font-medium text-slate-500">Transfer BCA</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="inline-flex rounded-lg bg-yellow-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-brand-yellow">Menunggu ACC</span>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <button className="rounded-xl border border-brand-pink/30 bg-white px-4 py-1.5 text-[11px] font-bold text-brand-pink shadow-sm transition-all hover:bg-brand-pink hover:text-white">Verifikasi</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </AdminLayout>
    );
}
