import React from 'react'
import { PhoneCall } from 'lucide-react'

export const Support = () => {
    return (
        <section id="support" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-3xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 leading-tight">
                        Tư vấn lộ trình học làm video AI <span className="text-secondary italic">Chuyên sâu</span>
                    </h2>
                </div>

                <div className="rounded-[32px] border border-secondary/20 bg-secondary/[0.06] px-6 py-10 md:px-10 md:py-14 text-center shadow-[0_0_50px_rgba(250,204,21,0.08)]">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-black shadow-[0_0_30px_rgba(250,204,21,0.25)]">
                        <PhoneCall className="h-8 w-8" />
                    </div>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-gray-500 mb-4">
                        Hotline tư vấn miễn phí
                    </p>
                    <a
                        href="tel:0854240999"
                        className="inline-block text-4xl md:text-6xl font-black text-secondary tracking-tight hover:scale-105 transition-transform"
                    >
                        0854 240 999
                    </a>
                    <p className="mt-5 text-sm md:text-base text-gray-400">
                        Gọi ngay để được tư vấn nhanh về lộ trình học và định hướng phù hợp.
                    </p>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
                        Superb AI Solution & Software Company Limited
                    </p>
                </div>
            </div>
        </section>
    )
}
