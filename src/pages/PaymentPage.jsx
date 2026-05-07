import React, { useEffect } from 'react'
import { PaymentContent } from '../components/payment/PaymentContent'
import { trackPageView } from '../utils/gtm'

const PaymentPage = () => {
  useEffect(() => {
    trackPageView('payment_page', {
      page_title: 'Thanh toán khóa học',
      content_name: 'Khóa học UGC'
    })
  }, [])

  return (
    <div className="min-h-screen bg-black px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <PaymentContent />
      </div>
    </div>
  )
}

export default PaymentPage
