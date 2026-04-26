import React from 'react'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'

const videoList = [
    { src: '/videos/Du lịch 1.mp4', aspect: 'aspect-video' },
    { src: '/videos/Mỹ phẩm 1.mp4', aspect: 'aspect-video' },
    { src: '/videos/Sức khoẻ 1.mp4', aspect: 'aspect-[9/16]' },
    { src: '/videos/Thời trang 1.mp4', aspect: 'aspect-[9/16]' },
    { src: '/videos/Điện ảnh 1.mp4', aspect: 'aspect-[9/16]' },
]

export const AndromedaSystem = () => {
    const x = useMotionValue(0)
    const [isPaused, setIsPaused] = React.useState(false)
    const containerRef = React.useRef(null)

    // Speed of the scroll (pixels per frame)
    const baseVelocity = -1 

    useAnimationFrame((t, delta) => {
        if (!isPaused) {
            let moveBy = baseVelocity * (delta / 16) // Normalize by 60fps
            x.set(x.get() + moveBy)

            // Loop logic: If moved more than half the width (since we duplicated items), reset to 0
            if (containerRef.current) {
                const halfWidth = containerRef.current.scrollWidth / 3
                if (x.get() <= -halfWidth) {
                    x.set(0)
                } else if (x.get() > 0) {
                    x.set(-halfWidth)
                }
            }
        }
    })

    return (
        <section className="py-16 md:py-24 bg-black relative overflow-hidden">
            <div className="max-w-full relative z-10 text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center gap-2 md:gap-4 mb-10 md:mb-16 uppercase px-4"
                >
                    <span className="text-4xl md:text-6xl lg:text-7xl font-black text-primary text-glow-red italic tracking-tight">Chỉ sau 3 ngày !!!</span>
                    <span className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Từ ăn lông ở lỗ đến cỗ máy sản xuất video AI</span>
                </motion.h3>

                {/* Auto-scrolling Video Slider */}
                <div className="relative py-10 overflow-hidden">
                    {/* Gradient Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

                    <motion.div
                        ref={containerRef}
                        className="flex gap-6 w-max cursor-grab active:cursor-grabbing px-12"
                        style={{ x }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        drag="x"
                        onDragStart={() => setIsPaused(true)}
                        onDragEnd={() => setIsPaused(false)}
                    >
                        {/* Triple the list to ensure seamless looping during drags */}
                        {[...videoList, ...videoList, ...videoList].map((video, i) => (
                            <div 
                                key={i} 
                                className={`h-[400px] md:h-[500px] ${video.aspect} rounded-2xl border border-white/20 bg-gray-900 overflow-hidden shadow-2xl relative`}
                            >
                                <video 
                                    src={video.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                {/* Soft Inner Shadow */}
                                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        </section>
    )
}
