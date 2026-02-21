import { Link, usePage } from '@inertiajs/react';
import { Home, BookOpen, User, LogOut, Moon, Sun, CreditCard } from 'lucide-react';
import { useTheme } from '../Contexts/ThemeContext';
import Toast from '@/Components/Toast';

export default function UserLayout({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const { theme, toggleTheme } = useTheme();

    const isActive = (routePattern) => {
        return url.startsWith(routePattern);
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-gray-100' : 'bg-brand-light text-slate-800'} font-sans pb-24 md:pb-0`}>
            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex fixed left-0 inset-y-0 w-64 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-brand-pink/20'} border-r flex-col p-6 z-50`}>
                <div className="mb-10 px-2">
                    <h1 className="text-2xl font-black text-brand-pink tracking-tight font-display">
                        FLF.<span className={theme === 'dark' ? 'text-gray-100' : 'text-slate-800'}>FUN</span>
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {auth.user ? (
                        <>
                            <Link
                                href={route('dashboard')}
                                className={`flex items-center space-x-3 p-4 rounded-3xl font-bold transition-all ${url === '/dashboard'
                                    ? 'bg-brand-pink text-white shadow-brand dark:shadow-pink-900/20'
                                    : 'text-slate-400 hover:bg-pink-50 hover:text-brand-pink dark:text-gray-400 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <Home className="w-5 h-5" />
                                <span>Beranda</span>
                            </Link>
                            <Link
                                href={route('my-classes')}
                                className={`flex items-center space-x-3 p-4 rounded-3xl font-bold transition-all ${isActive('/my-classes')
                                    ? 'bg-brand-pink text-white shadow-brand dark:shadow-pink-900/20'
                                    : 'text-slate-400 hover:bg-pink-50 hover:text-brand-pink dark:text-gray-400 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>Kelas Saya</span>
                            </Link>
                            <Link
                                href={route('my-transactions')}
                                className={`flex items-center space-x-3 p-4 rounded-3xl font-bold transition-all ${isActive('/my-transactions')
                                    ? 'bg-brand-pink text-white shadow-brand dark:shadow-pink-900/20'
                                    : 'text-slate-400 hover:bg-pink-50 hover:text-brand-pink dark:text-gray-400 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <CreditCard className="w-5 h-5" />
                                <span>Riwayat Transaksi</span>
                            </Link>
                        </>
                    ) : (
                        <Link
                            href={route('login')}
                            className="flex items-center space-x-3 p-4 rounded-3xl font-bold transition-all text-slate-400 hover:bg-pink-50 hover:text-brand-pink dark:text-gray-400 dark:hover:bg-gray-800"
                        >
                            <User className="w-5 h-5" />
                            <span>Masuk / Daftar</span>
                        </Link>
                    )}
                </nav>

                <div className="mt-auto p-2">
                    <button
                        onClick={toggleTheme}
                        className={`mb-6 flex w-full items-center justify-center space-x-2 rounded-2xl px-4 py-3 text-xs font-bold transition-all ${theme === 'dark' ? 'text-gray-400 bg-gray-800/50 hover:bg-gray-800 hover:text-white' : 'text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'}`}
                    >
                        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>

                    {auth.user ? (
                        <>
                            <div className="flex items-center space-x-3 mb-6">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=FF61D2&color=fff`}
                                    className="w-10 h-10 rounded-2xl dark:ring-1 dark:ring-gray-700"
                                    alt="Profile"
                                />
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-gray-100 truncate max-w-[120px]">{auth.user.name}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-gray-400 font-bold">{auth.user.username}</p>
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
                        </>
                    ) : (
                        <div className="mb-6">
                            <p className="text-[10px] text-slate-400 dark:text-gray-400 font-black uppercase tracking-widest mb-1 text-center italic">Guest Mode</p>
                        </div>
                    )}
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
                {auth.user && (
                    <>
                        <Link
                            href={route('my-classes')}
                            className={`flex flex-col items-center ${isActive('/my-classes') ? 'text-brand-pink' : 'text-slate-300'
                                }`}
                        >
                            <BookOpen className="w-6 h-6" />
                            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider font-display">Classes</span>
                        </Link>
                        <Link
                            href={route('my-transactions')}
                            className={`flex flex-col items-center ${isActive('/my-transactions') ? 'text-brand-pink' : 'text-slate-300'
                                }`}
                        >
                            <CreditCard className="w-6 h-6" />
                            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider font-display">Payments</span>
                        </Link>
                        <Link
                            href={route('profile.edit')}
                            className={`flex flex-col items-center ${isActive('/profile') ? 'text-brand-pink' : 'text-slate-300'
                                }`}
                        >
                            <User className="w-6 h-6" />
                            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider font-display">Profile</span>
                        </Link>
                    </>
                )}
                {!auth.user && (
                    <Link
                        href={route('login')}
                        className="flex flex-col items-center text-slate-300"
                    >
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-bold mt-1 uppercase tracking-wider font-display">Login</span>
                    </Link>
                )}
            </nav>

            {/* Main Content */}
            <main className="md:ml-64 p-6 lg:p-12 max-w-7xl mx-auto">

                {/* Mobile Header (User Icon) */}
                <header className="flex justify-between items-center mb-8 md:hidden">
                    <div>
                        <h1 className="text-2xl font-black text-brand-pink tracking-tight font-display">
                            FLF.<span className="text-slate-800">FUN</span>
                        </h1>
                    </div>
                    <Link
                        href={auth.user ? route('profile.edit') : route('login')}
                        className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-pink-50"
                    >
                        <div className="relative">
                            <User className="w-6 h-6 text-slate-400" />
                            {auth.user && <span className="absolute top-0 right-0 w-2 h-2 bg-brand-pink rounded-full ring-2 ring-white"></span>}
                        </div>
                    </Link>
                </header>

                {children}
            </main>
            <Toast />
        </div>
    );
}
