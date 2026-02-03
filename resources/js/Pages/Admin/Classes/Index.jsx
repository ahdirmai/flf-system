import DangerButton from '@/Components/DangerButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Pencil, Trash2, Plus, Image as ImageIcon, Search, Filter, Eye } from 'lucide-react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, classes }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this class?')) {
            destroy(route('admin.classes.destroy', id));
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
            case 'active':
                return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'draft':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            case 'done':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'archive':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <AdminLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Manage Classes
                    </h2>
                    <Link
                        href={route('admin.classes.create')}
                        className="inline-flex items-center justify-center rounded-xl bg-brand-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-pink-600 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Class
                    </Link>
                </div>
            }
        >
            <Head title="Manage Classes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Stats/Filters Placeholder - Can be expanded later */}
                    {/* <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">...</div> */}

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Class Info
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Price & Quota
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Registration
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                        <th scope="col" className="relative px-6 py-4">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {classes.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-700">
                                                        <ImageIcon className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No classes found</h3>
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating your first class.</p>
                                                    <div className="mt-6">
                                                        <Link
                                                            href={route('admin.classes.create')}
                                                            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                                        >
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Create Class
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        classes.map((c) => (
                                            <tr key={c.id} className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-start space-x-4">
                                                        <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-700">
                                                            {c.thumbnail_url ? (
                                                                <img
                                                                    src={c.thumbnail_url}
                                                                    alt={c.name}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                                    <ImageIcon size={24} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                                {c.name}
                                                            </div>
                                                            <div className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                                                                /{c.slug}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {formatPrice(c.price)}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            Quota: {c.quota} pax
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex flex-col text-xs text-gray-500 dark:text-gray-400">
                                                        {c.start_registration ? (
                                                            <>
                                                                <span>Start: {new Date(c.start_registration).toLocaleDateString()}</span>
                                                                <span>End: {new Date(c.end_registration).toLocaleDateString()}</span>
                                                            </>
                                                        ) : (
                                                            <span className="italic">Not scheduled</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize leading-5 ${getStatusColor(
                                                            c.status
                                                        )}`}
                                                    >
                                                        {c.status}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-3">
                                                        <Link
                                                            href={route('admin.classes.show', c.uuid)}
                                                            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                            title="View Details"
                                                        >
                                                            <Eye size={18} />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.classes.edit', c.uuid)}
                                                            className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={18} />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(c.uuid)}
                                                            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination can go here if paginated */}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
