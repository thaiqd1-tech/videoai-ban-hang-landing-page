import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

export const Support = () => {
    const [formData, setFormData] = useState({ name: '', phone: '' })
    const [status, setStatus] = useState('idle') // idle, loading, success, error

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzENlv-l_oRGz2-5s0nH09Q3LLZLAUDctkcBd-r33Qn2zSh0C1-AB3M-FZeU9VywMQ5/exec'

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.phone) return

        setStatus('loading')
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Tránh lỗi CORS với Google Script
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            
            setStatus('success')
            setFormData({ name: '', phone: '' })
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            console.error('Error submitting form:', error)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 3000)
        }
    }

    return (
        <section id="support" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 leading-tight">
                        Tư vấn lộ trình học làm video AI <span className="text-secondary italic">Chuyên sâu</span>
                    </h2>
                    <p className="text-gray-500 font-medium italic">
                        Để lại thông tin, đội ngũ Superb AI sẽ liên hệ hỗ trợ bạn ngay lập tức.
                    </p>
                </div>

                {status === 'success' ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500/10 border border-green-500/20 p-8 rounded-[32px] text-center space-y-4"
                    >
                        <div className="flex justify-center">
                            <CheckCircle2 className="text-green-500 w-16 h-16" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase">Gửi thành công!</h3>
                        <p className="text-gray-400">Cảm ơn bạn. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="text-green-500 font-bold underline text-sm"
                        >
                            Gửi thêm yêu cầu khác
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] ml-2">
                                Họ và tên
                            </label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Ví dụ: Nguyễn Văn A"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-secondary/50 focus:bg-white/[0.05] transition-all"
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-2">
                            <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] ml-2">
                                Số điện thoại
                            </label>
                            <input 
                                type="tel" 
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="Nhập số điện thoại của bạn"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-secondary/50 focus:bg-white/[0.05] transition-all"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${
                                status === 'loading' 
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                : 'bg-secondary text-black hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(250,204,21,0.2)]'
                            }`}
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    ĐANG GỬI...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    NHẬN TƯ VẤN MIỄN PHÍ
                                </>
                            )}
                        </button>
                        
                        {status === 'error' && (
                            <p className="text-red-500 text-center text-sm font-bold">Có lỗi xảy ra, vui lòng thử lại sau!</p>
                        )}
                    </form>
                )}

                {/* Footer Info */}
                <div className="mt-16 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
                        Superb AI Solution & Software Company Limited
                    </p>
                </div>
            </div>
        </section>
    )
}
