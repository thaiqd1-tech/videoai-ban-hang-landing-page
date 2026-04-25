import React from 'react'
import { motion } from 'framer-motion'

const phoneImages = [
    '/images/phone1.jpg',
    '/images/phone2.jpg',
    '/images/phone3.jpg',
    '/images/phone4.jpg',
]

export const AndromedaSystem = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center gap-2 md:gap-4 mb-16 uppercase"
                >
                    <span className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Và tạo ra nguồn thu nhập</span>
                    <span className="text-4xl md:text-6xl lg:text-7xl font-black text-primary text-glow-red italic tracking-tight">"Đáng mơ ước"</span>
                </motion.h3>

                {/* Auto-scrolling Mobile Screenshots Slider */}
                <div className="relative mb-24 py-10 overflow-hidden">
                    {/* Gradient Fades for Premium Look */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                    <motion.div
                        className="flex gap-6 w-max"
                        animate={{
                            x: [0, -1144], // This value should be approximately the width of one set of images + gaps
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 25,
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Render images twice for seamless infinite loop */}
                        {[...phoneImages, ...phoneImages, ...phoneImages].map((img, i) => (
                            <div key={i} className="w-[260px] aspect-[9/19] bg-[#111] rounded-[2.5rem] border-[6px] border-white/10 overflow-hidden shadow-2xl relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <img
                                    src={img}
                                    alt={`Screenshot ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {/* Phone Notch/Camera effect */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full border border-white/5" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

