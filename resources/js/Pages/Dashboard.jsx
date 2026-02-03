import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, availableClasses }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    My Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>

                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Available Classes
                    </h3>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {availableClasses && availableClasses.length > 0 ? (
                            availableClasses.map((cls) => (
                                <div
                                    key={cls.id}
                                    className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
                                >
                                    <div className="p-6">
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {cls.name}
                                        </h4>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            {cls.description}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                                Rp {new Intl.NumberFormat('id-ID').format(cls.price)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Quota: {cls.quota}
                                            </span>
                                        </div>
                                        <div className="mt-6">
                                            <button
                                                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                onClick={() => alert('Registration logic coming in Phase 2')}
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">
                                No classes available at the moment.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
