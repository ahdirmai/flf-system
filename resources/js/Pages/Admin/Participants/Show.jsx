import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ participant }) {
    // Utility for formatting currency
    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Helper for payment status badge colors
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    // Helper for translating status names
    const getStatusName = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'Lunas';
            case 'pending': return 'Menunggu';
            case 'failed': return 'Gagal';
            default: return status || 'Tidak Ada';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Detail Peserta: ${participant.name}`} />

            {/* Header / Breadcrumb area */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <Link
                        href={route('admin.participants.index')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-pink dark:text-gray-400 dark:hover:text-brand-pink transition-colors mb-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Daftar Peserta
                    </Link>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-gray-100">Detail Peserta</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Participant Info */}
                <div className="lg:col-span-1">
                    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="relative h-32 bg-gradient-to-br from-brand-pink to-brand-lightPink dark:from-pink-900 dark:to-pink-800/50">
                            {/* Decorative background shapes */}
                            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-2xl"></div>
                            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl"></div>
                        </div>
                        <div className="relative px-6 pb-8 pt-0 sm:px-8">
                            {/* Avatar */}
                            <div className="-mt-12 mb-6 flex justify-start">
                                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-slate-100 text-3xl font-extrabold text-brand-pink uppercase shadow-md dark:border-gray-800 dark:bg-gray-700">
                                    {participant.name.substring(0, 2)}
                                </div>
                            </div>

                            <h3 className="text-xl font-extrabold text-slate-900 dark:text-gray-100">{participant.name}</h3>
                            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-pink" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {participant.phone_number}
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="rounded-2xl bg-slate-50/50 p-4 border border-slate-100 dark:bg-gray-700/50 dark:border-gray-600">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">Bergabung</p>
                                    <p className="mt-1 text-sm font-bold text-slate-800 dark:text-gray-200">
                                        {new Date(participant.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-slate-50/50 p-4 border border-slate-100 dark:bg-gray-700/50 dark:border-gray-600">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">Total Kelas</p>
                                    <p className="mt-1 text-sm font-bold text-slate-800 dark:text-gray-200">
                                        {participant.registrations.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Registrations List */}
                <div className="lg:col-span-2">
                    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-5 sm:px-8 dark:border-gray-700 dark:bg-gray-800/50">
                            <h3 className="text-base font-bold text-slate-900 dark:text-gray-100">Riwayat Kelas</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-gray-500 bg-white dark:bg-gray-800 border-b border-slate-100 dark:border-gray-700">
                                        <th className="px-6 py-4 sm:px-8 font-bold">Nama Kelas</th>
                                        <th className="px-6 py-4 sm:px-8 font-bold">Tgl. Daftar</th>
                                        <th className="px-6 py-4 sm:px-8 font-bold">Harga</th>
                                        <th className="px-6 py-4 sm:px-8 font-bold text-center">Status Pembayaran</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-gray-700">
                                    {participant.registrations.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-sm text-slate-500 dark:text-gray-400">
                                                Peserta ini belum mendaftar ke kelas manapun.
                                            </td>
                                        </tr>
                                    ) : (
                                        participant.registrations.map((registration) => (
                                            <tr key={registration.id} className="group transition-all hover:bg-slate-50 dark:hover:bg-gray-700/50">
                                                <td className="px-6 py-4 sm:px-8">
                                                    <Link
                                                        href={route('admin.classes.show', registration.creative_class.slug)}
                                                        className="text-sm font-bold text-slate-900 dark:text-gray-100 hover:text-brand-pink dark:hover:text-brand-pink transition-colors"
                                                    >
                                                        {registration.creative_class.name}
                                                    </Link>
                                                    <p className="mt-0.5 text-xs text-slate-500 dark:text-gray-400">{registration.creative_class.theme}</p>
                                                </td>
                                                <td className="px-6 py-4 sm:px-8 text-sm font-medium text-slate-600 dark:text-gray-300">
                                                    {new Date(registration.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </td>
                                                <td className="px-6 py-4 sm:px-8 text-sm font-bold text-slate-700 dark:text-gray-200">
                                                    {formatPrice(registration.creative_class.price)}
                                                </td>
                                                <td className="px-6 py-4 sm:px-8 text-center">
                                                    <span className={`inline-flex items-center justify-center rounded-xl px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(registration.payment?.status)}`}>
                                                        {getStatusName(registration.payment?.status)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
