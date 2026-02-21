import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export default function Toast() {
    const { flash } = usePage().props;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (flash.success) {
            addMessage(flash.success, 'success');
        }
        if (flash.error) {
            addMessage(flash.error, 'error');
        }
        if (flash.message) {
            addMessage(flash.message, 'info');
        }
    }, [flash]);

    const addMessage = (text, type) => {
        const id = Math.random().toString(36).substr(2, 9);
        setMessages(prev => [...prev, { id, text, type }]);

        setTimeout(() => {
            removeMessage(id);
        }, 5000);
    };

    const removeMessage = (id) => {
        setMessages(prev => prev.filter(m => m.id !== id));
    };

    if (messages.length === 0) return null;

    return (
        <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
            {messages.map((m) => (
                <div
                    key={m.id}
                    className={`pointer-events-auto relative overflow-hidden group rounded-2xl border bg-white dark:bg-gray-800 p-4 shadow-2xl transition-all duration-500 animate-in slide-in-from-right-10 fade-in
                        ${m.type === 'success' ? 'border-emerald-100 dark:border-emerald-900/30' :
                            m.type === 'error' ? 'border-rose-100 dark:border-rose-900/30' :
                                'border-blue-100 dark:border-blue-900/30'}`}
                >
                    {/* Progress bar */}
                    <div className={`absolute bottom-0 left-0 h-1 transition-all duration-[5000ms] ease-linear w-0 group-hover:w-full
                        ${m.type === 'success' ? 'bg-emerald-500' :
                            m.type === 'error' ? 'bg-rose-500' :
                                'bg-blue-500'}`}
                        style={{ width: '100%', transitionDuration: '5000ms' }}
                    />

                    <div className="flex items-start gap-3">
                        <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center
                            ${m.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' :
                                m.type === 'error' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500' :
                                    'bg-blue-50 dark:bg-blue-900/20 text-blue-500'}`}
                        >
                            {m.type === 'success' && <CheckCircle className="w-4.5 h-4.5" />}
                            {m.type === 'error' && <AlertCircle className="w-4.5 h-4.5" />}
                            {m.type === 'info' && <Info className="w-4.5 h-4.5" />}
                        </div>

                        <div className="flex-1">
                            <p className={`text-[10px] font-black uppercase tracking-widest mb-0.5
                                ${m.type === 'success' ? 'text-emerald-500' :
                                    m.type === 'error' ? 'text-rose-500' :
                                        'text-blue-500'}`}
                            >
                                {m.type === 'success' ? 'Berhasil' :
                                    m.type === 'error' ? 'Gagal' :
                                        'Informasi'}
                            </p>
                            <p className="text-sm font-bold text-slate-700 dark:text-gray-200 leading-tight">
                                {m.text}
                            </p>
                        </div>

                        <button
                            onClick={() => removeMessage(m.id)}
                            className="shrink-0 text-slate-300 hover:text-slate-500 dark:text-gray-600 dark:hover:text-gray-400 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
