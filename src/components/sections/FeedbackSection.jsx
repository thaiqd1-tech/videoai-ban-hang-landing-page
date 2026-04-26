import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const feedbacks = [
    {
        name: "Nguyễn Văn Nam",
        role: "Chủ shop thời trang",
        content: "Khóa học thực sự mở mang tầm mắt. Trước đây tôi tốn cả chục triệu thuê mẫu và quay phim, giờ chỉ cần 15 phút là có video AI lung linh, nhìn không khác gì người thật quay.",
        avatar: "https://bizweb.dktcdn.net/100/175/849/files/chup-anh-phong-cach-cho-nam-gioi-trong-studio-nghe-thuat-o-ha-noi-03.jpg?v=1595935877427",
        rating: 5
    },
    {
        name: "Lê Thị Thu Thủy",
        role: "Content Creator",
        content: "Tư duy thiết kế video AI trong khóa học rất khác biệt. Không chỉ là dùng tool, mà là cách tạo ra kịch bản và nhân vật có hồn. Kênh TikTok của mình đã tăng 50k follow nhờ áp dụng quy trình này.",
        avatar: "https://tiemchupanh.com/wp-content/uploads/2021/11/5-6.jpg",
        rating: 5
    },
    {
        name: "Phan Quốc Bảo",
        role: "Kinh doanh tự do",
        content: "Dễ học, thực tế và hiệu quả ngay lập tức. Tôi không giỏi công nghệ nhưng vẫn làm được những video AI chuyên nghiệp. Cảm ơn đội ngũ Superb AI đã hỗ trợ rất nhiệt tình.",
        avatar: "https://bizweb.dktcdn.net/100/175/849/files/chup-anh-profile-cho-doanh-nhan-o-dau-dep-nhat-ha-noi-02.jpg?v=1572436588703",
        rating: 5
    },
    {
        name: "Hoàng Mỹ Linh",
        role: "Chủ thương hiệu mỹ phẩm",
        content: "Video AI giúp mình test mẫu quảng cáo cực nhanh. Tỉ lệ chuyển đổi đơn hàng tăng rõ rệt vì video lạ mắt và bắt trend. Một khoản đầu tư quá xứng đáng!",
        avatar: "https://png.pngtree.com/thumb_back/fw800/background/20220313/pngtree-women-s-new-year-greeting-portrait-on-a-white-background-image_1057544.jpg",
        rating: 5
    },
    {
        name: "Đặng Minh Quân",
        role: "Freelancer",
        content: "Mình đã học nhiều khóa về AI nhưng đây là khóa thực chiến nhất. Quy trình n8n và automation giúp mình xử lý hàng trăm video mỗi ngày một cách tự động.",
        avatar: "https://bizweb.dktcdn.net/100/175/849/files/chup-anh-phong-cach-cho-nam-gioi-trong-studio-nghe-thuat-o-ha-noi-03.jpg?v=1595935877427",
        rating: 5
    }
]

export const FeedbackSection = () => {
    const scrollRef = useRef(null)

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current
            const firstItem = container.querySelector('.snap-start')
            if (firstItem) {
                const itemWidth = firstItem.offsetWidth
                const gap = 24 // tương đương với gap-6 (6 * 4px)
                const scrollAmount = itemWidth + gap
                
                const scrollTo = direction === 'left' 
                    ? container.scrollLeft - scrollAmount 
                    : container.scrollLeft + scrollAmount
                
                container.scrollTo({ left: scrollTo, behavior: 'smooth' })
            }
        }
    }

    return (
        <section className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-white uppercase mb-4"
                    >
                        Học viên nói gì về <span className="text-secondary italic">Superb AI</span>
                    </motion.h2>
                    <p className="text-gray-500 font-medium tracking-widest uppercase text-[10px] md:text-sm">Kết quả thực tế từ những người đã trải nghiệm</p>
                </div>

                <div className="relative group px-4 md:px-0">
                    {/* Navigation Buttons - Absolute positioned */}
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-black hover:border-secondary transition-all duration-300 z-30 shadow-2xl opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-black hover:border-secondary transition-all duration-300 z-30 shadow-2xl opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

                    <div 
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scroll-bar pb-8"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {feedbacks.map((fb, i) => (
                            <motion.div
                                key={i}
                                className="min-w-[85%] md:min-w-[calc(33.333%-16px)] snap-start bg-white/5 border border-white/10 p-6 md:p-8 rounded-[32px] md:rounded-[40px] relative group hover:bg-white/[0.08] transition-all duration-500"
                            >
                                <Quote className="absolute top-4 right-6 md:top-6 md:right-8 text-secondary/10 w-12 h-12 md:w-16 md:h-16" />
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary/30">
                                        <img src={fb.avatar} alt={fb.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-lg">{fb.name}</h4>
                                        <p className="text-secondary text-xs font-bold uppercase tracking-widest">{fb.role}</p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(fb.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="text-secondary fill-secondary" />
                                    ))}
                                </div>

                                <p className="text-gray-400 leading-relaxed italic text-base md:text-xl">
                                    "{fb.content}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] -z-10" />

            <style>{`
                .hide-scroll-bar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}
