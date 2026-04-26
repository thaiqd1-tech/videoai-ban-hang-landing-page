import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, PlayCircle, Image as ImageIcon, Users, Video, Layers, Wand2, Monitor } from 'lucide-react'
import { SectionTitle } from '../shared'

const weapons = [
    {
        id: 1,
        title: "Giới thiệu giao diện & chức năng cơ bản",
        desc: "Làm quen với các công cụ tạo Video AI hàng đầu, nắm vững các tính năng cốt lõi để bắt đầu hành trình sáng tạo chuyên nghiệp.",
        icon: <Monitor size={20} />,
        image: "/images/1. Giới thiệu.jpg"
    },
    {
        id: 2,
        title: "Phương pháp & Cấu trúc Prompt Hình ảnh",
        desc: "Kỹ thuật viết câu lệnh (Prompt Engineering) chuyên sâu để tạo ra hình ảnh AI siêu chân thực, vượt xa mong đợi.",
        icon: <Wand2 size={20} />,
        image: "/images/2.Các phương pháp.jpg"
    },
    {
        id: 3,
        title: "Xây dựng Hình ảnh AI đồng nhất",
        desc: "Bí quyết giữ vững phong cách, nhân vật và bối cảnh xuyên suốt trong hàng loạt hình ảnh AI khác nhau.",
        icon: <ImageIcon size={20} />,
        image: "/images/3.Cách xây dựng hình ảnh.jpg"
    },
    {
        id: 4,
        title: "Phương pháp & Cấu trúc Prompt Video",
        desc: "Cách điều khiển AI tạo ra các chuyển động mượt mà, chân thực và đúng ý đồ đạo diễn thông qua câu lệnh.",
        icon: <Video size={20} />,
        image: "/images/4.Các phương pháp $.jpg"
    },
    {
        id: 5,
        title: "Nhân vật AI nói chuyện & Đối thoại",
        desc: "Công nghệ đồng bộ môi (Lipsync) và biểu cảm giúp nhân vật AI của bạn có hồn và giao tiếp tự nhiên.",
        icon: <Users size={20} />,
        image: "/images/5. Cách cho nhân vật AI nói chuyện, đối thoại..jpg"
    },
    {
        id: 6,
        title: "Video nhân vật AI đồng nhất",
        desc: "Quy trình xây dựng video dài với nhân vật duy nhất, đảm bảo tính nhất quán từ đầu đến cuối phim.",
        icon: <Layers size={20} />,
        image: "/images/6.jpg"
    },
    {
        id: 7,
        title: "Hướng dẫn các dạng Video AI phổ biến",
        desc: "Triển khai thực tế các dạng: Thời trang, hình 3D, nhân hóa, xây dựng... dẫn đầu xu hướng thị trường.",
        icon: <PlayCircle size={20} />,
        image: "/images/7.jpg"
    }
]

const TIMER_DURATION = 2000 // 8 seconds

export const SecretWeaponSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const progressRef = useRef(null)

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % weapons.length)
        setProgress(0)
    }

    useEffect(() => {
        const interval = 100 
        const step = (interval / TIMER_DURATION) * 100

        progressRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextSlide()
                    return 0
                }
                return prev + step
            })
        }, interval)

        return () => clearInterval(progressRef.current)
    }, [activeIndex])

    const handleSelect = (index) => {
        if (activeIndex === index) {
            setActiveIndex(-1)
        } else {
            setActiveIndex(index)
            setProgress(0)
        }
    }

    return (
        <section id="content" className="py-24 relative overflow-hidden bg-black">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <SectionTitle
                    subtitle="Lộ trình làm chủ"
                    title="Nội dung"
                    highlight="Chương trình học"
                />

                <div className="space-y-6 mt-16">
                    {weapons.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => handleSelect(index)}
                            className={`group cursor-pointer relative p-6 md:p-8 rounded-[32px] transition-all duration-500 border ${activeIndex === index
                                ? 'bg-white/[0.05] border-white/20 shadow-2xl scale-[1.02]'
                                : 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                                }`}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${activeIndex === index ? 'bg-primary text-white scale-110 rotate-3' : 'bg-white/5 text-gray-500'
                                    }`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <span className="text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-1 block opacity-60">Chương 0{index + 1}</span>
                                    <h3 className={`text-lg md:text-xl font-black transition-colors leading-tight ${activeIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                                        }`}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${activeIndex === index ? 'rotate-90 bg-primary border-primary text-white' : 'text-gray-600'
                                    }`}>
                                    <ChevronRight size={16} />
                                </div>
                            </div>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "circOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-8 space-y-8">
                                            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                                                {item.desc}
                                            </p>
                                            
                                            {/* Image integrated inside the option */}
                                            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-video group/img">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => { e.target.style.display = 'none' }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-primary"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 0.1, ease: "linear" }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
