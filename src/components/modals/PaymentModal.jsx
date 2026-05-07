import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PaymentContent } from '../payment/PaymentContent'

export const PaymentModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto"
          >
            <PaymentContent onClose={onClose} isModal />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
