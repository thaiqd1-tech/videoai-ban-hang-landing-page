import React from 'react'

export const Navbar = ({ onOpenPayment }) => (
    <nav className="glass-nav py-4 px-6 flex justify-between items-center bg-black/50 sticky top-0 z-50">
        <div className="text-2xl font-black text-secondary italic tracking-tighter">AI Automation<span className="text-white">.PRO</span></div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-secondary transition-colors">Về chúng tôi</a>
            <a href="#" className="hover:text-secondary transition-colors">Kết quả</a>
            <a href="#" className="hover:text-secondary transition-colors">Nội dung</a>
        </div>
    <button 
        onClick={onOpenPayment}
        className="bg-primary hover:bg-red-600 px-6 py-2.5 rounded-xl font-black text-xs transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 text-white"
    >
        ĐĂNG KÝ NGAY
    </button>
    </nav>
)
