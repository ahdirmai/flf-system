import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Inter', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    pink: {
                        400: '#F472B6',
                        500: '#EC4899',
                        DEFAULT: '#F472B6', // Default to 400
                    },
                    blue: {
                        400: '#60A5FA',
                        DEFAULT: '#60A5FA',
                    },
                    yellow: {
                        400: '#FBBF24',
                        DEFAULT: '#FBBF24',
                    },
                    lightPink: '#FDF2F8'
                }
            },
            borderRadius: {
                'xl': '12px',
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            },
        },
    },

    plugins: [forms],
};
