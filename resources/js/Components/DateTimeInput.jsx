import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef, useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';

// Custom CSS to override react-datepicker styles to match Tailwind
// This is often easier to do via global CSS, or Styled Components, 
// but we'll inject a small style block or just rely on a wrapper class for specific overrides if needed.
// Ideally, we add some overrides in our css file, but for now we'll rely on the default and custom input styling.

const CustomInput = forwardRef(({ value, onClick, className, placeholder }, ref) => (
    <div className="relative w-full">
        <input
            type="text"
            className={className}
            onClick={onClick}
            ref={ref}
            value={value}
            readOnly
            placeholder={placeholder}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            <Calendar size={16} />
        </div>
    </div>
));

export default function DateTimeInput({ className = '', value, onChange, placeholder = "Select date & time", ...props }) {
    // Value should be a Date object or null

    return (
        <div className="w-full">
            <style>{`
                .react-datepicker-wrapper {
                    width: 100%;
                }
                .react-datepicker__input-container {
                    width: 100%;
                }
                .react-datepicker {
                    font-family: inherit;
                    border-radius: 0.75rem; /* rounded-xl */
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }
                .react-datepicker__header {
                    background-color: #fff;
                    border-bottom: 1px solid #e5e7eb;
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                }
                .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
                    background-color: #F472B6 !important; /* brand-pink-400 */
                    color: white !important;
                    border-radius: 0.5rem;
                }
                 .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
                    background-color: #F472B6 !important;
                    color: white !important;
                 }
            `}</style>
            <DatePicker
                selected={value}
                onChange={onChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="d MMMM yyyy, HH:mm"
                customInput={
                    <CustomInput
                        className={`w-full rounded-xl border-gray-300 shadow-sm focus:border-brand-pink-400 focus:ring-brand-pink-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-pink-400 dark:focus:ring-brand-pink-400 ${className}`}
                        placeholder={placeholder}
                    />
                }
                {...props}
            />
        </div>
    );
}
