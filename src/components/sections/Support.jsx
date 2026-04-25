import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  AlertTriangle,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  ArrowRight,
} from 'lucide-react'
import { FloatingBadge } from '../shared'

export const Support = () => {
  const { scrollY } = useScroll()
  const ySlow = useTransform(scrollY, [0, 500], [0, -80])
  const yMedium = useTransform(scrollY, [0, 500], [0, -140])
  const yFast = useTransform(scrollY, [0, 500], [0, -200])

  return (
    <section className="relative min-h-screen bg-[#020202] overflow-hidden pt-36 pb-24 px-4 text-center">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-blue-500/20 blur-[160px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-cyan-400/10 blur-[160px] rounded-full -z-10" />

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto z-10"
      >
        {/* BADGE */}
        <div className="inline-flex items-center gap-3 bg-blue-500/10 border-2 border-blue-500/40 text-blue-400 px-6 py-2.5 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider mb-10">
          <ShieldCheck size={20} />
          CAM KẾT HỖ TRỢ ĐẾN KHI LÀM ĐƯỢC
        </div>

        {/* HEADLINE */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight text-white uppercase">
          Bạn không phải
          <span className="text-blue-500 text-glow-blue italic block mt-2">
            tự mò một mình
          </span>
        </h1>


        {/* SUPPORT CARD */}
        <div className="relative max-w-3xl mx-auto bg-[#111] border border-white/5 rounded-[32px] p-8 md:p-12 text-left shadow-[0_0_80px_rgba(59,130,246,0.1)] overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -z-10 group-hover:bg-blue-500/20 transition-all" />

          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative shrink-0">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
              <div className="w-20 h-20 rounded-full bg-white p-1.5 flex items-center justify-center relative z-10 shadow-[0_15px_35px_rgba(59,130,246,0.3)] border-4 border-blue-500/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img src="/logos/zalo-logo.png" alt="zalo" className="w-full h-full object-cover scale-110" />
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                HỖ TRỢ TRỰC TIẾP QUA ZALO
              </h3>
              <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em]">Cùng chuyên gia n8n & AI</p>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6">
            Khi bạn gặp vấn đề trong lúc học hoặc triển khai automation thực tế:
            lỗi workflow, AI trả kết quả sai, không kết nối được API, không tối ưu
            chi phí…
          </p>

          <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <img src="/images/zalo.jpg" alt="Zalo Support Group" className="w-full h-auto object-cover" />
          </div>

          <p className="text-center text-xs text-gray-600 uppercase tracking-wider">
            *Chỉ hỗ trợ học viên đã đăng ký
          </p>
        </div>






      </motion.div>

      {/* FLOATING BADGES */}
      <div className="hidden lg:block">
        <FloatingBadge icon={<AlertTriangle size={14} />} text="Không ai trả lời" top="18%" left="5%" style={{ y: yFast }} />
        <FloatingBadge icon={<MessageCircle size={14} />} text="Chat trực tiếp" top="50%" right="5%" style={{ y: yMedium }} />
        <FloatingBadge icon={<ShieldCheck size={14} />} text="Không bỏ rơi" bottom="30%" left="10%" style={{ y: ySlow }} />
        <FloatingBadge icon={<Headphones size={14} />} text="1:1 Support" bottom="25%" right="15%" style={{ y: yFast }} />
      </div>
    </section>
  )
}
