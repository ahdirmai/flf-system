import { Link, usePage } from '@inertiajs/react';
import { Home, BookOpen, User, LogOut } from 'lucide-react';

export default function UserLayout({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();

    const isActive = (routePattern) => {
        return url.startsWith(routePattern);
    };

    return (
        <div className="min-h-screen bg-brand-light font-sans text-slate-800 pb-24 md:pb-0">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 inset-y-0 w-64 bg-white border-r border-brand-pink/20 flex-col p-6 z-50">
                <div className="mb-10 px-2">
                    <h1 className="text-2xl font-black text-brand-pink tracking-tight font-display">
                        FLF.<span className="text-slate-800">FUN</span>
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link
                        href={route('dashboard')}
                        className={`flex items-center space-x-3 p-4 rounded-3xl font-bold transition-all ${url === '/dashboard'
                                ? 'bg-brand-pink text-white shadow-brand'
                                : 'text-slate-400 hover:bg-pink-50 hover:text-brand-pink'
                            }`}
                    >
                        <Home className="w-5 h-5" />
                        <span>Beranda</span>
                    </Link>
                    <Link
                        href={route('my-classes')}
                        className={`flex items-center space-x-3 p-4 rounded-3xl font-bold transition-all ${isActive('/my-classes')
                                ? 'bg-brand-pink text-white shadow-brand'
                                : 'text-slate-400 hover:bg-pink-50 hover:text-brand-pink'
                            }`}
                    >
                        <BookOpen className="w-5 h-5" />
                        <span>Kelas Saya</span>
                    </Link>
                </nav>

                <div className="mt-auto p-2">
                    <div className="flex items-center space-x-3 mb-6">
                        <img
                            src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=FF61D2&color=fff`}
                            className="w-10 h-10 rounded-2xl"
                            alt="Profile"
                        />
                        <div>
                            <p className="text-sm font-bold text-slate-800 truncate max-w-[120px]">{auth.user.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold">{auth.user.username}</p>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full text-left text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Keluar
                    </Link>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-6 inset-x-6 bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-4xl flex justify-around items-center p-4 z-50">
                <Link
                    href={route('dashboard')}
                    className={`flex flex-col items-center ${url === '/dashboard' ? 'text-brand-pink' : 'text-slate-300'
                        }`}
                >
                    <Home className="w-6 h-6" />
                    <span className="text-[10px] font-black mt-1 uppercase tracking-wider font-display">Home</span>
                </Link>
                <Link
                    href={route('my-classes')}
                    className={`flex flex-col items-center ${isActive('/my-classes') ? 'text-brand-pink' : 'text-slate-300'
                        }`}
                >
                    <BookOpen className="w-6 h-6" />
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-wider font-display">Classes</span>
                </Link>
                <Link
                    href={route('profile.edit')}
                    className={`flex flex-col items-center ${isActive('/profile') ? 'text-brand-pink' : 'text-slate-300'
                        }`}
                >
                    <User className="w-6 h-6" />
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-wider font-display">Profile</span>
                </Link>
            </nav>

            {/* Main Content */}
            <main className="md:ml-64 p-6 lg:p-12 max-w-5xl mx-auto">

                {/* Mobile Header (User Icon) */}
                <header className="flex justify-between items-center mb-8 md:hidden">
                    <div>
                        <h1 className="text-2xl font-black text-brand-pink tracking-tight font-display">
                            FLF.<span className="text-slate-800">FUN</span>
                        </h1>
                    </div>
                    <Link href={route('profile.edit')} className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-pink-50">
                        <div className="relative">
                            <User className="w-6 h-6 text-slate-400" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-brand-pink rounded-full ring-2 ring-white"></span>
                        </div>
                    </Link>
                </header>

                {children}
            </main>
        </div>
    );
}
