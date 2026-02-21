import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ participants }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingParticipant, setEditingParticipant] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        phone: '',
    });

    const submitAdd = (e) => {
        e.preventDefault();
        post(route('admin.participants.store'), {
            onSuccess: () => {
                closeAddModal();
            },
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(route('admin.participants.update', editingParticipant.id), {
            onSuccess: () => {
                closeEditModal();
            },
        });
    };

    const openAddModal = () => {
        reset();
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        reset();
    };

    const openEditModal = (participant) => {
        setEditingParticipant(participant);
        setData({
            name: participant.name,
            phone: participant.phone_number,
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingParticipant(null);
        reset();
    };

    return (
        <AdminLayout>
            <Head title="Daftar Peserta" />

            {/* Header section matches Dashboard and Classes style */}
            <header className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-gray-100">Kelola Peserta ✨</h2>
                    <p className="mt-1 text-sm font-medium text-slate-400 dark:text-gray-500">Lihat dan tambahkan peserta baru ke dalam sistem.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 rounded-2xl bg-brand-pink px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-100 dark:shadow-pink-900/20 transition-all hover:bg-pink-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Peserta
                    </button>
                </div>
            </header>

            {/* Data Table */}
            <section className="overflow-hidden rounded-3xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-gray-500 bg-slate-50/50 dark:bg-gray-800/50 border-b border-slate-100 dark:border-gray-700">
                                <th className="px-8 py-5 font-bold">Informasi Peserta</th>
                                <th className="px-8 py-5 font-bold">No. WhatsApp</th>
                                <th className="px-8 py-5 font-bold">Bergabung Pada</th>
                                <th className="px-8 py-5 text-center font-bold">Total Kelas</th>
                                <th className="px-8 py-5 text-center font-bold">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-gray-700">
                            {participants.data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-10 text-center text-sm text-slate-500 dark:text-gray-400">
                                        Belum ada peserta yang terdaftar.
                                    </td>
                                </tr>
                            ) : (
                                participants.data.map((participant) => (
                                    <tr key={participant.id} className="group transition-all hover:bg-brand-lightPink/20 dark:hover:bg-gray-700/50">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center">
                                                <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-pink/10 dark:bg-brand-pink/20 text-xs font-bold text-brand-pink uppercase">
                                                    {participant.name.substring(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900 dark:text-gray-100">{participant.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-semibold text-slate-600 dark:text-gray-300">{participant.phone_number}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-medium text-slate-500 dark:text-gray-400">
                                                {new Date(participant.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-gray-700 text-xs font-bold text-slate-600 dark:text-gray-300">
                                                {participant.registrations_count}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-center gap-2 text-slate-400">
                                                <button
                                                    onClick={() => openEditModal(participant)}
                                                    className="rounded-xl p-2 transition-colors hover:bg-amber-50 hover:text-amber-500 dark:hover:bg-amber-500/10 dark:hover:text-amber-400 group relative"
                                                    title="Edit Peserta"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <Link
                                                    href={route('admin.participants.show', participant.id)}
                                                    className="rounded-xl p-2 transition-colors hover:bg-brand-lightPink hover:text-brand-pink dark:hover:bg-brand-pink/10 group relative"
                                                    title="Lihat Detail Peserta"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Pagination Component */}
            {participants.links && participants.links.length > 3 && (
                <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center gap-1 rounded-2xl bg-white dark:bg-gray-800 p-1.5 shadow-sm border border-slate-100 dark:border-gray-700">
                        {participants.links.map((link, index) => {
                            let label = link.label;
                            if (label.includes('&laquo;')) label = '←';
                            if (label.includes('&raquo;')) label = '→';

                            return link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`flex h-9 min-w-[36px] items-center justify-center rounded-xl px-3 text-xs font-bold transition-all ${link.active
                                        ? 'bg-brand-pink text-white shadow-md shadow-pink-100 dark:shadow-pink-900/20'
                                        : 'text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700 hover:text-slate-700 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {label}
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    className="flex h-9 min-w-[36px] items-center justify-center rounded-xl px-3 text-xs font-bold text-slate-300 dark:text-gray-600"
                                >
                                    {label}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Add Participant Modal */}
            <Modal show={isAddModalOpen} onClose={closeAddModal}>
                <div className="p-8">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-6">Tambah Peserta Baru</h3>

                    <form onSubmit={submitAdd} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Nama Lengkap" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoFocus
                                placeholder="Cth: John Doe"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone" value="No. WhatsApp" />
                            <TextInput
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                className="mt-2 block w-full"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                placeholder="Cth: 081234567890"
                            />
                            <InputError message={errors.phone} className="mt-2" />
                            <p className="text-[10px] mt-1 text-slate-400 dark:text-gray-500">Angka ini juga akan digunakan sebagai password default peserta untuk login.</p>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-gray-700">
                            <SecondaryButton onClick={closeAddModal} type="button">
                                Batal
                            </SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                Simpan Peserta
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Edit Participant Modal */}
            <Modal show={isEditModalOpen} onClose={closeEditModal}>
                <div className="p-8">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-6">Edit Peserta</h3>

                    <form onSubmit={submitEdit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="edit_name" value="Nama Lengkap" />
                            <TextInput
                                id="edit_name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="edit_phone" value="No. WhatsApp" />
                            <TextInput
                                id="edit_phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                className="mt-2 block w-full"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                            />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-gray-700">
                            <SecondaryButton onClick={closeEditModal} type="button">
                                Batal
                            </SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                Simpan Perubahan
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AdminLayout>
    );
}
