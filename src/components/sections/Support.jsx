import React from 'react'
import { motion } from 'framer-motion'

export const Support = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 leading-tight">
                        Khóa học Online hoặc trực tiếp tại Hà Nội
                    </h2>
                    <p className="text-gray-500 font-medium italic">
                        Liên hệ ngay để được tư vấn miễn phí lộ trình phù hợp với bạn.
                    </p>
                </div>

                <form className="space-y-8">
                    {/* Name Input */}
                    <div className="space-y-3">
                        <label className="text-gray-500 text-xs font-black uppercase tracking-widest pl-2">
                            Họ và tên
                        </label>
                        <input 
                            type="text" 
                            placeholder="Ví dụ: Nguyễn Văn A"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-gray-700 focus:outline-none focus:border-secondary/50 focus:bg-white/[0.05] transition-all"
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-3">
                        <label className="text-gray-500 text-xs font-black uppercase tracking-widest pl-2">
                            Số điện thoại
                        </label>
                        <input 
                            type="tel" 
                            placeholder="Ví dụ: 0912 xxx xxx"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-gray-700 focus:outline-none focus:border-secondary/50 focus:bg-white/[0.05] transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-secondary text-black font-black py-6 rounded-2xl text-xl uppercase tracking-widest shadow-[0_20px_40px_rgba(250,204,21,0.2)] hover:shadow-[0_20px_50px_rgba(250,204,21,0.3)] transition-all"
                    >
                        Tư vấn ngay
                    </motion.button>
                </form>

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
