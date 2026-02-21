import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Calendar, Clock, MapPin, Tag, Users, ArrowLeft,
    CheckCircle, Upload, Info, Phone, User as UserIcon,
    X, CreditCard, ShieldCheck, Zap, Star, ChevronRight,
    Sparkles, ArrowRight
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import RegistrationModal from '@/Components/RegistrationModal';

export default function Show({ auth, classDetails, userRegistration }) {
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const heroRef = useRef(null);

    const proofForm = useForm({
        proof: null,
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleRegisterClick = () => {
        if (isFull) return;
        setShowGuestModal(true);
    };

    const handleProofSubmit = (e) => {
        e.preventDefault();
        if (userRegistration.payment?.proof_url && !confirm('Update bukti transfer?')) return;
        proofForm.post(route('registrations.upload-proof', userRegistration.uuid), { forceFormData: true });
    };

    const formatPrice = (price) => {
        if (price === 0) return 'GRATIS';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
    };

    const formatDate = (dateString, includeTime = true) => {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        if (includeTime) { options.hour = '2-digit'; options.minute = '2-digit'; }
        return new Intl.DateTimeFormat('id-ID', options).format(date);
    };

    const isFree = classDetails.price === 0;
    const isFull = classDetails.quota <= 0;
    const isConfirmed = userRegistration?.status === 'confirmed';
    const isPending = userRegistration?.status === 'pending';

    return (
        <UserLayout>
            <Head title={classDetails.name} />

            {/* Sticky floating nav on scroll */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-rose-100/50 dark:border-gray-800/50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                        <Link href={auth.user ? route('dashboard') : '/'} className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-rose-500 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                        <span className="font-bold text-sm text-slate-800 dark:text-white truncate max-w-xs">{classDetails.name}</span>
                        <span className="text-sm font-black text-rose-500">{formatPrice(classDetails.price)}</span>
                    </div>
                </div>
            </div>

            {/* Back link */}
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
                <Link href={auth.user ? route('dashboard') : '/'} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-rose-500 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 flex items-center justify-center shadow-sm group-hover:border-rose-200 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" />
                    </div>
                    Kembali ke Beranda
                </Link>
            </div>

            <main className=" mx-auto px-4 sm:px-6 lg:px-8 pb-20">

                {/* ─── HERO ─── */}
                <div ref={heroRef} className="relative rounded-3xl overflow-hidden mb-6 h-64 sm:h-80 md:h-[480px] shadow-2xl shadow-rose-200/30">
                    <img
                        src={classDetails.thumbnail_url || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=80'}
                        className="w-full h-full object-cover scale-105"
                        style={{ transform: 'scale(1.05)' }}
                        alt={classDetails.name}
                    />
                    {/* Layered gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${isFull ? 'bg-slate-900/70 border-slate-700 text-slate-400' : 'bg-rose-500 border-rose-400/50 text-white shadow-lg shadow-rose-500/30'}`}>
                            {isFull ? 'Full Booked' : (
                                <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    {classDetails.quota} Slot Tersisa
                                </>
                            )}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 border border-white/20 text-white backdrop-blur-md">
                            {classDetails.level || 'Beginner'}
                        </span>
                    </div>

                    {/* Hero content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <p className="text-rose-400 text-[11px] font-black uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> Workshop Komunitas
                        </p>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-4 max-w-3xl">
                            {classDetails.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 md:gap-5 text-white/60 text-xs font-semibold">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                                {formatDate(classDetails.start_registration, false)}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                                FLF Studio, Jakarta
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                                E-Certificate
                            </span>
                        </div>
                    </div>
                </div>

                {/* ─── BODY GRID ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6">

                    {/* ── LEFT CONTENT ── */}
                    <div className="lg:col-span-7 xl:col-span-7 space-y-5">

                        {/* Description */}
                        <Card>
                            <SectionHeading icon={Info} eyebrow="Tentang" title="Deskripsi Workshop" />
                            <p className="text-slate-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-[15px]">
                                {classDetails.description || 'Deskripsi belum tersedia.'}
                            </p>
                        </Card>

                        {/* Schedule */}
                        {classDetails.dates?.length > 0 && (
                            <Card>
                                <SectionHeading icon={Clock} eyebrow="Jadwal" title="Sesi Pelaksanaan" />
                                <div className="space-y-3">
                                    {classDetails.dates.map((date, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/50 border border-slate-100 dark:border-gray-700 hover:border-rose-100 dark:hover:border-rose-900/50 transition-colors group">
                                            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center shrink-0 font-black text-sm">
                                                {i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sesi {i + 1}</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-gray-100 truncate">{formatDate(date)}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-400 transition-colors shrink-0" />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Benefits */}
                        <div className="relative">
                            <div className="absolute -inset-x-4 -inset-y-6 bg-rose-50/50 dark:bg-rose-950/20 blur-3xl -z-10 rounded-[40px] pointer-events-none"></div>
                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.25em] mb-4 px-1">Yang Akan Kamu Dapatkan</p>
                            <div className="grid grid-cols-2 gap-3">
                                <BenefitCard icon={Users} title="Komunitas" desc="Networking dengan pegiat seni & industri kreatif." accent="rose" />
                                <BenefitCard icon={Tag} title="Alat & Bahan" desc="Semua material workshop sudah disediakan." accent="rose" />
                                <BenefitCard icon={CheckCircle} title="E-Certificate" desc="Sertifikat digital resmi untuk portofolio." accent="rose" />
                                <BenefitCard icon={Zap} title="Intensive" desc="Belajar fokus dengan bimbingan mentor." accent="rose" />
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT SIDEBAR ── */}
                    <div className="lg:col-span-5 xl:col-span-5">
                        <div className="lg:sticky lg:top-20 space-y-4">

                            {/* Pricing card */}
                            <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-7 shadow-xl shadow-slate-900/20">
                                {/* Decorative blobs */}
                                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-rose-600/20 blur-3xl pointer-events-none" />
                                <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

                                <div className="relative">
                                    <div className="flex items-start justify-between mb-5">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-1">Biaya Pendaftaran</p>
                                            <div className="text-4xl font-black text-white tracking-tight">
                                                {formatPrice(classDetails.price)}
                                            </div>
                                            {!isFree && (
                                                <p className="text-[11px] text-rose-400 font-bold mt-1">Alat & bahan sudah termasuk</p>
                                            )}
                                        </div>
                                        {isFree && (
                                            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">Free</span>
                                        )}
                                    </div>

                                    {/* Slot info */}
                                    <div className="flex items-center gap-2 mb-6 p-3 rounded-2xl bg-white/5 border border-white/8">
                                        <p className="text-[11px] font-bold text-slate-400">
                                            {isFull ? 'Semua slot telah terisi' : <><span className="text-white">{classDetails.quota} slot</span> masih tersedia</>}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    {!userRegistration ? (
                                        <button
                                            onClick={handleRegisterClick}
                                            disabled={isFull}
                                            className={`w-full py-4 rounded-2xl font-black text-base transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${isFull
                                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                                : 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 active:scale-[0.98]'
                                                }`}
                                        >
                                            {isFull ? 'Kuota Penuh' : (
                                                <div className="relative z-10 flex items-center gap-2">
                                                    Daftar Sekarang
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            )}
                                            {!isFull && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                            )}
                                        </button>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Status Pendaftaran</p>
                                                    <p className="text-sm font-black text-white">
                                                        {isConfirmed ? '✓ Terkonfirmasi' : '⏳ Menunggu Konfirmasi'}
                                                    </p>
                                                </div>
                                                {isConfirmed && (
                                                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">Confirmed</span>
                                                )}
                                            </div>

                                            {/* Confirmed Proof Preview (Read-only) */}
                                            {isConfirmed && userRegistration.payment?.proof_url && (
                                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Bukti Pembayaran</p>
                                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                                        <img
                                                            src={userRegistration.payment.proof_url}
                                                            alt="Proof of Payment"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-white">
                                                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                                                Diterima oleh Admin
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment upload section */}
                            {isPending && (
                                <Card className="border-rose-100 dark:border-rose-900/30">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-500">
                                            <CreditCard className="w-4.5 h-4.5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Langkah Selanjutnya</p>
                                            <h5 className="font-black text-slate-800 dark:text-white text-sm">Konfirmasi Pembayaran</h5>
                                        </div>
                                    </div>

                                    {/* Bank info */}
                                    <div className="bg-slate-50 dark:bg-gray-800/50 rounded-2xl p-4 mb-4 border border-slate-100 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Transfer ke (BCA)</p>
                                                <p className="text-xl font-black text-slate-800 dark:text-white tracking-widest">1234 5678 90</p>
                                            </div>
                                            <button
                                                onClick={() => navigator.clipboard?.writeText('1234567890')}
                                                className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/30 px-3 py-2 rounded-xl transition-colors"
                                            >
                                                Salin
                                            </button>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-gray-700 flex justify-between text-xs">
                                            <span className="text-slate-500 font-semibold">Total yang dibayar</span>
                                            <span className="font-black text-slate-800 dark:text-white">{formatPrice(classDetails.price)}</span>
                                        </div>
                                    </div>

                                    {/* Proof upload */}
                                    <form onSubmit={handleProofSubmit} className="space-y-3">
                                        <div className="relative group cursor-pointer">
                                            <input
                                                type="file"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                onChange={e => proofForm.setData('proof', e.target.files[0])}
                                                required
                                            />
                                            <div className={`p-4 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 min-h-[110px] ${proofForm.data.proof || userRegistration.payment?.proof_url ? 'border-emerald-400 bg-emerald-50/40 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-gray-700 hover:border-rose-300 bg-slate-50/50 dark:bg-gray-800/30'}`}>
                                                {proofForm.data.proof ? (
                                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md group/img">
                                                        <img
                                                            src={URL.createObjectURL(proofForm.data.proof)}
                                                            className="w-full h-full object-cover"
                                                            alt="New Proof Preview"
                                                            onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                                        />
                                                        <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                                                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Siap Upload</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : userRegistration.payment?.proof_url ? (
                                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md group/img">
                                                        <img
                                                            src={userRegistration.payment.proof_url}
                                                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                                            alt="Existing Proof"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                            <div className="flex flex-col items-center gap-1">
                                                                <Upload className="w-6 h-6 text-white" />
                                                                <span className="text-[10px] text-white font-black uppercase tracking-widest">Ganti Bukti</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 transition-colors">
                                                            <Upload className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
                                                        </div>
                                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Upload Bukti Transfer</span>
                                                        <span className="text-[10px] text-slate-400">JPG, PNG, PDF</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <PrimaryButton
                                            className="w-full justify-center py-3.5 rounded-2xl font-black text-sm"
                                            disabled={proofForm.processing}
                                        >
                                            {proofForm.processing ? 'Memproses...' : (userRegistration.payment?.proof_url ? 'Update Bukti Bayar' : 'Konfirmasi Pembayaran')}
                                        </PrimaryButton>
                                    </form>
                                </Card>
                            )}

                            {/* Support */}
                            <a
                                href="#"
                                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800/50 hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-all group"
                            >
                                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-500 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors shrink-0">
                                    <Phone className="w-4.5 h-4.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Butuh Bantuan?</p>
                                    <p className="text-sm font-bold text-green-600 dark:text-green-400 group-hover:underline">Chat Admin via WhatsApp</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-400 transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* ─── REGISTRATION MODAL ─── */}
            <RegistrationModal
                show={showGuestModal}
                onClose={() => setShowGuestModal(false)}
                auth={auth}
                classDetails={classDetails}
            />
        </UserLayout>
    );
}

// ─── Sub-components ───

function Card({ children, className = '' }) {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-7 border border-slate-100 dark:border-gray-700 shadow-sm ${className}`}>
            {children}
        </div>
    );
}

function SectionHeading({ icon: Icon, eyebrow, title }) {
    return (
        <div className="flex items-start gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4.5 h-4.5" />
            </div>
            <div>
                <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.25em] mb-0.5">{eyebrow}</p>
                <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight">{title}</h3>
            </div>
        </div>
    );
}

function BenefitCard({ icon: Icon, title, desc, accent }) {
    const accentMap = {
        rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-500',
        amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-500',
        emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500',
        violet: 'bg-violet-50 dark:bg-violet-900/20 text-violet-500',
    };
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-slate-100 dark:border-gray-700 hover:border-rose-200 dark:hover:border-rose-900/50 hover:shadow-lg hover:shadow-rose-500/5 transition-all group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${accentMap[accent]} group-hover:bg-rose-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-3`}>
                <Icon className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-black text-slate-800 dark:text-white text-sm mb-1 group-hover:text-rose-500 transition-colors uppercase tracking-tight">{title}</h4>
            <p className="text-[11px] text-slate-500 dark:text-gray-400 font-medium leading-relaxed">{desc}</p>
        </div>
    );
}