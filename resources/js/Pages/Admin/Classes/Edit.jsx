import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import ImageInput from '@/Components/ImageInput';
import DateTimeInput from '@/Components/DateTimeInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Edit({ auth, creativeClass }) {

    const { data, setData, post, processing, errors } = useForm({
        name: creativeClass.name,
        description: creativeClass.description,
        price: creativeClass.price,
        quota: creativeClass.quota,
        status: creativeClass.status,
        status: creativeClass.status,
        start_registration: creativeClass.start_registration ? new Date(creativeClass.start_registration) : null,
        end_registration: creativeClass.end_registration ? new Date(creativeClass.end_registration) : null,
        thumbnail: null,
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.classes.update', creativeClass.uuid));
    };

    return (
        <AdminLayout
        >
            <Head title={`${creativeClass.name} - Edit`} />

            <div className="py-12">
                <div className="mx-auto mb-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.classes.index')}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            {creativeClass.name} - Edit
                        </h2>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Class Name" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="Description" />
                                <TextArea
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        min="0"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.price} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="quota" value="Quota" />
                                    <TextInput
                                        id="quota"
                                        type="number"
                                        min="0"
                                        className="mt-1 block w-full"
                                        value={data.quota}
                                        onChange={(e) => setData('quota', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.quota} />
                                </div>
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="status" value="Status" />
                                <SelectInput
                                    id="status"
                                    className="mt-1 block w-full"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="active">Active</option>
                                    <option value="done">Done</option>
                                    <option value="archive">Archive</option>
                                </SelectInput>
                                <InputError className="mt-2" message={errors.status} />
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="start_registration" value="Start Registration" />
                                    <DateTimeInput
                                        value={data.start_registration}
                                        onChange={(date) => setData('start_registration', date)}
                                    />
                                    <InputError className="mt-2" message={errors.start_registration} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="end_registration" value="End Registration" />
                                    <DateTimeInput
                                        value={data.end_registration}
                                        onChange={(date) => setData('end_registration', date)}
                                        minDate={data.start_registration}
                                    />
                                    <InputError className="mt-2" message={errors.end_registration} />
                                </div>
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="thumbnail" value="Thumbnail (Optional)" />
                                <ImageInput
                                    id="thumbnail"
                                    className="mt-1"
                                    value={data.thumbnail || creativeClass.thumbnail_url}
                                    onChange={(file) => setData('thumbnail', file)}
                                    error={errors.thumbnail}
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-end">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Update Class
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
