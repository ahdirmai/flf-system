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
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    pink: {
                        DEFAULT: '#FF61D2',
                        500: '#EC4899',
                        400: '#F472B6',
                    },
                    blue: {
                        DEFAULT: '#49DEFF',
                        400: '#60A5FA',
                    },
                    light: '#FFF5FA',
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
