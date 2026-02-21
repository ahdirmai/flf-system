import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Check, X, Eye, DollarSign, Plus } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Index({ auth, payments }) {
    const { post, processing } = useForm();
    const [selectedProof, setSelectedProof] = useState(null);

    const handleVerify = (id, action) => {
        if (confirm(`Are you sure you want to ${action} this transaction?`)) {
            post(route('admin.transactions.verify', { id: id, action: action }), {
                preserveScroll: true,
            });
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        }
    };

    return (
        <AdminLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Transactions
                    </h2>
                    <Link
                        href={route('admin.transactions.create')}
                        className="inline-flex items-center justify-center rounded-xl bg-brand-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-pink-600 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Transaction
                    </Link>
                </div>
            }
        >
            <Head title="Transactions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participant</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proof</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {payments.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                No transactions found.
                                            </td>
                                        </tr>
                                    ) : (
                                        payments.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{payment.created_at}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{payment.participant_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{payment.class_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatPrice(payment.amount)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)} capitalize`}>
                                                        {payment.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 cursor-pointer">
                                                    {payment.proof_url ? (
                                                        <button onClick={() => setSelectedProof(payment.proof_url)} className="flex items-center hover:underline focus:outline-none">
                                                            <Eye size={16} className="mr-1" /> View
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-500 dark:text-gray-400 italic">No Proof</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {payment.status === 'pending' && (
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleVerify(payment.id, 'approve')}
                                                                disabled={processing}
                                                                className="text-white bg-green-500 hover:bg-green-600 p-1.5 rounded-lg transition-colors"
                                                                title="Approve"
                                                            >
                                                                <Check size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleVerify(payment.id, 'reject')}
                                                                disabled={processing}
                                                                className="text-white bg-red-500 hover:bg-red-600 p-1.5 rounded-lg transition-colors"
                                                                title="Reject"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </div>
                                                    )}
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

            <Modal show={!!selectedProof} onClose={() => setSelectedProof(null)}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Payment Proof</h3>
                    <div className="flex justify-center bg-gray-100 dark:bg-gray-900 rounded-lg p-2">
                        <img src={selectedProof} alt="Proof" className="max-h-[80vh] w-auto object-contain rounded" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => setSelectedProof(null)}
                            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
