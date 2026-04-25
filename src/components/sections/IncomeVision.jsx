import React from 'react'
import { motion } from 'framer-motion'

const phoneImages = [
    '/images/phone1.jpg',
    '/images/phone2.jpg',
    '/images/phone3.jpg',
]

export const IncomeVision = () => {
    // Duplicate images for seamless loop
    const allImages = [...phoneImages, ...phoneImages, ...phoneImages]

    return (
        <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            {/* Background Accents */}
            <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl lg:text-5xl font-black mb-16 text-white uppercase tracking-tight"
                >
                    Và tạo ra nguồn thu nhập
                    <span className="block mt-4 md:mt-6 text-primary italic text-3xl md:text-5xl lg:text-7xl text-glow-red">
                        "Đáng mơ ước !!!"
                    </span>
                </motion.h2>

                {/* Auto-scrolling Slider */}
                <div className="relative overflow-hidden py-10">
                    {/* Gradient Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                    <motion.div
                        className="flex gap-6 w-max"
                        animate={{
                            x: [0, -1144], // This depends on image width + gap
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
                        {allImages.map((src, idx) => (
                            <div
                                key={idx}
                                className="w-[260px] md:w-[320px] aspect-[9/19] rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500"
                            >
                                <img
                                    src={src}
                                    alt={`Result ${idx}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 font-medium text-lg md:text-xl mt-12 max-w-3xl mx-auto"
                >
                    Hơn 1.000+ học viên đã áp dụng quy trình này để tạo ra những video AI 
                    có sức hút mãnh liệt và mang về doanh thu thực tế.
                </motion.p>
            </div>
        </section>
    )
}
