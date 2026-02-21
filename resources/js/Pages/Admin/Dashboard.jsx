import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ totalParticipants, activeClasses, pendingTransactions, recentTransactions }) {
    return (
        <AdminLayout>
            <Head title="Ringkasan Operasional" />

            <header className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-gray-100">Ringkasan Operasional 👋</h2>
                    <p className="mt-1 text-sm font-medium text-slate-400 dark:text-gray-500">Pantau performa Creative Class Anda hari ini.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden sm:block">
                        <input type="text" placeholder="Cari pendaftaran..." className="w-64 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 pl-10 pr-4 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <Link href={route('admin.classes.create')} className="flex items-center gap-2 rounded-2xl bg-brand-pink px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-100 dark:shadow-pink-900/20 transition-all hover:bg-pink-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Kelas Baru
                    </Link>
                </div>
            </header>

            <section className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group relative overflow-hidden rounded-3xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-pink/5 dark:bg-brand-pink/10 transition-transform duration-500 group-hover:scale-150"></div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">Total Peserta</p>
                    <div className="mt-2 flex items-end justify-between">
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100">{totalParticipants}</h3>
                        {/* Static indicator for visual purposes */}
                        <span className="rounded-lg bg-green-50 dark:bg-green-900/20 px-2 py-1 text-[10px] font-bold text-green-600 dark:text-green-400">Lifetime</span>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-blue/5 dark:bg-brand-blue/10 transition-transform duration-500 group-hover:scale-150"></div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">Kelas Aktif</p>
                    <div className="mt-2 flex items-end justify-between">
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100">{activeClasses}</h3>
                        <div className="flex -space-x-2">
                            <Link href={route('admin.classes.index')} className="text-[10px] font-bold text-slate-400 dark:text-gray-500 underline transition-colors hover:text-brand-pink">Kelola</Link>
                        </div>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-yellow/5 dark:bg-brand-yellow/10 transition-transform duration-500 group-hover:scale-150"></div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">Menunggu ACC</p>
                    <div className="mt-2 flex items-end justify-between">
                        <h3 className="text-3xl font-extrabold text-brand-yellow">{pendingTransactions}</h3>
                        <Link href={route('admin.transactions.index')} className="text-[10px] font-bold text-slate-400 dark:text-gray-500 underline transition-colors hover:text-brand-pink">Lihat Semua</Link>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-gray-700 p-6">
                    <div>
                        <h3 className="font-extrabold text-slate-900 dark:text-gray-100">Pendaftaran Terbaru</h3>
                        <p className="mt-0.5 text-xs text-slate-400 dark:text-gray-500">Daftar pendaftar yang masuk dalam waktu dekat.</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-gray-500 bg-slate-50/50 dark:bg-gray-800/50">
                                <th className="px-8 py-5 font-bold">Informasi Peserta</th>
                                <th className="px-8 py-5 font-bold">Nama Kelas</th>
                                <th className="px-8 py-5 font-bold">Metode Bayar</th>
                                <th className="px-8 py-5 font-bold">Status</th>
                                <th className="px-8 py-5 text-center font-bold">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-gray-700">
                            {recentTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-10 text-center text-sm text-slate-500 dark:text-gray-400">
                                        Belum ada pendaftaran terbaru.
                                    </td>
                                </tr>
                            ) : (
                                recentTransactions.map((payment) => (
                                    <tr key={payment.id} className="group transition-all hover:bg-brand-lightPink/20 dark:hover:bg-gray-700/50">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center">
                                                <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-pink/10 dark:bg-brand-pink/20 text-xs font-bold text-brand-pink uppercase">
                                                    {payment.participant_name.substring(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900 dark:text-gray-100">{payment.participant_name}</div>
                                                    <div className="text-[10px] font-medium tracking-wide text-slate-400 dark:text-gray-500">{payment.participant_phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-semibold text-slate-600 dark:text-gray-300">{payment.class_name}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-gray-500"></div>
                                                <span className="text-xs font-medium text-slate-500 dark:text-gray-400 capitalize">{payment.payment_method.replace('_', ' ')}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${payment.status === 'success' ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : payment.status === 'failed' ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-50 text-brand-yellow dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <Link href={route('admin.transactions.index')} className="rounded-xl border border-brand-pink/30 bg-white dark:bg-gray-800 px-4 py-1.5 text-[11px] font-bold text-brand-pink dark:text-brand-pink-400 shadow-sm transition-all hover:bg-brand-pink hover:text-white dark:hover:bg-brand-pink dark:hover:text-white">
                                                Verifikasi
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </AdminLayout>
    );
}
