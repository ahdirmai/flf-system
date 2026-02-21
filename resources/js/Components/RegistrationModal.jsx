import { useForm, router } from '@inertiajs/react';
import { useEffect } from 'react';
import {
    X, Phone, User as UserIcon, Sparkles, ArrowRight
} from 'lucide-react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function RegistrationModal({ show, onClose, auth, classDetails }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        class_id: '',
    });

    // Synchronize class_id whenever classDetails changes
    useEffect(() => {
        if (classDetails?.uuid) {
            setData('class_id', classDetails.uuid);
        }
    }, [classDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('registrations.store'), {
            onSuccess: () => {
                onClose();
                reset('name', 'phone');
            },
        });
    };

    const formatPrice = (price) => {
        if (price === 0) return 'GRATIS';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    if (!classDetails) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="relative overflow-hidden">
                {/* Decorative Background Glows */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 blur-3xl -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-100/20 blur-3xl -z-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>

                <div className="p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors z-20 border border-slate-100 dark:border-gray-700"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-rose-200 dark:shadow-rose-900/20 rotate-3 transform border-4 border-white dark:border-gray-800">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 font-display uppercase tracking-tight">Daftar Workshop</h2>
                        <p className="text-slate-500 dark:text-gray-400 text-sm font-medium">Lengkapi data diri kamu untuk mulai berkarya.</p>
                    </div>

                    {/* Class Summary in Modal */}
                    <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-3xl p-4 mb-8 border border-rose-100 dark:border-rose-900/30 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white dark:border-gray-800 shadow-sm transition-transform hover:scale-105 duration-500 cursor-pointer">
                            <img
                                src={classDetails.thumbnail_url || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=200&q=80'}
                                className="w-full h-full object-cover"
                                alt={classDetails.name}
                            />
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-sm font-black text-slate-800 dark:text-white line-clamp-1">{classDetails.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-rose-500 font-black text-xs">{formatPrice(classDetails.price)}</span>
                                <span className="w-1 h-1 rounded-full bg-rose-300"></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{classDetails.level || 'Beginner'}</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!auth?.user ? (
                            <>
                                <div className="space-y-2">
                                    <InputLabel value="Nama Lengkap" className="text-[10px] font-black uppercase text-rose-400 tracking-widest ml-1" />
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors">
                                            <UserIcon className="w-4.5 h-4.5" />
                                        </div>
                                        <TextInput
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 font-bold text-slate-700 dark:text-white placeholder:text-slate-300 focus:border-rose-400 dark:focus:border-rose-600 transition-all shadow-sm focus:shadow-xl focus:shadow-rose-100/50 dark:focus:shadow-none"
                                            placeholder="Tulis nama lengkap kamu..."
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.name} className="mt-1" />
                                </div>

                                <div className="space-y-2">
                                    <InputLabel value="Nomor WhatsApp" className="text-[10px] font-black uppercase text-rose-400 tracking-widest ml-1" />
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors">
                                            <Phone className="w-4.5 h-4.5" />
                                        </div>
                                        <TextInput
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 font-bold text-slate-700 dark:text-white placeholder:text-slate-300 focus:border-rose-400 dark:focus:border-rose-600 transition-all shadow-sm focus:shadow-xl focus:shadow-rose-100/50 dark:focus:shadow-none"
                                            placeholder="Contoh: 08123456789"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.phone} className="mt-1" />
                                </div>
                            </>
                        ) : (
                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-gray-900 border-2 border-slate-100 dark:border-gray-800 text-center mb-4">
                                <p className="text-sm font-medium text-slate-600 dark:text-gray-300">Kamu akan mendaftar sebagai</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white mt-1 uppercase tracking-tight font-display">{auth.user.name}</p>
                            </div>
                        )}

                        <div className="pt-4 space-y-4">
                            <PrimaryButton
                                className="w-full justify-center py-4.5 rounded-2xl font-black text-base bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-200 dark:shadow-none border-none hover:scale-[1.02] transition-all transform active:scale-95 h-14"
                                disabled={processing}
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                                        Memproses...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {auth?.user ? 'Konfirmasi Pendaftaran' : 'Lanjut ke Pembayaran'}
                                        <ArrowRight className="w-4.5 h-4.5" />
                                    </div>
                                )}
                            </PrimaryButton>

                            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                                Aman & Terenkripsi • FLF Studio
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
