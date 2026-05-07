import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, QrCode, Timer, X } from 'lucide-react'
import TagManager from 'react-gtm-module'
import { trackBeginCheckout, trackLead } from '../../utils/gtm'
import { PAYMENT_CONFIG } from '../../constants/payment'
import { buildTransferContent, generateVietQrDataUrl } from '../../utils/vietqr'

const INITIAL_FORM = { name: '', phone: '', email: '' }
const INITIAL_ERRORS = { name: '', phone: '', email: '' }

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

const validateField = (name, value) => {
  if (!value.trim()) {
    const labels = { name: 'họ tên', phone: 'số điện thoại', email: 'email' }
    return `Vui lòng nhập ${labels[name]}`
  }

  if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
    return 'Email không hợp lệ'
  }

  if (name === 'phone' && !/(0[3-9][0-9]{8}|84[3-9][0-9]{8})/.test(value.replace(/[^0-9+]/g, ''))) {
    return 'Số điện thoại không hợp lệ'
  }

  return ''
}

export const PaymentContent = ({ onClose, isModal = false }) => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState(INITIAL_ERRORS)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showQr, setShowQr] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [submitError, setSubmitError] = useState('')

  const transferContent = useMemo(() => buildTransferContent(formData), [formData])
  const formattedAmount = useMemo(() => new Intl.NumberFormat('vi-VN').format(PAYMENT_CONFIG.amount), [])
  const formattedOriginalAmount = useMemo(
    () => new Intl.NumberFormat('vi-VN').format(PAYMENT_CONFIG.originalAmount),
    []
  )

  useEffect(() => {
    if (!showQr) return undefined

    const timer = setInterval(() => {
      setTimeLeft((previousValue) => (previousValue <= 1 ? 15 * 60 : previousValue - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [showQr])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((previousValue) => ({ ...previousValue, [name]: value }))
    setErrors((previousValue) => ({ ...previousValue, [name]: validateField(name, value) }))
    setSubmitError('')
  }

  const validateForm = () => {
    const nextErrors = Object.keys(formData).reduce((result, fieldName) => ({
      ...result,
      [fieldName]: validateField(fieldName, formData[fieldName])
    }), INITIAL_ERRORS)

    setErrors(nextErrors)
    return !Object.values(nextErrors).some(Boolean)
  }

  const handleGenerateQr = async () => {
    if (!validateForm()) return

    setIsProcessing(true)
    setSubmitError('')

    try {
      const { dataUrl } = await generateVietQrDataUrl({
        bankBin: PAYMENT_CONFIG.bankBin,
        accountNumber: PAYMENT_CONFIG.accountNumber,
        amount: PAYMENT_CONFIG.amount,
        transferContent
      })

      setQrDataUrl(dataUrl)
      setShowQr(true)
      setTimeLeft(15 * 60)

      trackLead({
        type: 'registration_initiated',
        ...formData,
        course: PAYMENT_CONFIG.courseTitle
      })

      trackBeginCheckout(PAYMENT_CONFIG.amount, [{
        item_name: PAYMENT_CONFIG.courseTitle,
        price: PAYMENT_CONFIG.amount,
        quantity: 1
      }])

      TagManager.dataLayer({
        dataLayer: {
          event: 'begin_checkout',
          ecommerce: {
            currency: 'VND',
            value: PAYMENT_CONFIG.amount,
            items: [{
              item_name: PAYMENT_CONFIG.courseTitle,
              category: 'Khóa học',
              price: PAYMENT_CONFIG.amount,
              quantity: 1
            }]
          }
        }
      })
    } catch (error) {
      console.error('QR generation error:', error)
      setSubmitError('Không thể tạo mã QR. Vui lòng thử lại.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className={isModal ? 'rounded-[32px] border border-white/10 bg-[#050505] p-6 md:p-8' : 'rounded-[32px] border border-white/10 bg-[#050505] p-6 md:p-10'}>
      <div className="mb-8 flex items-start justify-end gap-4">
        {onClose && (
          <button onClick={onClose} className="rounded-full border border-white/10 p-3 text-gray-400 transition hover:border-white/20 hover:text-white">
            <X size={22} />
          </button>
        )}
      </div>

      {!showQr ? (
        <div className="mx-auto max-w-2xl space-y-5">
          <div className="rounded-[28px] border border-secondary/15 bg-secondary/[0.05] p-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Thông tin khóa học</p>
            <h3 className="mt-3 text-2xl font-black text-white">{PAYMENT_CONFIG.courseTitle}</h3>
            <div className="mt-4 flex flex-col items-center gap-2">
              <span className="text-lg font-bold text-red-400 line-through opacity-80">{formattedOriginalAmount}đ</span>
              <span className="text-5xl font-black text-secondary">{formattedAmount}đ</span>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Thanh toán một lần</span>
            </div>
          </div>

          <div className="grid gap-4">
            <InputField label="Họ và tên" name="name" value={formData.name} error={errors.name} onChange={handleInputChange} placeholder="Nguyễn Văn A" />
            <InputField label="Số điện thoại" name="phone" value={formData.phone} error={errors.phone} onChange={handleInputChange} placeholder="0912 xxx xxx" />
            <InputField label="Email" name="email" value={formData.email} error={errors.email} onChange={handleInputChange} placeholder="email@gmail.com" />
          </div>

          {submitError && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-200">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <button
            onClick={handleGenerateQr}
            disabled={isProcessing}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-secondary py-5 text-lg font-black uppercase text-black shadow-[0_0_50px_rgba(250,204,21,0.2)] transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <QrCode size={22} />}
            {isProcessing ? 'Đang tạo mã QR...' : 'Tạo mã thanh toán'}
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
              <CheckCircle2 size={14} />
              Sẵn sàng thanh toán
            </div>
            <h3 className="text-3xl font-black text-white md:text-5xl">Quét mã QR để chuyển khoản</h3>
          </div>

          <div className="mx-auto grid max-w-5xl items-stretch gap-8 lg:grid-cols-2">
            <div className="flex min-h-[360px] items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:min-h-[420px]">
              <div className="rounded-[32px] bg-white p-5 shadow-2xl">
                <img src={qrDataUrl} alt="Mã VietQR thanh toán" className="h-56 w-56 md:h-72 md:w-72" />
              </div>
            </div>
            <div className="flex min-h-[360px] items-center md:min-h-[420px]">
              <div className="w-full rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                <InfoRow label="Chủ tài khoản" value={PAYMENT_CONFIG.accountName} />
                <InfoRow label="Số tài khoản" value={PAYMENT_CONFIG.accountNumber} />
                <InfoRow label="Ngân hàng" value={PAYMENT_CONFIG.bankName} />
                <InfoRow label="Giá gốc" value={`${formattedOriginalAmount}đ`} />
                <InfoRow label="Số tiền" value={`${formattedAmount}đ`} />
                <div className="border-t border-white/10 pt-3">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Nội dung chuyển khoản</p>
                  <p className="break-words text-base font-black text-secondary">{transferContent}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 border-t border-white/5 pt-5 md:flex-row">
            <div className="flex items-center gap-2 font-bold text-red-400">
              <Timer size={18} />
              <span>Mã làm mới sau: {formatTime(timeLeft)}</span>
            </div>
            <button onClick={() => setShowQr(false)} className="text-sm text-gray-400 underline transition hover:text-white">Sửa thông tin</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

const InputField = ({ label, name, value, error, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="ml-2 text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</label>
    <input
      type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-2xl border ${error ? 'border-red-500/50' : 'border-white/10'} bg-white/[0.03] px-6 py-4 text-white placeholder:text-gray-700 transition-all focus:border-secondary/50 focus:bg-white/[0.05] focus:outline-none`}
    />
    {error && <p className="ml-2 text-[10px] font-bold uppercase tracking-tighter text-red-500">{error}</p>}
  </div>
)

const InfoRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-right font-bold text-white">{value}</span>
  </div>
)
