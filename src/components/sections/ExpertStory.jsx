import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, TrendingUp, Users, BookOpen, Star } from 'lucide-react'

export const ExpertStory = () => {
    return (
        <section id="expert" className="py-24 bg-black relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.05),transparent_50%)]" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* About Pham Quang Dat */}
                <div className="mb-32">
                    <div className="text-center mb-20">
                        <p className="text-secondary font-black uppercase tracking-[0.4em] text-sm mb-4">The Expert</p>
                        <h2 className="text-3xl md:text-6xl font-black text-white uppercase">VỀ PHẠM QUẢNG ĐẠT</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Image - Second on desktop (Right), First on mobile (Top) */}
                        <div className="relative lg:order-2">
                            <div className="absolute inset-0 bg-secondary/20 blur-[100px] rounded-full" />
                            <div className="relative z-10 p-4 border border-white/10 rounded-[40px] bg-gray-900/50 backdrop-blur-sm">
                                <div className="aspect-[4/5] relative">
                                    <div className="absolute inset-0 bg-gray-800 rounded-[32px] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                        <img
                                            src="/sepdat.png"
                                            alt="Pham Quang Dat"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <StatBadge text="Ex PM Lead One Mount" top="5%" right="-2%" />
                                    <StatBadge text="Ex Tech Lead Viettel" top="35%" right="-5%" />
                                    <StatBadge text="Founder KhoahocAI.pro" bottom="15%" right="-2%" />
                                    <StatBadge text="Founder XCEL BOT" top="15%" left="-2%" />
                                    <StatBadge text="x10 Traffic Growth" bottom="25%" left="-5%" />
                                    <StatBadge text="HUST & NEU Background" bottom="5%" left="2%" />
                                </div>
                            </div>
                        </div>

                        {/* Text - First on desktop (Left), Second on mobile (Bottom) */}
                        <div className="space-y-8 lg:order-1">
                            <div className="flex flex-wrap gap-3">
                                <RoleTag text="PRODUCT MANAGER LEAD" />
                                <RoleTag text="AI AUTOMATION EXPERT" />
                                <RoleTag text="FOUNDER @ SUPERB AI" />
                            </div>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                Với nền tảng kỹ thuật từ <span className="text-white font-bold">Bách Khoa (HUST)</span> và tư duy quản trị từ <span className="text-white font-bold">Kinh tế Quốc dân (NEU)</span>.
                                <br />
                                <br />
                                Từng giữ vị trí quan trọng tại các tập đoàn công nghệ lớn: <span className="text-white font-bold">Viettel &rarr; One Mount &rarr; Superb Al</span>.
                            </p>

                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4 text-secondary">
                                    <BookOpen size={20} />
                                    <span className="font-black uppercase tracking-widest text-xs">Chứng chỉ & Đào tạo chuyên sâu</span>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                        <span>CS101 @ Stanford Online</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                        <span>IBM RAG & Agentic AI</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                        <span>IBM Building AI Agents & Agentic workflows</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4 text-secondary">
                                    <TrendingUp size={20} />
                                    <span className="font-black uppercase tracking-widest text-xs">Kinh nghiệm thực chiến</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['AI Workforce Platform', 'Recommendation Systems', 'Product Management', 'Market Growth'].map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-500 font-bold">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 bg-secondary/5 border-l-4 border-secondary rounded-r-2xl italic">
                                <p className="text-gray-300">
                                    "Mục tiêu của tôi là giúp bạn biến AI từ một công cụ xa lạ thành một <span className="text-secondary font-black underline">CỘNG SỰ ĐẮC LỰC NHẤT</span> trong mọi công việc."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Duong Ha An */}
                <div className="pt-12 border-t border-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <div className="relative">
                            <div className="absolute inset-0 bg-secondary/20 blur-[100px] rounded-full " />
                            <div className="relative z-10 p-4 border border-white/10 rounded-[40px] bg-gray-900/50 backdrop-blur-sm">
                                <div className="aspect-[4/5] relative">
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

                            {/* Community Badge Card */}
                            <div className="mt-6 relative z-10 p-5 bg-gradient-to-r from-secondary/20 to-transparent border border-white/10 rounded-2xl flex items-center gap-4 backdrop-blur-md shadow-2xl">
                                <div className="p-3 bg-secondary/20 rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                                    <Users className="text-secondary" size={28} />
                                </div>
                                <p className="text-white font-black text-lg md:text-xl leading-tight">
                                    Admin 3 cộng đồng về làm video AI lớn nhất Việt Nam
                                    với hơn <span className="text-secondary">300k thành viên</span>
                                </p>
                            </div>
                        </div>
                        

                        <div className="space-y-10 pt-4">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-2">Dương Hà An</h2>
                                <p className="text-secondary font-bold text-lg md:text-xl uppercase tracking-wider">Giám đốc đào tạo Superb AI</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-secondary/10 p-2 rounded-lg">
                                        <Star size={20} className="text-secondary fill-secondary" />
                                    </div>
                                    <p className="text-gray-300 text-lg font-bold">Chuyên gia cố vấn giải pháp AI cho doanh nghiệp</p>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-secondary/10 p-2 rounded-lg">
                                        <Users size={20} className="text-secondary" />
                                    </div>
                                    <p className="text-gray-300 text-lg font-bold">Đã đào tạo 1000+ học viên là chủ doanh nghiệp, chủ shop, cửa hàng.</p>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-secondary/10 p-2 rounded-lg">
                                        <CheckCircle2 size={20} className="text-secondary" />
                                    </div>
                                    <p className="text-gray-300 text-lg font-bold">100% học viên làm được video bán hàng chỉ sau 2 ngày học</p>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-secondary/10 p-2 rounded-lg">
                                        <TrendingUp size={20} className="text-secondary" />
                                    </div>
                                    <p className="text-gray-300 text-lg font-bold">300+ học viên tạo ra nguồn thu nhập mới</p>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-secondary/10 p-2 rounded-lg">
                                        <Users size={20} className="text-secondary" />
                                    </div>
                                    <p className="text-gray-300 text-lg font-bold">500+ học viên là chủ doanh nghiệp/ chủ shop áp dụng tăng &gt;50% hiệu quả</p>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-secondary/10 p-2 rounded-lg">
                                        <CheckCircle2 size={20} className="text-secondary" />
                                    </div>
                                    <p className="text-gray-300 text-lg font-bold">1000+ học viên giảm chi phí sản xuất video &gt;85% áp dụng thành công</p>
                                </div>
                            </div>

                            {/* Page Screenshots Slider */}
                            <div className="relative border-t border-white/5 overflow-hidden group">
                                <motion.div 
                                    className="flex gap-4 w-max"
                                    animate={{ x: [0, -1008] }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                >
                                    {[1, 2, 3, 1, 2, 3].map((num, i) => (
                                        <div key={i} className="w-[320px] aspect-video rounded-xl overflow-hidden border border-white/10 shadow-xl">
                                            <img 
                                                src={`/images/page${num}.jpg`} 
                                                alt={`Page ${num}`} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </motion.div>
                                {/* Fades */}
                                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10" />
                                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10" />
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
