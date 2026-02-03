import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';

export default function MyClasses({ auth, registrations }) {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        proof: null
    });

    const openUploadModal = (id) => {
        setSelectedRegistrationId(id);
        console.log(id);
        setUploadModalOpen(true);
    };

    const submitProof = (e) => {
        e.preventDefault();
        post(route('registrations.upload-proof', selectedRegistrationId), {
            onSuccess: () => {
                setUploadModalOpen(false);
                reset();
                setSelectedRegistrationId(null);
            }
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
        <AuthenticatedLayout
            user={auth.user} // Pass user prop if layout needs it, though usually it uses usePage().props.auth.user
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">My Classes</h2>}
        >
            <Head title="My Classes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {registrations.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-500 dark:text-gray-400">You haven't registered for any classes yet.</p>
                                    <Link href={route('dashboard')} className="mt-4 inline-block text-indigo-600 hover:underline dark:text-indigo-400">
                                        Browse Classes
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {registrations.map(reg => (
                                        <div key={reg.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow dark:bg-gray-700/50">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg leading-tight">{reg.class.name}</h3>
                                                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{formatPrice(reg.class.price)}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Registered: {new Date(reg.created_at).toLocaleDateString()}</p>

                                                <div className="space-y-2 mb-6">
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-500 dark:text-gray-400">Status:</span>
                                                        <span className={`px-2 py-0.5 text-xs rounded-full capitalize font-medium
                                                            ${reg.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                            {reg.status}
                                                        </span>
                                                    </div>
                                                    {reg.payment && (
                                                        <div className="flex justify-between items-center text-sm">
                                                            <span className="text-gray-500 dark:text-gray-400">Payment:</span>
                                                            <span className={`px-2 py-0.5 text-xs rounded-full capitalize font-medium
                                                                ${reg.payment.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                                    reg.payment.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                                {reg.payment.status}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                                {reg.status === 'confirmed' ? (
                                                    <div className="text-green-600 dark:text-green-400 flex items-center justify-center gap-2 font-medium">
                                                        <CheckCircle className="w-5 h-5" />
                                                        <span>Ready to attend</span>
                                                    </div>
                                                ) : (
                                                    // Payment logic
                                                    (!reg.payment || reg.payment.status === 'pending' || reg.payment.status === 'failed') ? (
                                                        <div>
                                                            {reg.payment?.proof_url && reg.payment.status !== 'failed' ? (
                                                                <div className="text-yellow-600 dark:text-yellow-400 flex items-center justify-center gap-2 mb-2 font-medium">
                                                                    <Clock className="w-5 h-5" />
                                                                    <span>Verifying Payment...</span>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => openUploadModal(reg.id)}
                                                                    className="w-full inline-flex justify-center items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                                                >
                                                                    <Upload className="w-4 h-4 mr-2" />
                                                                    {reg.payment?.status === 'failed' ? 'Re-upload Proof' : 'Upload Proof'}
                                                                </button>
                                                            )}
                                                            {reg.payment?.status === 'failed' && (
                                                                <p className="text-xs text-center text-red-500 mt-2 flex items-center justify-center">
                                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                                    Proof rejected. Please upload again.
                                                                </p>
                                                            )}
                                                        </div>
                                                    ) : null
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
                <form onSubmit={submitProof} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Upload Payment Proof</h2>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Please upload a clear screenshot or photo of your payment transfer.</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setData('proof', e.target.files[0])}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
                        <InputError message={errors.proof} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setUploadModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing || !data.proof}>
                            {processing ? 'Uploading...' : 'Upload'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
