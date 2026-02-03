import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useState, useEffect } from 'react';
import { UserPlus, CreditCard, Receipt, Wallet, CheckCircle, Upload, ArrowLeft } from 'lucide-react';

export default function Create({ auth, participants, classes }) {
    const { data, setData, post, processing, errors } = useForm({
        participant_id: '',
        class_id: '',
        amount: '',
        payment_method: 'Transfer',
        status: 'success',
        proof: null,
    });

    const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);

    // Separate form for creating participant
    const {
        data: participantData,
        setData: setParticipantData,
        post: postParticipant,
        processing: participantProcessing,
        errors: participantErrors,
        reset: resetParticipant
    } = useForm({
        name: '',
        phone: ''
    });

    // Auto-fill amount when class changes
    const [selectedClassDetails, setSelectedClassDetails] = useState(null);

    useEffect(() => {
        if (data.class_id) {
            const selectedClass = classes.find(c => c.id == data.class_id);
            if (selectedClass) {
                setData('amount', selectedClass.price);
                setSelectedClassDetails(selectedClass);
            }
        } else {
            setSelectedClassDetails(null);
            setData('amount', '');
        }
    }, [data.class_id]);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.transactions.store'));
    };

    const submitParticipant = (e) => {
        e.preventDefault();
        postParticipant(route('admin.participants.store'), {
            onSuccess: () => {
                setIsParticipantModalOpen(false);
                resetParticipant();
                // We rely on Inertia to reload the page and update 'participants' prop
            },
            preserveScroll: true,
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
                <div className="flex items-center space-x-4">
                    <Link href={route('admin.transactions.index')} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Recording New Transaction</h2>
                </div>
            }
        >
            <Head title="Recording New Transaction" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT COLUMN: Input Form */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Card 1: Registration Details */}
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                    <UserPlus className="w-5 h-5 mr-2 text-brand-pink-500" />
                                    Registration Details
                                </h3>

                                <div className="space-y-6">
                                    {/* Participant Select */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <InputLabel htmlFor="participant_id" value="Select Participant" />
                                            <button
                                                type="button"
                                                onClick={() => setIsParticipantModalOpen(true)}
                                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 underline flex items-center"
                                            >
                                                <UserPlus className="w-3 h-3 mr-1" />
                                                New Participant
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <select
                                                id="participant_id"
                                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-xl shadow-sm h-11"
                                                value={data.participant_id}
                                                onChange={(e) => setData('participant_id', e.target.value)}
                                                required
                                            >
                                                <option value="">-- Choose Participant --</option>
                                                {participants.map(p => (
                                                    <option key={p.id} value={p.id}>
                                                        {p.name} ({p.phone_number})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <InputError message={errors.participant_id} className="mt-2" />
                                    </div>

                                    {/* Class Select */}
                                    <div>
                                        <InputLabel htmlFor="class_id" value="Select Class" />
                                        <select
                                            id="class_id"
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-xl shadow-sm h-11"
                                            value={data.class_id}
                                            onChange={(e) => setData('class_id', e.target.value)}
                                            required
                                        >
                                            <option value="">-- Choose Class --</option>
                                            {classes.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.class_id} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Payment Details */}
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2 text-brand-pink-500" />
                                    Payment Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1 md:col-span-2">
                                        <InputLabel htmlFor="amount" value="Amount (IDR)" />
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-gray-500 sm:text-sm">Rp</span>
                                            </div>
                                            <TextInput
                                                id="amount"
                                                type="number"
                                                className="block w-full pl-10 rounded-xl"
                                                value={data.amount}
                                                onChange={(e) => setData('amount', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.amount} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="payment_method" value="Payment Method" />
                                        <select
                                            id="payment_method"
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-xl shadow-sm h-11"
                                            value={data.payment_method}
                                            onChange={(e) => setData('payment_method', e.target.value)}
                                        >
                                            <option value="Transfer">Bank Transfer</option>
                                            <option value="Cash">Cash / On-Site</option>
                                            <option value="QRIS">QRIS</option>
                                        </select>
                                        <InputError message={errors.payment_method} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="status" value="Payment Status" />
                                        <select
                                            id="status"
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-xl shadow-sm h-11"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                        >
                                            <option value="success">Success (Paid)</option>
                                            <option value="pending">Pending</option>
                                            <option value="failed">Failed</option>
                                        </select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <InputLabel htmlFor="proof" value="Payment Proof (Optional)" />
                                        <div className="mt-2 flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                                            <div className="space-y-1 text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                    <label htmlFor="proof" className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="proof"
                                                            name="proof"
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={e => setData('proof', e.target.files[0])}
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG up to 4MB</p>
                                                {data.proof && (
                                                    <p className="text-sm text-green-600 font-semibold mt-2">{data.proof.name}</p>
                                                )}
                                            </div>
                                        </div>
                                        <InputError message={errors.proof} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700 p-6 sticky top-8">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                    <Receipt className="w-5 h-5 mr-2 text-brand-pink-500" />
                                    Transaction Summary
                                </h3>

                                <div className="space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Class:</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100 text-right">{selectedClassDetails ? selectedClassDetails.name : '-'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Price:</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">{selectedClassDetails ? formatPrice(selectedClassDetails.price) : '-'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Quota Remaining:</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">{selectedClassDetails ? selectedClassDetails.quota : '-'}</span>
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                                        <span className="text-gray-900 dark:text-gray-100 font-bold">Total</span>
                                        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{formatPrice(data.amount || 0)}</span>
                                    </div>

                                    <PrimaryButton className="w-full justify-center py-3 text-base mt-4" disabled={processing}>
                                        Confirm & Save
                                    </PrimaryButton>
                                    <Link
                                        href={route('admin.transactions.index')}
                                        className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-3"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            {/* Modal for Creating Participant */}
            <Modal show={isParticipantModalOpen} onClose={() => setIsParticipantModalOpen(false)}>
                <form onSubmit={submitParticipant} className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Add New Participant</h2>
                    <p className="text-sm text-gray-500 mb-6">Create a new participant account instantly. They will be added to the list.</p>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="new_name" value="Full Name" />
                            <TextInput
                                id="new_name"
                                className="mt-1 block w-full"
                                value={participantData.name}
                                onChange={(e) => setParticipantData('name', e.target.value)}
                                required
                                placeholder="e.g. John Doe"
                            />
                            <InputError message={participantErrors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="new_phone" value="Phone Number (Username)" />
                            <TextInput
                                id="new_phone"
                                className="mt-1 block w-full"
                                value={participantData.phone}
                                onChange={(e) => setParticipantData('phone', e.target.value)}
                                required
                                placeholder="e.g. 08123456789"
                            />
                            <InputError message={participantErrors.phone} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsParticipantModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={participantProcessing}>
                            {participantProcessing ? 'Saving...' : 'Create Participant'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

        </AdminLayout>
    );
}
