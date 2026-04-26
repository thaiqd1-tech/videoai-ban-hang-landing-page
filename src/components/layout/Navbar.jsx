import React from 'react'

export const Navbar = ({ onOpenPayment }) => (
    <nav className="glass-nav py-4 px-6 flex justify-between items-center bg-black/50 sticky top-0 z-50">
        <div className="flex items-center gap-2">
            <div className="text-sm md:text-lg font-black tracking-tighter uppercase">
                <span className="text-white">Học làm video </span>
                <span className="text-secondary italic">AI 2026</span>
            </div>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#system" className="hover:text-secondary transition-colors">Hệ thống</a>
            <a href="#expert" className="hover:text-secondary transition-colors">Chuyên gia</a>
            <a href="#results" className="hover:text-secondary transition-colors">Kết quả</a>
            <a href="#content" className="hover:text-secondary transition-colors">Lộ trình</a>
            <a href="#support" className="hover:text-secondary transition-colors">Tư vấn</a>
        </div>
    <button 
        onClick={onOpenPayment}
        className="bg-primary hover:bg-red-600 px-6 py-2.5 rounded-xl font-black text-xs transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 text-white"
    >
        ĐĂNG KÝ NGAY
    </button>
    </nav>
)
