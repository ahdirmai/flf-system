import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Clock } from 'lucide-react';

export default function Dashboard({ auth, availableClasses, activeRegistrationsCount }) {

    const handleRegister = (classUuid) => {
        if (confirm('Are you sure you want to register for this class?')) {
            router.post(route('registrations.store'), {
                class_id: classUuid
            });
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <UserLayout>
            <Head title="Dashboard" />

            {/* Header user name is handled in Layout sidebar, but HTML has it in main content too. 
                I'll keep it here as per template for Desktop view context.
            */}
            <header className="hidden md:flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 leading-tight font-display">Halo, Kak {auth.user.name.split(' ')[0]}! ✨</h2>
                    <p className="text-slate-500 text-sm font-medium">Siap berkarya hari ini?</p>
                </div>
            </header>

            {/* Categories */}
            <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-6">
                <button className="bg-brand-pink text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-brand whitespace-nowrap transition-transform hover:scale-105">
                    Semua Kelas
                </button>
                <button className="bg-white text-slate-400 px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border border-pink-50 hover:text-brand-pink hover:bg-pink-50 transition-colors">
                    Painting
                </button>
                <button className="bg-white text-slate-400 px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border border-pink-50 hover:text-brand-pink hover:bg-pink-50 transition-colors">
                    Beauty
                </button>
                <button className="bg-white text-slate-400 px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border border-pink-50 hover:text-brand-pink hover:bg-pink-50 transition-colors">
                    Kids
                </button>
            </div>

            {/* Popular Workshops Header */}
            <div className="flex justify-between items-center mb-6 mt-4">
                <h3 className="font-black text-slate-800 text-lg uppercase tracking-wide font-display">Workshop Terpopuler</h3>
                <a href="#" className="text-brand-pink font-bold text-xs uppercase tracking-widest hover:underline">Lihat Semua</a>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {availableClasses.length > 0 ? (
                    availableClasses.map((cls) => (
                        <div key={cls.id} className="bg-white rounded-4xl p-3 shadow-xl shadow-pink-100/50 group hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-300">
                            <div className="relative h-56 w-full overflow-hidden rounded-[28px]">
                                <img
                                    src={cls.thumbnail_url || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'} // Fallback image
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    alt={cls.name}
                                />
                                {cls.quota > 0 && cls.quota <= 5 && (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm text-[10px] font-black text-brand-pink uppercase">
                                        Sisa {cls.quota} Slot
                                    </div>
                                )}
                                {cls.quota === 0 && (
                                    <div className="absolute top-4 left-4 bg-red-500/90 text-white backdrop-blur-md px-3 py-1 rounded-xl shadow-sm text-[10px] font-black uppercase">
                                        Sold Out
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <p className="text-brand-blue font-black text-[10px] uppercase tracking-widest font-display">
                                    General • All Levels
                                </p>
                                <h4 className="text-xl font-extrabold text-slate-900 mt-1 leading-tight font-display min-h-[3.5rem] line-clamp-2">
                                    {cls.name}
                                </h4>

                                <div className="flex items-center mt-4 text-slate-400 text-xs font-semibold">
                                    <Clock className="w-4 h-4 mr-1.5" />
                                    <span>{cls.start_registration ? formatDate(cls.start_registration) : 'Date TBA'}</span>
                                </div>

                                <div className="flex items-center justify-between mt-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-300 uppercase leading-none mb-1">Investasi</p>
                                        <span className="text-2xl font-black text-brand-pink leading-none font-display">
                                            {formatPrice(cls.price)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleRegister(cls.uuid)}
                                        disabled={cls.quota <= 0}
                                        className={`px-8 py-3 rounded-2xl font-black text-sm shadow-brand hover:scale-105 transition-transform ${cls.quota > 0
                                                ? 'bg-brand-pink text-white'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none hover:scale-100'
                                            }`}
                                    >
                                        {cls.quota > 0 ? 'Daftar' : 'Full'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        Belum ada kelas yang tersedia saat ini.
                    </div>
                )}
            </div>

            {/* My Classes CTA */}
            <section className="mt-12 bg-white/50 border-2 border-dashed border-pink-200 rounded-4xl p-8 text-center backdrop-blur-sm">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-brand-pink" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg font-display">Lihat Kelas Kamu</h4>
                <p className="text-sm text-slate-500 mb-6">
                    {activeRegistrationsCount > 0
                        ? `Kamu punya ${activeRegistrationsCount} kelas yang akan datang!`
                        : 'Belum ada kelas yang diikuti. Daftar sekarang!'}
                </p>
                <Link
                    href={route('my-classes')}
                    className="inline-block text-brand-pink font-black text-xs uppercase tracking-widest border-2 border-brand-pink px-8 py-3 rounded-2xl hover:bg-brand-pink hover:text-white transition-all duration-300"
                >
                    Buka Jadwal Saya
                </Link>
            </section>

        </UserLayout>
    );
}
