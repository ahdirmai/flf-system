import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useTheme } from '../Contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function GuestLayout({ children }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100'}`}>
            <div className="absolute top-4 right-4">
                <button
                    onClick={toggleTheme}
                    className={`flex items-center justify-center rounded-xl p-2.5 transition-all ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-white text-slate-500 shadow-sm hover:text-slate-700'}`}
                >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
            </div>

            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-soft sm:max-w-md sm:rounded-xl dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
