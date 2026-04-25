import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Play } from 'lucide-react'
import { SectionTitle } from '../shared'

const categories = [
    { name: "Thời trang", video: "/videos/Thời trang 1.mp4", isLandscape: false },
    { name: "Mỹ phẩm", video: "/videos/Mỹ phẩm 1.mp4", isLandscape: true },
    { name: "Bất động sản", video: "/videos/Điện ảnh 1.mp4", isLandscape: false },
    { name: "Sức khỏe", video: "/videos/Sức khoẻ 1.mp4", isLandscape: false },
    { name: "Du lịch", video: "/videos/Du lịch 1.mp4", isLandscape: true }
]

export const ResultsGallery = () => {
    const [active, setActive] = useState(0)
    const current = categories[active]

    return (
        <section className="py-24 bg-[#080808] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="mb-16">
                    <h2 className="text-2xl md:text-[3rem] font-black leading-tight text-white uppercase text-center max-w-4xl mx-auto">
                        Học viên của tôi đã học và tự làm ra được <br className="hidden md:block" />
                        những <span className="text-secondary text-glow-yellow italic">video AI</span> như thế này
                    </h2>
                    <div className="h-1.5 w-24 bg-primary mx-auto mt-8 rounded-full" />
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((c, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`px-8 py-4 rounded-2xl font-black transition-all border-2 text-sm uppercase tracking-wider ${active === i
                                    ? 'bg-secondary text-black border-secondary shadow-[0_0_30px_rgba(255,232,0,0.3)] scale-105'
                                    : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/10'
                                }`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="relative">
                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-secondary rounded-full" />
                                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic">
                                    NGÀNH <span className="text-secondary">{current.name}</span>
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {current.isLandscape
                                        ? "Khám phá sức mạnh của AI trong việc tạo ra những thước phim điện ảnh khổ rộng, phù hợp cho quảng cáo TVC, Youtube và các nền tảng video chuyên nghiệp."
                                        : "Không cần thuê studio, không cần diễn viên, không cần máy quay đắt tiền. Học viên chỉ cần dùng Tư duy AI để tạo ra những thước phim dọc đỉnh cao."}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-[32px] bg-[#111] border border-white/5 group hover:border-secondary/30 transition-colors">
                                    <p className="text-xs text-gray-500 mb-2 uppercase font-black tracking-widest group-hover:text-secondary transition-colors">Chi phí sản xuất</p>
                                    <p className="text-3xl font-black text-white">GẦN NHƯ <span className="text-secondary">0đ</span></p>
                                </div>
                                <div className="p-8 rounded-[32px] bg-[#111] border border-white/5 group hover:border-secondary/30 transition-colors">
                                    <p className="text-xs text-gray-500 mb-2 uppercase font-black tracking-widest group-hover:text-secondary transition-colors">Thời gian thực hiện</p>
                                    <p className="text-3xl font-black text-white">DƯỚI <span className="text-secondary">1 GIỜ</span></p>
                                </div>
                            </div>

                            <div className="p-8 rounded-[32px] bg-secondary/5 border-2 border-secondary/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Rocket size={80} />
                                </div>
                                <p className="text-secondary font-black uppercase text-sm mb-2 tracking-[0.2em]">Khả năng ứng dụng</p>
                                <p className="text-white font-bold text-lg leading-snug">
                                    Tự động hóa hoàn toàn quy trình làm nội dung, phủ kênh đa nền tảng {current.isLandscape ? "(Youtube, Facebook)" : "(TikTok, Reels, Shorts)"} mà không lo cạn ý tưởng.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="order-1 lg:order-2 flex justify-center items-center">
                        <div className={`relative w-full ${current.isLandscape ? 'max-w-xl' : 'max-w-[340px]'} transition-all duration-500`}>
                            {/* Frame Decoration */}
                            <div className={`absolute -inset-4 border-2 border-white/10 ${current.isLandscape ? 'rounded-[2rem]' : 'rounded-[3rem]'} pointer-events-none`} />
                            <div className={`absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent ${current.isLandscape ? 'rounded-[1.8rem]' : 'rounded-[2.8rem]'} pointer-events-none`} />

                            {/* Main Video Container */}
                            <div className={`relative bg-[#0A0A0A] ${current.isLandscape ? 'aspect-video' : 'aspect-[9/16]'} transition-all duration-500 ${current.isLandscape ? 'rounded-[1.5rem]' : 'rounded-[2.5rem]'} border-[8px] border-[#1A1A1A] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]`}>
                                <AnimatePresence mode="wait">
                                    <motion.video
                                        key={current.video}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        src={current.video}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                    />
                                </AnimatePresence>

                                {/* Phone UI Elements (Only for Portrait) */}
                                {!current.isLandscape && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1A1A1A] rounded-b-2xl z-20" />
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


