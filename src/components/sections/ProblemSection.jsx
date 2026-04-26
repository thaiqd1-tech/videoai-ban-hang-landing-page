import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, AlertTriangle } from 'lucide-react'
import { StatBox } from '../shared'


export const ProblemSection = () => {
    return (
        <section className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px] -z-10" />
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-20 right-[10%] opacity-5 text-primary"
            >
                <AlertTriangle size={120} />
            </motion.div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-6xl md:text-7xl font-black mb-8">
                        Bạn không <span className="text-primary text-glow-red uppercase italic mr-4">Cô Đơn !!</span>
                    </h2>
                    <p className="text-gray-400 text-xl md:text-2xl max-w-6xl mx-auto leading-relaxed font-medium">
                        Tôi đã cố vấn hơn <span className="text-white font-bold">1000 học viên</span> là chủ doanh nghiệp, chủ xưởng, các<br className="hidden md:block" />
                        cá nhân kinh doanh tự do,<br className="hidden md:block" />
                        Nhiều người đổ lỗi cho AI "kém thông minh", quy trình "phức tạp", hay<br className="hidden md:block" />
                        mẫu video AI nhiều "rác"...<br className="hidden md:block" />
                        Nhưng sự thật là yếu tố then chốt làm cho video AI hiệu quả là <span className="text-secondary font-bold">
                            <br className="hidden md:block" />" TƯ DUY THIẾT KẾ "</span>.
                    </p>
                </div>


            </div>
        </section>
    )
}
