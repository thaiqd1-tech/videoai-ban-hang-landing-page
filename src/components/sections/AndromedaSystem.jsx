import React from 'react'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'

const videoList = [
    { src: '/videos/Du lịch 1.mp4', aspect: 'aspect-video' },
    { src: '/videos/Mỹ phẩm 1.mp4', aspect: 'aspect-video' },
    { src: '/videos/Sức khoẻ 1.mp4', aspect: 'aspect-[9/16]' },
    { src: '/videos/Thời trang 1.mp4', aspect: 'aspect-[9/16]' },
    { src: '/videos/Điện ảnh 1.mp4', aspect: 'aspect-[9/16]' },
]

const LazyVideo = ({ src, aspect }) => {
    const [isInView, setIsInView] = React.useState(false)
    const videoRef = React.useRef(null)

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        )

        if (videoRef.current) observer.observe(videoRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div 
            ref={videoRef}
            className={`h-[400px] md:h-[500px] ${aspect} rounded-2xl border border-white/20 bg-gray-900 overflow-hidden shadow-2xl relative`}
        >
            {isInView ? (
                <video 
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-900 animate-pulse flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-white/10 rounded-full border-t-secondary animate-spin" />
                </div>
            )}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none" />
        </div>
    )
}

export const AndromedaSystem = () => {
    const x = useMotionValue(0)
    const [isPaused, setIsPaused] = React.useState(false)
    const containerRef = React.useRef(null)
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Speed of the scroll (pixels per frame)
    const baseVelocity = -1 

    useAnimationFrame((t, delta) => {
        if (!isPaused) {
            let moveBy = baseVelocity * (delta / 16)
            x.set(x.get() + moveBy)

            if (containerRef.current) {
                const multiplier = isMobile ? 2 : 3
                const partWidth = containerRef.current.scrollWidth / multiplier
                if (x.get() <= -partWidth) {
                    x.set(0)
                } else if (x.get() > 0) {
                    x.set(-partWidth)
                }
            }
        }
    })

    const displayList = isMobile ? [...videoList, ...videoList] : [...videoList, ...videoList, ...videoList]

    return (
        <section id="system" className="py-16 md:py-24 bg-black relative overflow-hidden">
            <div className="max-w-full relative z-10 text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center gap-2 md:gap-4 mb-10 md:mb-16 uppercase px-4"
                >
                    <span className="text-4xl md:text-6xl lg:text-7xl font-black text-primary text-glow-red italic tracking-tight">Chỉ sau 3 ngày !!!</span>
                    <span className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Từ ăn lông ở lỗ đến cỗ máy sản xuất video AI</span>
                </motion.h3>

                <div className="relative py-10 overflow-hidden">
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
                        {displayList.map((video, i) => (
                            <LazyVideo key={i} src={video.src} aspect={video.aspect} />
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        </section>
    )
}
