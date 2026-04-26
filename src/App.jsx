import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { ProblemSection } from './components/sections/ProblemSection'
import { AndromedaSystem } from './components/sections/AndromedaSystem'
import { WhoIsThisFor } from './components/sections/WhoIsThisFor'
import { ResultsGallery } from './components/sections/ResultsGallery'
import { SecretWeaponSection } from './components/sections/SecretWeaponSection'
import { FeedbackSection } from './components/sections/FeedbackSection'
import { ExpertStory } from './components/sections/ExpertStory'
import { IncomeVision } from './components/sections/IncomeVision'
import { PricingSection } from './components/sections/PricingSection'
import { Footer } from './components/layout/Footer'
import { StickyCTA } from './components/layout/StickyCTA'
import { Support } from './components/sections/Support'
import { Notification } from './components/layout/Notification'
import { PaymentModal } from './components/modals/PaymentModal'
import PaymentPage from './pages/PaymentPage'

function HomePage() {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

    const openPayment = (e) => {
        if (e) e.preventDefault()
        setIsPaymentModalOpen(true)
    }

    return (
        <main className="bg-background text-white selection:bg-primary selection:text-white font-roboto overflow-x-hidden">
            <Navbar onOpenPayment={openPayment} />
            <Hero onOpenPayment={openPayment} />
            <ProblemSection />
            <AndromedaSystem />
            <IncomeVision onOpenPayment={openPayment} />
            <ExpertStory />
            <ResultsGallery />
            {/* <WhoIsThisFor /> */}
            <FeedbackSection />
            <SecretWeaponSection />
            <PricingSection onOpenPayment={openPayment} />
            <Support />
            
            {/* Final CTA Strip */}
            <section className="bg-primary py-12 text-center group transition-colors" >
                <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-left">
                        <h3 className="text-2xl font-black mb-1 text-white">BẮT ĐẦU NGAY HÔM NAY</h3>
                        <p className="text-white/70 font-bold uppercase text-xs tracking-widest">Ưu đãi chỉ còn lại 09 suất cuối cùng</p>
                    </div>
                    <button 
                        onClick={openPayment}
                        className="bg-white text-primary font-black px-10 py-4 rounded-xl text-xl hover:bg-gray-100 transition-colors shadow-2xl transform group-hover:scale-105 inline-block"
                    >
                        NHẬN ƯU ĐÃI NGAY
                    </button>
                </div>
            </section>

            <Footer />
            <Notification />
            <StickyCTA onOpenPayment={openPayment} />
            
            <PaymentModal 
                isOpen={isPaymentModalOpen} 
                onClose={() => setIsPaymentModalOpen(false)} 
            />
        </main>
    )
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Routes>
        </Router>
    )
}

export default App
