import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import InputError from '@/Components/InputError';

export default function MyClasses({ auth, registrations }) {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        proof: null
    });

    const openUploadModal = (id) => {
        setSelectedRegistrationId(id);
        setUploadModalOpen(true);
    };

    const submitProof = (e) => {
        e.preventDefault();
        post(route('registrations.upload-proof', selectedRegistrationId), {
            onSuccess: () => {
                setUploadModalOpen(false);
                reset();
                setSelectedRegistrationId(null);
            }
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <UserLayout>
            <Head title="Kelas Saya" />

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight font-display">Kelas Saya</h2>
                <Link href={route('dashboard')} className="text-brand-pink font-bold text-xs uppercase tracking-widest hover:underline">
                    Cari Kelas Baru
                </Link>
            </div>

            {registrations.length === 0 ? (
                <div className="bg-white/50 dark:bg-gray-800/20 border-2 border-dashed border-pink-200 dark:border-gray-800 rounded-4xl p-12 text-center backdrop-blur-sm">
                    <p className="text-slate-500 dark:text-gray-400 font-medium mb-4 font-display">Belum ada kelas yang diikuti.</p>
                    <Link
                        href={route('dashboard')}
                        className="inline-block bg-brand-pink text-white px-8 py-3 rounded-2xl font-black text-sm shadow-brand hover:scale-105 transition-transform"
                    >
                        Cari Workshop Seru
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {registrations.map(reg => (
                        <div key={reg.id} className="bg-white dark:bg-gray-900 rounded-4xl p-4 shadow-xl shadow-pink-100/50 dark:shadow-none flex flex-col justify-between group hover:shadow-2xl hover:shadow-pink-200/50 dark:hover:shadow-pink-900/10 transition-all duration-300 border border-transparent dark:border-gray-800 dark:hover:border-gray-700">
                            <div>
                                <Link href={route('class.show', reg.class.slug)} className="relative h-48 w-full overflow-hidden rounded-[28px] block mb-5">
                                    <img
                                        src={reg.class.thumbnail_url || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt={reg.class.name}
                                    />
                                    <div className="absolute top-4 right-4 ring-1 ring-white/20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm text-[10px] font-black text-white uppercase tracking-widest">
                                        {reg.id.substring(0, 8)}
                                    </div>
                                </Link>

                                <div className="px-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <Link href={route('class.show', reg.class.slug)} className="group-hover:text-brand-pink transition-colors">
                                            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white leading-tight font-display">{reg.class.name}</h3>
                                        </Link>
                                        <span className="text-sm font-black text-brand-pink font-display shrink-0 ml-4">{formatPrice(reg.class.price)}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-[0.2em] mb-6">
                                        Daftar: {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>

                                    <div className="space-y-3 mb-8 text-sm">
                                        <div className="flex justify-between items-center bg-slate-50 dark:bg-gray-800/50 rounded-2xl p-3.5 border border-slate-100 dark:border-gray-800">
                                            <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Status Registration</span>
                                            <span className={`px-3 py-1 text-[10px] rounded-lg font-black uppercase tracking-wider
                                                ${reg.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                {reg.status}
                                            </span>
                                        </div>

                                        {reg.payment && (
                                            <div className="flex justify-between items-center bg-slate-50 dark:bg-gray-800/50 rounded-2xl p-3.5 border border-slate-100 dark:border-gray-800">
                                                <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Payment Method</span>
                                                <span className={`px-3 py-1 text-[10px] rounded-lg font-black uppercase tracking-wider
                                                    ${reg.payment.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                                                        reg.payment.status === 'failed' ? 'bg-rose-500/10 text-rose-500' :
                                                            'bg-brand-blue/10 text-brand-blue'}`}>
                                                    {reg.payment.status}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto px-2 pb-2">
                                <div className="pt-6 border-t border-dashed border-slate-100 dark:border-gray-800">
                                    {reg.status === 'confirmed' ? (
                                        <div className="bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 rounded-2xl p-4 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Siap Hadir ✨</span>
                                        </div>
                                    ) : (
                                        // Payment logic
                                        (!reg.payment || reg.payment.status === 'pending' || reg.payment.status === 'failed') ? (
                                            <div>
                                                {reg.payment?.proof_url && reg.payment.status !== 'failed' ? (
                                                    <div className="bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 rounded-2xl p-4 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest">
                                                        <Clock className="w-4 h-4 animate-pulse" />
                                                        <span>Menunggu Verifikasi</span>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => openUploadModal(reg.id)}
                                                        className="w-full inline-flex justify-center items-center px-6 py-4 bg-brand-pink text-white rounded-2xl font-black text-xs uppercase tracking-[0.1em] shadow-brand hover:scale-[1.02] transition-all transform active:scale-95"
                                                    >
                                                        <Upload className="w-4 h-4 mr-2" />
                                                        {reg.payment?.status === 'failed' ? 'Upload Ulang Bukti' : 'Upload Bukti Bayar'}
                                                    </button>
                                                )}
                                                {reg.payment?.status === 'failed' && (
                                                    <p className="text-[10px] text-center text-rose-500 mt-4 flex items-center justify-center font-black uppercase tracking-widest">
                                                        <AlertCircle className="w-3 h-3 mr-1.5" />
                                                        Bukti ditolak. Silakan upload ulang.
                                                    </p>
                                                )}
                                            </div>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal show={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
                <form onSubmit={submitProof} className="p-8 text-center relative overflow-hidden bg-white dark:bg-gray-950">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 blur-3xl -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-100/20 blur-3xl -z-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>

                    <div className="w-16 h-16 bg-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-rose-200 dark:shadow-none rotate-3 transform border-4 border-white dark:border-gray-800">
                        <Upload className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 font-display uppercase tracking-tight">Upload Bukti Bayar</h2>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mb-8 font-medium">Pastikan bukti transfer terlihat jelas dan nominal sesuai.</p>

                    <div className="mt-4 mb-8">
                        <div className="relative border-2 border-dashed border-slate-200 dark:border-gray-800 rounded-2xl p-8 hover:bg-rose-50/30 dark:hover:bg-rose-950/10 transition-colors cursor-pointer group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setData('proof', e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            <div className="space-y-2">
                                <span className="block text-sm font-black text-rose-500 uppercase tracking-widest group-hover:underline">Pilih File Bukti</span>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest underline decoration-rose-200 underline-offset-4 decoration-2">JPG, PNG up to 4MB</span>
                                {data.proof && (
                                    <div className="mt-4 flex items-center justify-center gap-2 bg-emerald-500/10 py-2 px-3 rounded-xl border border-emerald-500/20">
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest">{data.proof.name.length > 20 ? data.proof.name.substring(0, 17) + '...' : data.proof.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <InputError message={errors.proof} className="mt-2 text-left" />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => setUploadModalOpen(false)}
                            className="px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-900 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing || !data.proof}
                            className="bg-brand-pink text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-200 dark:shadow-none hover:scale-[1.05] transition-transform disabled:opacity-50 disabled:scale-100"
                        >
                            {processing ? 'Mengupload...' : 'Kirim Bukti ✨'}
                        </button>
                    </div>
                </form>
            </Modal>
        </UserLayout>
    );
}
