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

const TIMER_DURATION = 7000 // 7 seconds

export const SecretWeaponSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const progressRef = useRef(null)

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % weapons.length)
        setProgress(0)
    }

    useEffect(() => {
        const interval = 100 // update progress every 100ms
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
        setActiveIndex(index)
        setProgress(0)
    }

    return (
        <section className="py-24 relative overflow-hidden bg-black">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <SectionTitle
                    subtitle="Lộ trình làm chủ"
                    title="Nội dung"
                    highlight="Chương trình học"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
                    {/* Left Side: Options List */}
                    <div className="lg:col-span-5 space-y-4">
                        {weapons.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => handleSelect(index)}
                                className={`group cursor-pointer relative p-6 rounded-2xl transition-all duration-300 border ${activeIndex === index
                                    ? 'bg-white/[0.05] border-white/20 shadow-2xl'
                                    : 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeIndex === index ? 'bg-primary text-white' : 'bg-white/5 text-gray-500'
                                        }`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-bold transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                                            }`}>
                                            {index + 1}. {item.title}
                                        </h3>
                                    </div>
                                    <ChevronRight
                                        className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-90 text-primary' : 'text-gray-600'
                                            }`}
                                        size={18}
                                    />
                                </div>

                                {/* Active Content & Progress Bar */}
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-gray-500 text-sm mt-4 leading-relaxed pl-14">
                                                {item.desc}
                                            </p>
                                            {/* Progress Bar Container */}
                                            <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Image Display */}
                    <div className="lg:col-span-7 sticky top-24 mt-40">
                        <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] rounded-[32px] overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="absolute inset-0"
                                >
                                    {/* Placeholder Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black to-[#111] z-0">
                                        <div className="text-center opacity-20">
                                            <Monitor size={80} className="mx-auto mb-4 text-white" />
                                            <p className="text-white font-bold uppercase tracking-widest text-xs">Preview Image</p>
                                        </div>
                                    </div>

                                    <img
                                        src={weapons[activeIndex].image}
                                        alt={weapons[activeIndex].title}
                                        className="w-full h-full object-contain relative z-10"
                                        onError={(e) => { e.target.style.display = 'none' }}
                                    />

                                    {/* Decorative Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-10 z-30">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Floating decorative badge */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0" />
                    </div>
                </div>
            </div>
        </section>
    )
}
