import { Head, Link } from '@inertiajs/react';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';

export default function Welcome({ auth, classes, registeredClassIds }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatShortDate = (dateString) => {
        if (!dateString) return 'TBA';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 selection:bg-brand-pink selection:text-white pb-20">
            <Head title="Welcome to FLF Studio" />

            {/* Navigation Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-brand-pink flex items-center justify-center">
                                <span className="text-white font-black font-display text-lg">FLF</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900 dark:text-white font-display">Studio</span>
                        </div>
                        <nav className="flex gap-4 items-center">
                            {auth.user ? (
                                <Link
                                    href={auth.user.roles?.includes('admin') ? route('admin.dashboard') : route('dashboard')}
                                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-pink dark:hover:text-brand-pink transition-colors px-3 py-2"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-pink transition-colors px-3 py-2"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="text-sm font-semibold bg-brand-pink text-white rounded-full px-5 py-2 hover:bg-pink-600 transition-colors shadow-sm"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=2000&q=80"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-20 dark:opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-gray-50 to-gray-50 dark:from-gray-900/80 dark:via-gray-900 dark:to-gray-900"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-900 dark:text-white">
                    <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight mb-6">
                        Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-pink-500">Creativity</span>
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium">
                        Pelajari skill baru, temukan passionmu, dan bergabunglah dengan komunitas kreatif kami di FLF Studio.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <a href="#classes" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg">
                            Lihat Kelas Tersedia
                        </a>
                    </div>
                </div>
            </div>

            {/* Classes Grid Section */}
            <div id="classes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black font-display text-gray-900 dark:text-white">Kelas Mendatang</h2>
                </div>

                {classes && classes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {classes.map((c) => (
                            <Link key={c.uuid} href={route('class.show', c.slug)} className="group flex flex-col bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-pink-100/50 dark:hover:shadow-pink-900/20 border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1">
                                {/* Card Image */}
                                <div className="relative h-56 w-full overflow-hidden">
                                    <img
                                        src={c.thumbnail_url || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'}
                                        alt={c.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 text-brand-pink font-black px-3 py-1.5 rounded-xl text-sm shadow-sm">
                                            {formatPrice(c.price)}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-md border ${c.quota > 0
                                            ? 'bg-green-500/80 text-white border-green-400/50'
                                            : 'bg-red-500/80 text-white border-red-400/50'
                                            }`}>
                                            {c.quota > 0 ? `Sisa ${c.quota} Kuota` : 'Penuh'}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 font-display">{c.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 flex-grow">
                                        {c.description}
                                    </p>

                                    <div className="space-y-3 mb-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <Calendar className="w-4 h-4 mr-3 text-brand-pink shrink-0" />
                                            <span>
                                                Pendaftaran: {formatShortDate(c.start_registration)} - {formatShortDate(c.end_registration)}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <MapPin className="w-4 h-4 mr-3 text-brand-pink shrink-0" />
                                            <span>FLF Studio, Jakarta</span>
                                        </div>
                                    </div>

                                    {/* Action Button & Status */}
                                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                                        <div className="mb-4 flex items-center justify-between">
                                            <span className="text-lg font-black text-gray-900 dark:text-white">{formatPrice(c.price)}</span>
                                            {registeredClassIds?.includes(c.id) && (
                                                <div className="flex items-center gap-2 py-1 px-3 bg-green-50 dark:bg-green-900/10 rounded-full border border-green-100 dark:border-green-800/20">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span className="text-[10px] font-black uppercase text-green-600 dark:text-green-400 tracking-widest">Terdaftar</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`w-full py-3 px-4 text-sm font-bold text-center rounded-xl flex items-center justify-center transition-all ${registeredClassIds?.includes(c.id)
                                                ? 'bg-slate-900 text-white group-hover:bg-brand-pink'
                                                : 'bg-gray-50 dark:bg-gray-700/50 text-brand-pink group-hover:bg-brand-pink group-hover:text-white'
                                            }`}>
                                            Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Belum ada kelas yang aktif</h3>
                        <p className="text-gray-500 dark:text-gray-400">Nantikan kelas-kelas seru kami selanjutnya! Follow social media FLF Studio untuk update terbaru.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
