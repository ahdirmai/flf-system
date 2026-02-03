export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-xl border border-transparent bg-brand-pink-400 px-4 py-2 text-xs font-semibold text-white transition duration-150 ease-in-out hover:bg-brand-pink-500 focus:bg-brand-pink-500 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:ring-offset-2 active:bg-brand-pink-500 dark:bg-brand-pink-400 dark:text-gray-900 dark:hover:bg-brand-pink-500 dark:focus:bg-brand-pink-500 dark:focus:ring-offset-gray-800 dark:active:bg-brand-pink-500 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
