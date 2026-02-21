import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Clock, MapPin, Tag, Users, ArrowLeft } from 'lucide-react';

export default function Show({ auth, classDetails }) {

    const handleRegister = () => {
        if (confirm('Are you sure you want to register for this class?')) {
            router.post(route('registrations.store'), {
                class_id: classDetails.uuid
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

    const formatDate = (dateString, includeTime = true) => {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        if (includeTime) {
            options.hour = '2-digit';
            options.minute = '2-digit';
        }
        return new Intl.DateTimeFormat('id-ID', options).format(date);
    };

    return (
        <UserLayout>
            <Head title={classDetails.name} />

            <div className="mb-6">
                <Link href={route('dashboard')} className="inline-flex items-center text-slate-500 hover:text-brand-pink font-bold text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>
            </div>

            <div className="bg-white rounded-[40px] shadow-xl shadow-pink-100/50 overflow-hidden">
                {/* Hero Image Section */}
                <div className="relative h-64 md:h-96 w-full">
                    <img
                        src={classDetails.thumbnail_url || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80'}
                        className="w-full h-full object-cover"
                        alt={classDetails.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12">
                        <div className="text-white">
                            <span className="inline-block bg-brand-pink text-white px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest mb-3">
                                {classDetails.quota > 0 ? `Open: ${classDetails.quota} Seats Left` : 'Sold Out'}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black font-display leading-tight mb-2">
                                {classDetails.name}
                            </h1>
                            <p className="text-white/80 font-medium text-lg">Workshop Seru Bareng FLF!</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
                    {/* Left Content: Description */}
                    <div className="col-span-2 p-8 md:p-12">
                        <div className="prose prose-pink max-w-none text-slate-600 bg-brand-light/20 p-6 rounded-3xl">
                            <h3 className="text-2xl font-bold text-slate-800 font-display mb-4">About This Workshop</h3>
                            <p className="whitespace-pre-line">{classDetails.description || 'No description available for this class yet.'}</p>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-slate-800 font-display mb-6">What to Expect</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start p-4 rounded-2xl border border-pink-100 bg-white shadow-sm">
                                    <div className="bg-pink-100 p-2 rounded-xl mr-4 text-brand-pink">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Friendly Community</h4>
                                        <p className="text-sm text-slate-500">Meet creative friends!</p>
                                    </div>
                                </div>
                                <div className="flex items-start p-4 rounded-2xl border border-pink-100 bg-white shadow-sm">
                                    <div className="bg-pink-100 p-2 rounded-xl mr-4 text-brand-pink">
                                        <Tag className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">All Materials Provided</h4>
                                        <p className="text-sm text-slate-500">Just bring yourself.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar: Details & Action */}
                    <div className="col-span-1 bg-gray-50 border-l border-pink-100/50 p-8 md:p-12">
                        <div className="sticky top-8 space-y-8">
                            <div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Event Details</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <Calendar className="w-5 h-5 text-brand-pink mr-3 mt-0.5" />
                                        <div>
                                            <span className="block font-bold text-slate-800">Date</span>
                                            <span className="text-sm text-slate-500">
                                                {formatDate(classDetails.start_registration, false)} - {formatDate(classDetails.end_registration, false)}
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <Clock className="w-5 h-5 text-brand-pink mr-3 mt-0.5" />
                                        <div>
                                            <span className="block font-bold text-slate-800">Time</span>
                                            <span className="text-sm text-slate-500">
                                                {classDetails.start_registration ? new Date(classDetails.start_registration).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBA'}
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <MapPin className="w-5 h-5 text-brand-pink mr-3 mt-0.5" />
                                        <div>
                                            <span className="block font-bold text-slate-800">Location</span>
                                            <span className="text-sm text-slate-500">FLF Studio, Jakarta</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-t border-dashed border-gray-200 pt-8">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-slate-500 font-medium">Investasi</span>
                                    <span className="text-3xl font-black text-brand-pink font-display">{formatPrice(classDetails.price)}</span>
                                </div>

                                <button
                                    onClick={handleRegister}
                                    disabled={classDetails.quota <= 0}
                                    className={`w-full py-4 rounded-2xl font-black text-lg shadow-brand transition-all hover:scale-105 active:scale-95 ${classDetails.quota > 0
                                            ? 'bg-brand-pink text-white hover:bg-brand-pink/90'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none hover:scale-100'
                                        }`}
                                >
                                    {classDetails.quota > 0 ? 'Daftar Sekarang' : 'Sold Out'}
                                </button>
                                <p className="text-xs text-center text-slate-400 mt-4 font-medium">Limited slots available. Secure yours!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
