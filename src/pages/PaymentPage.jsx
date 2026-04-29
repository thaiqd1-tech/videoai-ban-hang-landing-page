import React, { useState, useEffect } from 'react'
import { ArrowLeft, QrCode, CheckCircle2 } from 'lucide-react'
import TagManager from 'react-gtm-module'
import { trackPageView, trackBeginCheckout, trackLead } from '../utils/gtm'
import { API_BASE_URL } from '../constants/api'

const PaymentPage = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [registrationData, setRegistrationData] = useState(null)
  const [showQR, setShowQR] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState('pending') // pending, success, failed
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [registerError, setRegisterError] = useState('')

  // Fetch courses on mount
  useEffect(() => {
    trackPageView('Trang thanh toán khóa học')
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/landing/courses`, {
        headers: { 'Accept': 'application/json' }
      })
      const result = await response.json()
      if (result.success) {
        setCourses(result.data)
        if (result.data.length > 0) {
          // Lọc khóa học UGC (giá 486k) để khớp với landing page
          const targetCourse = result.data.find(c => c.course_code === 'UGC')
          setSelectedCourse(targetCourse || result.data[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    }
  }

  // Timer effect
  useEffect(() => {
    if (!showQR) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowQR(false)
          return 15 * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showQR])

  // Polling effect
  useEffect(() => {
    let interval
    if (showQR && paymentStatus !== 'success') {
      interval = setInterval(() => {
        checkPaymentStatus()
      }, 5000)
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

        // Track purchase event
        TagManager.dataLayer({
          dataLayer: {
            event: 'purchase',
            ecommerce: {
              transaction_id: result.registration_id,
              value: selectedCourse.current_price || 999000,
              currency: 'VND',
              items: [{
                item_name: selectedCourse.title,
                category: 'Khóa học',
                price: selectedCourse.current_price || 999000,
                quantity: 1
              }]
            }
          }
        })

        // Track Purchase Success (Custom Event)
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          'event': 'purchase_success',
          'transaction_id': result.registration_id,
          'value': selectedCourse.current_price || 999000,
          'currency': 'VND'
        })

        // Track Meta Pixel Purchase
        if (window.fbq) {
          window.fbq('track', 'Purchase', {
            value: selectedCourse.current_price || 999000,
            currency: 'VND',
            contents: [{
              id: selectedCourse.course_code,
              quantity: 1
            }],
            content_type: 'product'
          })
        }

        // Success redirect or message
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
      }
    } catch (error) {
      console.error('Status check error:', error)
    }
  }

  const validateField = (name, value) => {
    let error = ''
    if (!value || value.trim() === '') {
      switch (name) {
        case 'name': error = 'Vui lòng nhập họ và tên'; break
        case 'email': error = 'Vui lòng nhập email'; break
        case 'phone': error = 'Vui lòng nhập số điện thoại'; break
      }
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Email không hợp lệ'
    } else if (name === 'phone' && !/(0[3-9][0-9]{8}|84[3-9][0-9]{8})/.test(value.replace(/[^0-9+]/g, ''))) {
      error = 'Số điện thoại không hợp lệ'
    }
    setErrors(prev => ({ ...prev, [name]: error }))
    return error === ''
  }

  const isFormValid = () => {
    return formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      errors.name === '' &&
      errors.email === '' &&
      errors.phone === '' &&
      selectedCourse !== null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setRegisterError('')
    validateField(name, value)
  }

  const handleRegister = async () => {
    if (!isFormValid()) return

    setIsProcessing(true)
    setRegisterError('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/landing/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          course_code: selectedCourse.course_code
        })
      })
      const result = await response.json()
      if (response.status === 422 && result.message) {
        setRegisterError(result.message)
        return
      }

      if (response.ok && result.success === true && result.data?.qr_image_url) {
        setRegistrationData(result.data)
        setShowQR(true)

        // Track lead generation
        trackLead({
          type: 'registration_initiated',
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          course: selectedCourse.title,
          status: 'pending'
        })

        // Track checkout initiation
        trackBeginCheckout(result.data.amount, [{
          item_name: selectedCourse.title,
          category: 'Khóa học',
          price: result.data.amount,
          quantity: 1
        }])

        // Track Meta Pixel Lead
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: selectedCourse.title,
            content_category: 'Khóa học',
            value: result.data.amount,
            currency: 'VND'
          })
        }
      } else {
        alert('Đăng ký không thành công: ' + JSON.stringify(result.errors || result.message || 'Lỗi hệ thống'))
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Có lỗi xảy ra khi kết nối máy chủ.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/10 blur-[150px] rounded-full -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full -z-10" />

        <div className="max-w-md w-full bg-white/[0.03] backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10 relative shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400" />

          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
            <CheckCircle2 className="w-24 h-24 text-green-500 relative z-10" />
          </div>

          <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">Thanh toán <br /> thành công!</h1>

          <div className="space-y-4 mb-8">
            <p className="text-gray-400 leading-relaxed">
              Cảm ơn bạn đã đăng ký khóa học <strong>{selectedCourse?.title}</strong>.
            </p>
          </div>

          <div className="p-4 bg-green-500/5 rounded-xl mb-8 border border-green-500/20">
            <p className="text-[10px] text-green-500 font-black uppercase tracking-widest mb-1">TRẠNG THÁI GIAO DỊCH</p>
            <p className="text-white font-black text-xl tracking-tight">ĐÃ HOÀN TẤT</p>
          </div>

          <div className="space-y-3 text-sm text-gray-500 mb-10">
            <p>Thông tin truy cập đã được gửi qua Email.</p>
            <p className="italic">Vui lòng kiểm tra cả hộp thư Spam.</p>
          </div>

          <p className="text-gray-500 text-xs animate-pulse">Đang chuyển hướng về trang chủ...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
          <h1 className="text-4xl font-black mb-6">Thanh toán khóa học</h1>

          <div className="space-y-6">
            <div className="border border-white/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedCourse ? selectedCourse.title : 'Đang tải thông tin khóa học...'}
              </h2>
              {selectedCourse && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Giá gốc:</span>
                    <span className="line-through text-gray-400">
                      4.860.000đ
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Giá ưu đãi:</span>
                    <span className="text-3xl font-black text-yellow-400">
                      {new Intl.NumberFormat('vi-VN').format(selectedCourse.current_price)}đ
                    </span>
                  </div>
                </>
              )}
              <div className="text-red-400 text-sm font-bold">
                ⚠️ Ưu đãi chỉ còn lại một vài suất cuối cùng
              </div>
            </div>

            {!showQR ? (
              <>
                <div className="border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Thông tin thanh toán</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Họ và tên</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 ${errors.name ? 'border-red-500' : 'border-white/20'
                          }`}
                        placeholder="Nhập họ và tên của bạn"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 ${errors.email ? 'border-red-500' : 'border-white/20'
                          }`}
                        placeholder="Nhập email của bạn"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 ${errors.phone ? 'border-red-500' : 'border-white/20'
                          }`}
                        placeholder="Nhập số điện thoại của bạn"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </form>
                </div>
                {registerError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold leading-relaxed text-red-200">
                    {registerError}
                  </div>
                )}
                <button
                  onClick={handleRegister}
                  disabled={!isFormValid() || isProcessing}
                  className={`w-full font-black py-6 rounded-2xl text-xl transition-all ${isFormValid() && !isProcessing
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.3)]'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                    }`}
                >
                  {isProcessing ? 'ĐANG XỬ LÝ...' : 'TIẾN HÀNH THANH TOÁN'}
                </button>
              </>
            ) : (
              <div className="border border-white/20 rounded-xl p-6 text-center space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-2xl">
                    <img
                      src={registrationData?.qr_image_url}
                      alt="QR Code Thanh toán"
                      className="w-64 h-64"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Quét mã QR để thanh toán</h3>
                  <p className="text-gray-300">
                    Số tiền: <span className="text-yellow-400 font-black text-3xl">
                      {new Intl.NumberFormat('vi-VN').format(registrationData?.amount)} đ
                    </span>
                  </p>
                </div>

                <div className="border border-white/10 bg-white/5 rounded-2xl p-6 text-left space-y-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-gray-400">Nội dung chuyển khoản:</span>
                    <span className="font-black text-yellow-400 text-lg">{registrationData?.transfer_content}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 italic text-center !mt-4 uppercase tracking-widest">
                    Vui lòng giữ nguyên nội dung chuyển khoản để hệ thống tự động kích hoạt
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-center gap-3 text-secondary animate-pulse font-bold">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Đang chờ xác nhận thanh toán...
                  </div>
                  <p className="text-sm text-gray-400">
                    Mã QR sẽ hết hạn sau: <span className="text-red-400 font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
                  </p>
                  <button
                    onClick={() => setShowQR(false)}
                    className="text-white/50 hover:text-white underline text-sm"
                  >
                    Quay lại sửa thông tin
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
