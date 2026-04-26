import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export const StickyCTA = ({ onOpenPayment }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 800px
            if (window.scrollY > 800) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-0 left-0 right-0 z-[60] p-4 lg:hidden"
                >
                    <div className="max-w-md mx-auto">
                        <button
                            onClick={onOpenPayment}
                            className="flex items-center justify-between w-full bg-secondary text-black font-black px-4 py-2.5 rounded-xl shadow-[0_-10px_40px_rgba(250,204,21,0.3)] border-t border-white/20"
                        >
                            <div className="text-left">
                                <p className="text-[8px] uppercase tracking-widest opacity-70">Ưu đãi sắp kết thúc</p>
                                <p className="text-sm md:text-lg">ĐĂNG KÝ NHẬN ƯU ĐÃI</p>
                            </div>
                            <div className="bg-black/10 p-1.5 rounded-lg">
                                <ChevronRight size={18} />
                            </div>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
