import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gift, ShieldCheck, Zap, ChevronRight, MessageCircle } from 'lucide-react'

export const PricingSection = () => {
  const [timeLeft, setTimeLeft] = useState(3600 * 24 + 3600 * 5)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Enhanced Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-secondary/30 rounded-full blur-[200px] -z-10" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center">
          {/* MAIN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl relative card-dark border-secondary bg-secondary/[0.12] p-8 md:p-12 overflow-hidden h-auto min-h-[550px] flex flex-col justify-center shadow-[0_0_80px_rgba(250,204,21,0.15)] rounded-[40px]"
          >

            {/* BADGE */}
            <div className="absolute top-0 right-0 p-6 z-40">
              <div className="bg-secondary text-black font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-widest animate-pulse shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                Ưu đãi tốt nhất
              </div>
            </div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-8 py-8"
            >
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                <Zap size={40} className="text-secondary fill-secondary" />
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white ">
                  CHỈ CÒN
                  <span className="line-through text-red-500 text-glow-red text-2xl md:text-4xl block mt-4 opacity-80">
                    4.860.000đ
                  </span>
                  <span className="text-secondary text-glow-yellow text-6xl md:text-9xl block mt-2">
                    486.000đ
                  </span>
                </h3>
                <div className="bg-white/5 py-2 px-6 rounded-full inline-block">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                    <span className="text-secondary">DUY NHẤT TRONG HÔM NAY</span>
                  </p>
                </div>
              </div>

              <a
                href="/payment"
                className="w-full max-w-md bg-secondary text-black font-black py-6 rounded-2xl text-xl md:text-2xl shadow-[0_0_50px_rgba(250,204,21,0.4)] hover:scale-105 hover:shadow-[0_0_60px_rgba(250,204,21,0.6)] transition-all flex items-center justify-center gap-4"
              >
                MUA NGAY
                <ChevronRight />
              </a>

              <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-6 pt-4">
                <Feature icon={<Zap />} text={`Tăng giá sau: ${formatTime(timeLeft)}`} isRed />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ================= SUB COMPONENTS ================= */

const Feature = ({ icon, text, isRed }) => (
  <div className={`flex items-center gap-3 ${isRed ? 'text-primary text-glow-red text-lg md:text-xl' : 'text-gray-400 text-xs'} font-black uppercase tracking-wider`}>
    <div className={isRed ? 'animate-pulse' : ''}>{icon}</div>
    <span>{text}</span>
  </div>
)
