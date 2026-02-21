import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Users, Calendar, DollarSign, Upload, FileSpreadsheet, Plus, Trash2, Clock } from 'lucide-react';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';

export default function Show({ auth, creativeClass, registrations, availableParticipants }) {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const { data: importData, setData: setImportData, post: postImport, processing: importProcessing, errors: importErrors, reset: resetImport } = useForm({
        file: null,
    });

    const { data: addData, setData: setAddData, post: postAdd, processing: addProcessing, errors: addErrors, reset: resetAdd, clearErrors: clearAddErrors } = useForm({
        name: '',
        phone: '',
        participant_id: '',
        is_existing: false, // UI flag, not submitted directly if true and participant_id is set
    });

    const submitImport = (e) => {
        e.preventDefault();
        postImport(route('admin.classes.import', creativeClass.uuid), {
            onSuccess: () => {
                setIsImportModalOpen(false);
                resetImport();
            },
        });
    };

    const submitAdd = (e) => {
        e.preventDefault();
        postAdd(route('admin.classes.participants.add', creativeClass.uuid), {
            onSuccess: () => {
                closeAddModal();
            },
        });
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        resetAdd();
        clearAddErrors();
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.classes.index')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            {creativeClass.name}
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="inline-flex items-center justify-center rounded-xl bg-brand-pink px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Peserta
                        </button>
                        <button
                            onClick={() => setIsImportModalOpen(true)}
                            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Import Participants
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`Class: ${creativeClass.name}`} />

            {/* Hero Image Banner */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
                <img
                    src={creativeClass.thumbnail_url || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80'}
                    alt="Class Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex items-end">
                    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="text-white max-w-3xl">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4
                                    ${creativeClass.status === 'active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                        creativeClass.status === 'draft' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                            creativeClass.status === 'done' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                                'bg-gray-500/20 text-gray-300 border border-gray-500/30'}`}>
                                    {creativeClass.status}
                                </span>
                                <h1 className="text-3xl md:text-5xl font-black mb-3">{creativeClass.name}</h1>
                                <p className="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2">{creativeClass.description}</p>
                            </div>

                            <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 gap-6 shrink-0">
                                <div>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Total Peserta</p>
                                    <p className="text-white text-2xl font-black">{registrations.length}</p>
                                </div>
                                <div className="w-px bg-white/20"></div>
                                <div>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Sisa Kuota</p>
                                    <p className="text-white text-2xl font-black">{creativeClass.quota}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Class Details Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Details Card */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <div className="bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Detail Kelas</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">{creativeClass.description}</p>
                            </div>

                            <div className="bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 mr-4">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Investasi</p>
                                        <p className="font-bold text-gray-900 dark:text-gray-100">{formatPrice(creativeClass.price)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 mr-4">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Sisa Kuota</p>
                                        <p className="font-bold text-gray-900 dark:text-gray-100"><span className="text-lg">{creativeClass.quota}</span> Orang</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            <div className="bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock className="w-5 h-5 text-brand-pink" />
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Jadwal Pelaksanaan</h3>
                                </div>

                                {creativeClass.dates && creativeClass.dates.length > 0 ? (
                                    <div className="relative border-l-2 border-brand-pink/20 ml-2.5 mt-4 space-y-6">
                                        {creativeClass.dates.map((date, idx) => (
                                            <div key={idx} className="relative pl-6">
                                                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white dark:border-gray-800 bg-brand-pink"></div>
                                                <span className="block text-xs font-bold text-brand-pink tracking-wider uppercase mb-0.5">Hari Ke-{idx + 1}</span>
                                                <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                                    {new Date(date).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <span className="block text-xs text-gray-500 mt-0.5 flex items-center">
                                                    Pukul: {new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-dashed border-gray-200 dark:border-gray-600 text-center">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Jadwal belum ditentukan.</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-amber-500" />
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Periode Pendaftaran</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 pl-6">
                                    {creativeClass.start_registration ? new Date(creativeClass.start_registration).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}
                                    <span className="mx-2">-</span>
                                    {creativeClass.end_registration ? new Date(creativeClass.end_registration).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Participants List */}
                    <div className="bg-white shadow-sm sm:rounded-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Registered Participants ({registrations.length})</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered At</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {registrations.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                No participants registered yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        registrations.map(reg => (
                                            <tr key={reg.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {reg.participant.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {reg.participant.phone_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                    ${reg.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                            reg.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                        {reg.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(reg.created_at).toLocaleDateString()} {new Date(reg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isImportModalOpen} onClose={() => setIsImportModalOpen(false)}>
                <form onSubmit={submitImport} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
                        <FileSpreadsheet className="w-6 h-6 mr-2 text-green-600" />
                        Import Participants
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Upload an Excel file (.xlsx, .xls) containing columns: <strong>name</strong>, <strong>phone</strong>.
                        <br />
                        <a href={route('admin.classes.template')} className="text-indigo-600 hover:text-indigo-500 underline">
                            Download Template
                        </a>
                    </p>
                    <div className="mt-6">
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">XLSX or XLS</p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    accept=".xlsx,.xls,.csv"
                                    onChange={e => setImportData('file', e.target.files[0])}
                                />
                            </label>
                        </div>
                        {importData.file && (
                            <p className="mt-2 text-sm text-green-600 dark:text-green-400">Selected: {importData.file.name}</p>
                        )}
                        <InputError message={importErrors.file} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setIsImportModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={importProcessing || !importData.file}>
                            {importProcessing ? 'Importing...' : 'Import'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Add Participant Modal */}
            <Modal show={isAddModalOpen} onClose={closeAddModal}>
                <div className="p-8">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-6">Tambah Peserta ke Kelas Ini</h3>

                    <div className="mb-6 flex gap-4 border-b border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            className={`pb-3 text-sm font-medium transition-colors relative ${!addData.is_existing ? 'text-brand-pink' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                            onClick={() => {
                                setAddData((prev) => ({ ...prev, is_existing: false, participant_id: '' }));
                                clearAddErrors();
                            }}
                        >
                            Peserta Baru
                            {!addData.is_existing && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink rounded-t-full"></div>}
                        </button>
                        <button
                            type="button"
                            className={`pb-3 text-sm font-medium transition-colors relative ${addData.is_existing ? 'text-brand-pink' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                            onClick={() => {
                                setAddData((prev) => ({ ...prev, is_existing: true, name: '', phone: '' }));
                                clearAddErrors();
                            }}
                        >
                            Pilih dari Database
                            {addData.is_existing && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink rounded-t-full"></div>}
                        </button>
                    </div>

                    <form onSubmit={submitAdd} className="space-y-6">
                        {addData.is_existing ? (
                            <div>
                                <InputLabel htmlFor="participant_id" value="Pilih Peserta" />
                                <SelectInput
                                    id="participant_id"
                                    name="participant_id"
                                    value={addData.participant_id}
                                    className="mt-2 block w-full"
                                    onChange={(e) => setAddData('participant_id', e.target.value)}
                                    required={addData.is_existing}
                                >
                                    <option value="">-- Pilih Peserta --</option>
                                    {availableParticipants && availableParticipants.length > 0 ? (
                                        availableParticipants.map((p) => (
                                            <option key={p.id} value={p.id}>{p.name} ({p.phone_number})</option>
                                        ))
                                    ) : (
                                        <option value="" disabled>Tidak ada peserta tersedia</option>
                                    )}
                                </SelectInput>
                                <InputError message={addErrors.participant_id} className="mt-2" />
                            </div>
                        ) : (
                            <>
                                <div>
                                    <InputLabel htmlFor="name" value="Nama Lengkap" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={addData.name}
                                        className="mt-2 block w-full"
                                        onChange={(e) => setAddData('name', e.target.value)}
                                        required={!addData.is_existing}
                                        autoFocus
                                        placeholder="Cth: John Doe"
                                    />
                                    <InputError message={addErrors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="phone" value="No. WhatsApp" />
                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={addData.phone}
                                        className="mt-2 block w-full"
                                        onChange={(e) => setAddData('phone', e.target.value)}
                                        required={!addData.is_existing}
                                        placeholder="Cth: 081234567890"
                                    />
                                    <InputError message={addErrors.phone} className="mt-2" />
                                    <p className="text-[10px] mt-1 text-slate-400 dark:text-gray-500">Angka ini juga akan digunakan sebagai kredensial login jika peserta belum pernah terdaftar sebelumnya.</p>
                                </div>
                            </>
                        )}

                        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-gray-700">
                            <SecondaryButton onClick={closeAddModal} type="button">
                                Batal
                            </SecondaryButton>
                            <PrimaryButton disabled={addProcessing}>
                                Tambahkan Peserta
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AdminLayout>
    );
}
