import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const feedbacks = [
    {
        name: "Hoàng Ngọc Phong",
        role: "Chủ Doanh Nghiệp Sản Xuất",
        content: "Khóa học thực sự đã thay đổi góc nhìn của tôi về thuật toán tự động hóa. Chỉ sau 2 tuần, tôi đã thiết lập được kịch bản giúp tiết kiệm hơn 40 giờ làm việc mỗi tháng.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Trần Thị Cẩm Tú",
        role: "Founder Cửa Hàng Thời Trang",
        content: "Tôi luôn nhức đầu vì khâu vận hành tốn quá nhiều nhân sự. Áp dụng tư duy thiết kế hệ thống từ khóa học, giờ tôi chỉ cần 1 người quản lý nguyên mảng phản hồi.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Phan Quốc Bảo",
        role: "Freelancer Chuyên Nghiệp",
        content: "Trước đây tôi loay hoay với hàng tá phần mềm. Nhờ được cố vấn cấu trúc lại quy trình trên n8n, tôi nhận được gấp đôi số dự án mà vẫn làm việc rất nhàn.",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    {
        name: "Nguyễn Hải Yến",
        role: "Giám Đốc Marketing",
        content: "Kiến thức về ứng dụng AI quá tuyệt vời! Đội ngũ thiết kế nội dung video của tôi đã sản xuất được quy trình video nhanh gấp ba lần với ngân sách tối thiểu.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        name: "Đinh Văn Thành",
        role: "Chuyên Gia Đào Tạo",
        content: "Sự tâm huyết của khóa học là điều mình thích nhất. Mình gặp các định dạng lỗi kịch bản không tự fix được, nhưng được hỗ trợ gỡ lỗi triệt để tận gốc.",
        avatar: "https://randomuser.me/api/portraits/men/84.jpg",
    }
]

export const IncomeVision = () => {
    const scrollRef = useRef(null)

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const firstItem = container.querySelector('.snap-center');
            if (firstItem) {
                const itemWidth = firstItem.offsetWidth;
                const gap = parseInt(window.getComputedStyle(container).gap) || 0;
                const scrollStep = itemWidth + gap;

                container.scrollBy({
                    left: direction === 'left' ? -scrollStep : scrollStep,
                    behavior: 'smooth'
                });
            }
        }
    }

    return (
        <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            {/* Dark background, glowing accents */}
            <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] -z-10" />

            <div className="max-w-screen-2xl mx-auto px-0 relative z-10 w-full">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black mb-12 text-white uppercase tracking-widest px-4"
                    >
                        Khách hàng <span className="text-primary italic">Hài Lòng</span>
                    </motion.h2>

                    <div className="relative mt-16 w-full group">
                        {/* Hidden scrollbar styling */}
                        <style>{`
                            .hide-scroll-bar::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>

                        {/* Left Fade & Click Area */}
                        <div
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-0 bottom-0 w-32 md:w-[35vw] max-w-[600px] bg-gradient-to-r from-black via-black/95 to-transparent z-20 cursor-pointer flex items-center justify-start group/left backdrop-blur-[1px]"
                        >
                            <div className="opacity-0 group-hover/left:opacity-100 transition-opacity ml-4 md:ml-12 text-white/50">
                                <ChevronLeft size={64} />
                            </div>
                        </div>

                        {/* Right Fade & Click Area */}
                        <div
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-0 bottom-0 w-32 md:w-[35vw] max-w-[600px] bg-gradient-to-l from-black via-black/95 to-transparent z-20 cursor-pointer flex items-center justify-end group/right backdrop-blur-[1px]"
                        >
                            <div className="opacity-0 group-hover/right:opacity-100 transition-opacity mr-4 md:mr-12 text-white/50">
                                <ChevronRight size={64} />
                            </div>
                        </div>

                        {/* Carousel Container */}
                        <div
                            ref={scrollRef}
                            className="flex gap-8 md:gap-16 overflow-x-auto snap-x snap-mandatory pt-12 pb-16 px-[10vw] md:px-[30vw] w-full hide-scroll-bar items-center"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {feedbacks.map((fb, idx) => (
                                <div key={idx} className="min-w-[300px] w-[300px] md:min-w-[420px] md:w-[420px] flex-shrink-0 snap-center bg-white/5 backdrop-blur-lg rounded-[32px] p-8 md:p-10 pt-16 relative shadow-2xl border border-white/10 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#0A0A0A] bg-gray-800 overflow-hidden shadow-2xl">
                                        <img src={fb.avatar} alt={fb.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="font-black text-white text-xl md:text-2xl mt-4 md:mt-2">{fb.name}</h4>
                                    <p className="text-primary text-[10px] md:text-xs font-bold mb-6 uppercase tracking-widest">{fb.role}</p>
                                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 italic">"{fb.content}"</p>
                                    <div className="flex justify-center gap-2 text-[#FBBF24]">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
