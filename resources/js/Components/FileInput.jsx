import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function FileInput(
    { className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type="file"
            className={
                'block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-brand-pink-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-pink-700 hover:file:bg-brand-pink-100 dark:text-gray-300 dark:file:bg-brand-pink-900 dark:file:text-brand-pink-400 ' +
                className
            }
            ref={localRef}
        />
    );
});
