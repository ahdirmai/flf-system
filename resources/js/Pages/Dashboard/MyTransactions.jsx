import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import { Receipt, AlertCircle, CheckCircle } from 'lucide-react';

export default function MyTransactions({ auth, transactions }) {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    return (
        <UserLayout>
            <Head title="My Transactions" />

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight font-display">My Transactions</h2>
                <Link href={route('dashboard')} className="text-brand-pink font-bold text-xs uppercase tracking-widest hover:underline">
                    Back to Dashboard
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[40px] shadow-xl shadow-pink-100/50 dark:shadow-none overflow-hidden border border-pink-50 dark:border-gray-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-gray-400">
                        <thead className="bg-pink-50/50 dark:bg-pink-900/10 text-brand-pink font-display uppercase text-xs font-black tracking-wider border-b border-pink-50 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Class</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Method</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400 font-medium">
                                        No transaction history found.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((trx) => (
                                    <tr key={trx.id} className="hover:bg-slate-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-gray-200 whitespace-nowrap">
                                            {formatDate(trx.created_at)}
                                        </td>
                                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                                            {trx.class_name}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-gray-200 whitespace-nowrap">
                                            {formatPrice(trx.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-gray-500 whitespace-nowrap">
                                            {trx.payment_method}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest
                                                ${trx.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    trx.status === 'failed' ? 'bg-rose-500/10 text-rose-500' :
                                                        'bg-amber-500/10 text-amber-500'}`}>
                                                {trx.status === 'success' && <CheckCircle className="w-3 h-3 mr-1.5" />}
                                                {trx.status === 'failed' && <AlertCircle className="w-3 h-3 mr-1.5" />}
                                                {trx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={route('my-classes')} className="text-xs font-bold text-brand-pink hover:underline">
                                                View Class
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-slate-400 text-xs font-medium">
                    Questions about billing? Contact support at <a href="#" className="underline">help@flf.fun</a>
                </p>
            </div>

        </UserLayout>
    );
}
