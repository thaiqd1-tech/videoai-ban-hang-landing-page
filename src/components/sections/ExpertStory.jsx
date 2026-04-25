import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, TrendingUp, Users, BookOpen, Star } from 'lucide-react'

export const ExpertStory = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.05),transparent_50%)]" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* About Expert */}
                <div className="pt-2 border-t border-white/5">
                    <div className="text-center mb-20">
                        <p className="text-secondary font-black uppercase tracking-[0.4em] text-sm mb-4">The Expert</p>
                        <h2 className="text-3xl md:text-6xl font-black text-white">VỀ Dương Hà An</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-secondary/20 blur-[100px] rounded-full" />
                            <div className="relative z-10 p-4 border border-white/10 rounded-[40px] bg-gray-900/50 backdrop-blur-sm">
                                <div className="aspect-[4/5] relative">
                                    {/* Image Wrapper with Clipping */}
                                    <div className="absolute inset-0 bg-gray-800 rounded-[32px] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                        <img
                                            src="/duonghaan.jpg"
                                            alt="Duong Ha An"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex flex-wrap gap-3">
                                <RoleTag text="GIÁM ĐỐC ĐÀO TẠO SUPERB AI" />
                                <RoleTag text="CHUYÊN GIA CỐ VẤN GIẢI PHÁP AI" />
                            </div>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                Đã đào tạo <span className="text-white font-bold">100 học viên</span> là chủ doanh nghiệp, chủ shop, cửa hàng.
                            </p>

                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4 text-secondary">
                                    <BookOpen size={20} />
                                    <span className="font-black uppercase tracking-widest text-xs">Thông tin công ty & Liên hệ</span>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                        <span>Công ty TNHH Giải pháp và Dịch vụ Phần mềm Superb AI</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                        <span>Địa chỉ: 2/2 Ngõ 180 Hoàng Quốc Việt, phường Nghĩa Đô, Hà Nội.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                        <span>SĐT: <a href="tel:0854240999" className="hover:text-secondary hover:underline">0854240999</a></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const StatBadge = ({ text, top, left, right, bottom }) => (
    <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-secondary whitespace-nowrap z-20 shadow-2xl"
        style={{ top, left, right, bottom }}
    >
        {text}
    </motion.div>
)

const RoleTag = ({ text }) => (
    <div className="px-4 py-1.5 bg-secondary/10 border border-secondary/30 rounded-full flex items-center gap-2">
        <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
            <CheckCircle2 size={10} className="text-black" />
        </div>
        <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{text}</span>
    </div>
)
