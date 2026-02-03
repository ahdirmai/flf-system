import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Users, Calendar, DollarSign, Upload, FileSpreadsheet } from 'lucide-react';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ auth, creativeClass, registrations }) {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const submitImport = (e) => {
        e.preventDefault();
        post(route('admin.classes.import', creativeClass.uuid), {
            onSuccess: () => {
                setIsImportModalOpen(false);
                reset();
            },
        });
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
                        <Link href={route('admin.classes.index')} className="text-gray-500 hover:text-gray-700 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            {creativeClass.name}
                        </h2>
                    </div>
                    <button
                        onClick={() => setIsImportModalOpen(true)}
                        className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Import Participants
                    </button>
                </div>
            }
        >
            <Head title={`Class: ${creativeClass.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Class Details Card */}
                    <div className="bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">About this Class</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{creativeClass.description}</p>

                                <div className="mt-6 flex flex-wrap gap-4">
                                    <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                                        {formatPrice(creativeClass.price)}
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                                        Quota: {creativeClass.quota} Remaining
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                                        <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                                        Start: {creativeClass.start_registration ? new Date(creativeClass.start_registration).toLocaleDateString() : 'TBA'}
                                    </div>
                                </div>
                            </div>

                            {creativeClass.thumbnail_url && (
                                <div className="rounded-xl overflow-hidden h-48 md:h-full">
                                    <img src={creativeClass.thumbnail_url} alt="Class Thumbnail" className="w-full h-full object-cover" />
                                </div>
                            )}
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
                                    onChange={e => setData('file', e.target.files[0])}
                                />
                            </label>
                        </div>
                        {data.file && (
                            <p className="mt-2 text-sm text-green-600 dark:text-green-400">Selected: {data.file.name}</p>
                        )}
                        <InputError message={errors.file} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setIsImportModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing || !data.file}>
                            {processing ? 'Importing...' : 'Import'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
