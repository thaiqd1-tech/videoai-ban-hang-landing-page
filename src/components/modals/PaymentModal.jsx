import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, QrCode, CheckCircle2, Loader2, AlertCircle, ShieldCheck, Timer } from 'lucide-react'
import { API_BASE_URL } from '../../constants/api'
import TagManager from 'react-gtm-module'
import { trackBeginCheckout, trackLead } from '../../utils/gtm'

export const PaymentModal = ({ isOpen, onClose }) => {
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [registrationData, setRegistrationData] = useState(null)
    const [showQR, setShowQR] = useState(false)
    const [timeLeft, setTimeLeft] = useState(15 * 60)
    const [paymentStatus, setPaymentStatus] = useState('pending')
    const [isProcessing, setIsProcessing] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
    const [errors, setErrors] = useState({ name: '', email: '', phone: '' })
    const [registerError, setRegisterError] = useState('')

    useEffect(() => {
        if (isOpen) {
            fetchCourses()
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
            resetModal()
        }
    }, [isOpen])

    const resetModal = () => {
        setShowQR(false)
        setPaymentStatus('pending')
        setIsProcessing(false)
        setTimeLeft(15 * 60)
        setRegistrationData(null)
        setRegisterError('')
    }

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/landing/courses`, {
                headers: { 'Accept': 'application/json' }
            })
            const result = await response.json()
            if (result.success) {
                setCourses(result.data)
                if (result.data.length > 0) {
                    const targetCourse = result.data.find(c => c.course_code === 'UGC')
                    setSelectedCourse(targetCourse || result.data[0])
                }
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error)
        }
    }

    useEffect(() => {
        if (!showQR || paymentStatus === 'success') return
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev <= 1 ? 15 * 60 : prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [showQR, paymentStatus])

    useEffect(() => {
        let interval
        if (showQR && paymentStatus !== 'success') {
            interval = setInterval(() => checkPaymentStatus(), 5000)
        }
        return () => clearInterval(interval)
    }, [showQR, paymentStatus, formData.email, selectedCourse])

    const checkPaymentStatus = async () => {
        if (!formData.email || !selectedCourse) return
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/course-registrations/check-status?email=${encodeURIComponent(formData.email)}&course_code=${encodeURIComponent(selectedCourse.course_code)}`,
                { headers: { 'Accept': 'application/json' } }
            )
            const result = await response.json()
            if (result.success && result.status === 'paid') {
                setPaymentStatus('success')
                handleSuccessTracking(result.registration_id)
            }
        } catch (error) {
            console.error('Status check error:', error)
        }
    }

    const handleSuccessTracking = (regId) => {
        const value = selectedCourse.current_price || 486000
        TagManager.dataLayer({
            dataLayer: {
                event: 'purchase',
                ecommerce: {
                    transaction_id: regId,
                    value: value,
                    currency: 'VND',
                    items: [{
                        item_name: selectedCourse.title,
                        category: 'Khóa học',
                        price: value,
                        quantity: 1
                    }]
                }
            }
        })
        if (window.fbq) {
            window.fbq('track', 'Purchase', { 
                value: value, 
                currency: 'VND', 
                content_type: 'product',
                content_name: selectedCourse.title,
                content_ids: [selectedCourse.course_code]
            })
        }
    }

    const validateField = (name, value) => {
        let error = ''
        if (!value || value.trim() === '') {
            error = `Vui lòng nhập ${name === 'name' ? 'họ tên' : name}`
        } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Email không hợp lệ'
        } else if (name === 'phone' && !/(0[3-9][0-9]{8}|84[3-9][0-9]{8})/.test(value.replace(/[^0-9+]/g, ''))) {
            error = 'Số điện thoại không hợp lệ'
        }
        setErrors(prev => ({ ...prev, [name]: error }))
        return error === ''
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setRegisterError('')
        validateField(name, value)
    }

    const handleRegister = async () => {
        const isNameValid = validateField('name', formData.name)
        const isEmailValid = validateField('email', formData.email)
        const isPhoneValid = validateField('phone', formData.phone)

        if (!isNameValid || !isEmailValid || !isPhoneValid || !selectedCourse) return

        setIsProcessing(true)
        setRegisterError('')
        try {
            const response = await fetch(`${API_BASE_URL}/api/landing/register`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, course_code: selectedCourse.course_code })
            })
            const result = await response.json()
            if (response.status === 422 && result.message) {
                setRegisterError(result.message)
                return
            }

            if (response.ok && result.success === true && result.data?.qr_image_url) {
                setRegistrationData(result.data)
                setShowQR(true)
                trackLead({ type: 'registration_initiated', ...formData, course: selectedCourse.title })
                trackBeginCheckout(result.data.amount, [{ item_name: selectedCourse.title, price: result.data.amount, quantity: 1 }])
            } else {
                alert('Lỗi: ' + (result.message || 'Không thể đăng ký'))
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi kết nối máy chủ.')
        } finally {
            setIsProcessing(false)
        }
    }

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Đăng ký khóa học</h3>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Hoàn tất thanh toán để bắt đầu</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                            {paymentStatus === 'success' ? (
                                <div className="text-center py-12 space-y-6">
                                    <div className="relative inline-block">
                                        <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />
                                        <CheckCircle2 className="w-20 h-20 text-green-500 relative z-10" />
                                    </div>
                                    <h4 className="text-3xl font-black text-white uppercase italic">Thanh toán thành công!</h4>
                                    <p className="text-gray-400">Hệ thống đang kích hoạt khóa học cho bạn. Vui lòng kiểm tra email sau ít phút.</p>
                                    <button onClick={onClose} className="bg-white text-black font-black px-8 py-3 rounded-xl uppercase text-sm">Đóng</button>
                                </div>
                            ) : !showQR ? (
                                <div className="space-y-8">
                                    {/* Course Info Card */}
                                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <ShieldCheck size={80} className="text-secondary" />
                                        </div>
                                        <div className="relative z-10">
                                            <h4 className="text-xl font-bold text-white mb-4">{selectedCourse?.title || 'Đang tải...'}</h4>
                                            <div className="flex items-end gap-3">
                                                <span className="text-3xl font-black text-secondary">
                                                    {selectedCourse ? new Intl.NumberFormat('vi-VN').format(selectedCourse.current_price) : '0'}đ
                                                </span>
                                                <span className="text-gray-500 line-through mb-1 text-sm">3.999.000đ</span>
                                            </div>
                                            <div className="mt-4 flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                                                <AlertCircle size={14} />
                                                Chỉ còn 3 suất ưu đãi cuối cùng
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <InputField label="Họ và tên" name="name" value={formData.name} error={errors.name} onChange={handleInputChange} placeholder="Nguyễn Văn A" />
                                            <InputField label="Số điện thoại" name="phone" value={formData.phone} error={errors.phone} onChange={handleInputChange} placeholder="0912 xxx xxx" />
                                        </div>
                                        <InputField label="Email (Nhận tài khoản)" name="email" value={formData.email} error={errors.email} onChange={handleInputChange} placeholder="email@gmail.com" />
                                    </div>

                                    {registerError && (
                                        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold leading-relaxed text-red-200">
                                            {registerError}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleRegister}
                                        disabled={isProcessing}
                                        className="w-full bg-secondary text-black font-black py-5 rounded-2xl text-lg uppercase shadow-[0_0_50px_rgba(250,204,21,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                    >
                                        {isProcessing ? <Loader2 className="animate-spin" /> : 'TIẾN HÀNH THANH TOÁN'}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-8 text-center">
                                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                                        <div className="p-4 bg-white rounded-[32px] shadow-2xl">
                                            <img src={registrationData?.qr_image_url} alt="QR" className="w-48 h-48 md:w-56 md:h-56" />
                                        </div>
                                        <div className="text-left space-y-4 max-w-xs">
                                            <div className="flex items-center gap-2 text-secondary font-black text-sm uppercase tracking-widest animate-pulse">
                                                <div className="w-2 h-2 bg-secondary rounded-full" />
                                                Đang chờ thanh toán
                                            </div>
                                            <h4 className="text-2xl font-black text-white">Quét mã QR</h4>
                                            <p className="text-gray-400 text-sm">Hệ thống sẽ tự động kích hoạt ngay sau khi nhận được chuyển khoản.</p>
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Nội dung chuyển khoản</p>
                                                <p className="text-secondary font-black text-lg">{registrationData?.transfer_content}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-4 py-4 border-t border-white/5 mt-4">
                                        <div className="flex items-center gap-2 text-red-400 font-bold">
                                            <Timer size={18} />
                                            <span>Mã hết hạn trong: {formatTime(timeLeft)}</span>
                                        </div>
                                        <button onClick={() => setShowQR(false)} className="text-gray-500 hover:text-white text-sm underline">Sửa thông tin</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

const InputField = ({ label, name, value, error, onChange, placeholder }) => (
    <div className="space-y-2">
        <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest ml-2">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full bg-white/[0.03] border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-secondary/50 focus:bg-white/[0.05] transition-all`}
        />
        {error && <p className="text-red-500 text-[10px] font-bold ml-2 uppercase tracking-tighter">{error}</p>}
    </div>
)
