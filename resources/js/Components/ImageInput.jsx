import { useRef, useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

export default function ImageInput({ className = '', value, onChange, error, label = "Upload Image" }) {
    const fileInput = useRef(null);
    const [preview, setPreview] = useState(null);

    // Handle initial value or external changes
    useEffect(() => {
        if (value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (typeof value === 'string') {
            setPreview(value);
        } else {
            setPreview(null);
        }
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    const clearImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(null);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    return (
        <div className={`w-full ${className}`}>
            <input
                type="file"
                ref={fileInput}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            <div
                className={`relative flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${error
                        ? 'border-red-300 bg-red-50 hover:bg-red-100 dark:border-red-700 dark:bg-red-900/10'
                        : 'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900'
                    }`}
                onClick={() => fileInput.current?.click()}
            >
                {preview ? (
                    <div className="relative h-full w-full p-2">
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-full max-h-[300px] w-full rounded-lg object-contain"
                        />
                        <button
                            type="button"
                            onClick={clearImage}
                            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition-transform hover:scale-110 hover:bg-red-600 focus:outline-none"
                            title="Remove image"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink-50 text-brand-pink-400 dark:bg-brand-pink-900/20">
                            <Upload size={32} />
                        </div>
                        <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                            {label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 2MB)
                        </p>
                    </div>
                )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}
