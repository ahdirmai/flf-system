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
                <h2 className="text-2xl font-black text-slate-800 leading-tight font-display">Kelas Saya</h2>
                <Link href={route('dashboard')} className="text-brand-pink font-bold text-xs uppercase tracking-widest hover:underline">
                    Cari Kelas Baru
                </Link>
            </div>

            {registrations.length === 0 ? (
                <div className="bg-white/50 border-2 border-dashed border-pink-200 rounded-4xl p-12 text-center">
                    <p className="text-slate-500 font-medium mb-4 font-display">Belum ada kelas yang diikuti.</p>
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
                        <div key={reg.id} className="bg-white rounded-4xl p-6 shadow-xl shadow-pink-100/50 flex flex-col justify-between group hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-300">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-extrabold text-xl text-slate-900 leading-tight font-display">{reg.class.name}</h3>
                                    <span className="text-sm font-black text-brand-pink font-display">{formatPrice(reg.class.price)}</span>
                                </div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
                                    Daftar: {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                                        <span className={`px-3 py-1 text-xs rounded-lg font-black uppercase tracking-wider
                                            ${reg.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {reg.status}
                                        </span>
                                    </div>

                                    {reg.payment && (
                                        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                                            <span className="text-xs font-bold text-slate-400 uppercase">Pembayaran</span>
                                            <span className={`px-3 py-1 text-xs rounded-lg font-black uppercase tracking-wider
                                                ${reg.payment.status === 'success' ? 'bg-green-100 text-green-600' :
                                                    reg.payment.status === 'failed' ? 'bg-red-100 text-red-600' :
                                                        'bg-brand-blue/20 text-brand-blue'}`}>
                                                {reg.payment.status}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-dashed border-gray-100">
                                {reg.status === 'confirmed' ? (
                                    <div className="bg-green-50 text-green-600 rounded-2xl p-3 flex items-center justify-center gap-2 font-bold text-sm">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>Siap Hadir!</span>
                                    </div>
                                ) : (
                                    // Payment logic
                                    (!reg.payment || reg.payment.status === 'pending' || reg.payment.status === 'failed') ? (
                                        <div>
                                            {reg.payment?.proof_url && reg.payment.status !== 'failed' ? (
                                                <div className="bg-yellow-50 text-yellow-600 rounded-2xl p-3 flex items-center justify-center gap-2 font-bold text-sm mb-2">
                                                    <Clock className="w-5 h-5" />
                                                    <span>Menunggu Verifikasi</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => openUploadModal(reg.id)}
                                                    className="w-full inline-flex justify-center items-center px-6 py-3 bg-brand-pink text-white rounded-2xl font-black text-sm uppercase tracking-wide shadow-brand hover:scale-105 transition-transform"
                                                >
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    {reg.payment?.status === 'failed' ? 'Upload Ulang Bukti' : 'Upload Bukti Bayar'}
                                                </button>
                                            )}
                                            {reg.payment?.status === 'failed' && (
                                                <p className="text-xs text-center text-red-500 mt-3 flex items-center justify-center font-bold">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    Bukti ditolak. Silakan upload ulang.
                                                </p>
                                            )}
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal show={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
                <form onSubmit={submitProof} className="p-8 text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-brand-pink" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2 font-display">Upload Bukti Bayar</h2>
                    <p className="text-sm text-slate-500 mb-6 font-medium">Pastikan bukti transfer terlihat jelas dan nominal sesuai.</p>

                    <div className="mt-4 mb-8">
                        <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:bg-gray-50 transition-colors cursor-pointer group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setData('proof', e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="space-y-2">
                                <span className="block text-sm font-bold text-brand-pink group-hover:underline">Pilih File</span>
                                <span className="block text-xs text-gray-400">JPG, PNG up to 4MB</span>
                                {data.proof && (
                                    <span className="block text-sm font-bold text-green-500 mt-2">{data.proof.name}</span>
                                )}
                            </div>
                        </div>
                        <InputError message={errors.proof} className="mt-2 text-left" />
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => setUploadModalOpen(false)}
                            className="px-6 py-2.5 rounded-xl font-bold text-slate-400 hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing || !data.proof}
                            className="bg-brand-pink text-white px-8 py-2.5 rounded-xl font-black shadow-brand hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                        >
                            {processing ? 'Mengupload...' : 'Kirim Bukti'}
                        </button>
                    </div>
                </form>
            </Modal>
        </UserLayout>
    );
}
