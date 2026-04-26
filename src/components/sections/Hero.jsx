import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AlertTriangle, ArrowRight, TrendingDown, Users, Lock, CheckCircle2, BarChart3, TrendingUp } from 'lucide-react'
import { FloatingBadge } from '../shared'

export const Hero = ({ onOpenPayment }) => {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, -100])
    const y2 = useTransform(scrollY, [0, 500], [0, -200])
    const y3 = useTransform(scrollY, [0, 500], [0, -150])

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-40 pb-20 bg-[#020202]">
            {/* Top Alert Bar */}
            <div className="absolute top-0 left-0 w-full bg-red-600 py-3 flex items-center justify-center gap-4 text-white z-50">
                <AlertTriangle size={18} className="animate-pulse" />
                <span className="font-black text-xs md:text-sm tracking-widest uppercase">
                    Cảnh báo khẩn cấp cho người muốn làm chủ video AI
                </span>
                <AlertTriangle size={18} className="animate-pulse" />
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[150px] -z-10 animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto z-10"
            >
                {/* Urgent Badge */}
                <div className="inline-flex items-center gap-3 bg-yellow-500/10 border-2 border-yellow-500/50 text-yellow-500 px-6 py-2.5 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider mb-10 glow-yellow-badge">
                    <AlertTriangle size={20} />
                    Đừng để bị công nghệ bỏ lại phía sau
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight md:leading-[1.1] tracking-tight text-white uppercase">
                    <span className="text-red-600 text-glow-red italic block transform -skew-x-6 uppercase font-montserrat text-2xl md:text-6xl lg:text-7xl mb-2 md:mb-4">90% người làm video</span>
                    chưa biết cách làm <br className='hidden md:block' /> <span className="text-green-500 text-glow-green">video AI hiệu quả</span>
                </h1>

                <div className="max-w-3xl mx-auto mb-12">
                    <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed">
                        Chi phí sản xuất video tốn hàng trăm triệu
                        <br />
                        Nhưng lại "KHÔNG RA ĐƠN", chất lượng video "KÉM"
                    </p>
                </div>

                <div className="flex flex-col items-center gap-8">
                    {/* Member Pill */}
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 pl-2 pr-6 py-2 rounded-full backdrop-blur-md">
                        <div className="flex -space-x-2">
                            {[
                                "https://bizweb.dktcdn.net/100/175/849/files/chup-anh-phong-cach-cho-nam-gioi-trong-studio-nghe-thuat-o-ha-noi-03.jpg?v=1595935877427",
                                "https://tiemchupanh.com/wp-content/uploads/2021/11/5-6.jpg",
                                "https://bizweb.dktcdn.net/100/175/849/files/chup-anh-profile-cho-doanh-nhan-o-dau-dep-nhat-ha-noi-02.jpg?v=1572436588703",
                                "https://png.pngtree.com/thumb_back/fw800/background/20220313/pngtree-women-s-new-year-greeting-portrait-on-a-white-background-image_1057544.jpg"
                            ].map((url, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                                    <img src={url} alt={`User ${i}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <span className="text-sm md:text-base font-bold text-gray-300">
                            <span className="text-secondary font-black">997+</span> người đã đăng ký
                        </span>
                    </div>

                    <p className="text-[10px] md:text-xs text-gray-600 italic font-bold tracking-wider uppercase opacity-60">
                        *Đọc kỹ trước khi quyết định. Chúng tôi không nhận học viên thiếu quyết tâm.
                    </p>
                    <button
                        onClick={onOpenPayment}
                        className="w-full max-w-md bg-secondary text-black font-black py-6 rounded-2xl text-xl md:text-2xl shadow-[0_0_50px_rgba(250,204,21,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-4"
                    >
                        ĐĂNG KÝ NGAY
                    </button>
                </div>
            </motion.div>

            {/* Floating Badges with Refined Styling */}
            <div className="hidden lg:block">
                <FloatingBadge icon={<AlertTriangle size={14} />} text="Lãng phí thời gian" top="15%" left="5%" style={{ y: y2 }} />
                <FloatingBadge icon={<Users size={14} />} text="Nhân vật không đồng nhất" top="25%" right="10%" style={{ y: y1 }} />
                <FloatingBadge icon={<Lock size={14} />} text="Tiền thuê mẫu cao" top="45%" right="5%" style={{ y: y3 }} />
                <FloatingBadge icon={<CheckCircle2 size={14} />} text="Video chất lượng thấp" bottom="25%" right="15%" style={{ y: y2 }} />
                <FloatingBadge icon={<BarChart3 size={14} />} text="Bí ý tưởng" bottom="20%" left="15%" style={{ y: y1 }} />
                <FloatingBadge icon={<TrendingUp size={14} />} text="Chất lượng kém" top="60%" left="10%" style={{ y: y3 }} />
                <FloatingBadge icon={<Lock size={14} />} text="Chuyển đổi kém" bottom="50%" left="5%" style={{ y: y2 }} />
                <FloatingBadge icon={<Lock size={14} />} text="Chi phí cao" bottom="40%" right="10%" style={{ y: y1 }} />
            </div>
        </section>
    )
}
