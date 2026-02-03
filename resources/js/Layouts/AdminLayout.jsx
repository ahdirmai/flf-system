import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children, header }) {
    const user = usePage().props.auth.user;
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-[#FAFAFB] text-slate-800 antialiased font-sans">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-100 bg-white hidden md:flex">
                <div className="p-8">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-pink shadow-lg shadow-pink-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-extrabold leading-none text-slate-900">FLF.<span className="text-brand-pink">OPS</span></h1>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Creative Class</p>
                        </div>
                    </div>
                </div>

                <nav className="custom-scrollbar flex-1 space-y-2 overflow-y-auto px-4">
                    <p className="mb-4 px-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Dashboard Menu</p>

                    <Link href={route('admin.dashboard')}
                        className={`flex items-center space-x-3 rounded-2xl px-4 py-3.5 font-bold transition-all ${url.startsWith('/admin/dashboard')
                            ? 'bg-brand-pink text-white shadow-lg shadow-pink-100'
                            : 'text-slate-500 hover:bg-brand-lightPink hover:text-brand-pink'
                            }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className="text-sm">Ringkasan Utama</span>
                    </Link>

                    <Link href={route('admin.classes.index')}
                        className={`flex items-center space-x-3 rounded-2xl px-4 py-3.5 font-bold transition-all group ${url.startsWith('/admin/classes')
                            ? 'bg-brand-pink text-white shadow-lg shadow-pink-100'
                            : 'text-slate-500 hover:bg-brand-lightPink hover:text-brand-pink'
                            }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${url.startsWith('/admin/classes') ? 'text-white' : 'text-slate-400 group-hover:text-brand-pink'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="text-sm">Kelola Kelas</span>
                    </Link>

                    <a href="#" className="group flex items-center space-x-3 rounded-2xl px-4 py-3.5 font-semibold text-slate-500 transition-all hover:bg-brand-lightPink hover:text-brand-pink">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 transition-colors group-hover:text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm">Daftar Peserta</span>
                    </a>

                    <Link href={route('admin.transactions.index')}
                        className={`flex items-center space-x-3 rounded-2xl px-4 py-3.5 font-bold transition-all group ${url.startsWith('/admin/transactions')
                            ? 'bg-brand-pink text-white shadow-lg shadow-pink-100'
                            : 'text-slate-500 hover:bg-brand-lightPink hover:text-brand-pink'
                            }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${url.startsWith('/admin/transactions') ? 'text-white' : 'text-slate-400 group-hover:text-brand-pink'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <span className="text-sm">Transaksi</span>
                    </Link>
                </nav>

                <div className="mt-auto p-6">
                    <div className="mb-3 flex items-center rounded-3xl border border-slate-100 bg-slate-50 p-4">
                        <img className="h-10 w-10 rounded-2xl object-cover shadow-sm ring-2 ring-white"
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=F472B6&color=fff`} alt="Avatar" />
                        <div className="ml-3 min-w-0">
                            <p className="truncate text-xs font-bold text-slate-900">{user.name}</p>
                            <p className="truncate text-[10px] font-medium text-slate-400">{user.username}</p>
                        </div>
                    </div>
                    <Link href={route('logout')} method="post" as="button" className="group flex w-full items-center justify-center space-x-2 rounded-2xl px-4 py-3 text-xs font-bold text-slate-400 transition-all hover:bg-red-50 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Keluar Sistem</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="min-h-screen p-6 lg:p-10 md:ml-72">
                {header && (
                    <header className="mb-8">
                        {header}
                    </header>
                )}
                {children}
            </main>
        </div>
    );
}
