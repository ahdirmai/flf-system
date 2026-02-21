import { usePage } from '@inertiajs/react';
import { useTheme } from '../Contexts/ThemeContext';
import AdminSidebar from '@/Components/AdminSidebar';
import Toast from '@/Components/Toast';

export default function AdminLayout({ children, header }) {
    const user = usePage().props.auth.user;
    const { url } = usePage();
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-gray-100' : 'bg-[#FAFAFB] text-slate-800'} antialiased font-sans`}>
            {/* Sidebar */}
            <AdminSidebar user={user} url={url} />

            {/* Main Content */}
            <main className="min-h-screen p-6 lg:p-10 md:ml-72">
                {header && (
                    <header className="mb-8">
                        {header}
                    </header>
                )}
                {children}
            </main>
            <Toast />
        </div>
    );
}
