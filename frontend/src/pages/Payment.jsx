import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CreditCard, Lock, CheckCircle, Loader2, ArrowLeft, ShieldCheck, Smartphone, Building, Wallet, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'

export default function Payment() {
    const navigate = useNavigate()
    const location = useLocation()
    const { items = [], bill = 0, mode = 'cart' } = location.state || {}
    const [step, setStep] = useState('form') // form | processing | success
    const [method, setMethod] = useState('card')

    // Form states
    const [form, setForm] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' })
    const [upiId, setUpiId] = useState('')

    useEffect(() => {
        if (!items.length) navigate('/cart')
    }, [items, navigate])

    const formatCard = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
    const formatExpiry = (val) => {
        const clean = val.replace(/\D/g, '').slice(0, 4)
        return clean.length > 2 ? clean.slice(0, 2) + '/' + clean.slice(2) : clean
    }

    const handlePay = async (e) => {
        e.preventDefault()

        // Validation based on method
        if (method === 'card') {
            if (form.cardNumber.replace(/\s/g, '').length < 16) return toast.error('Enter valid card number')
            if (form.cvv.length < 3) return toast.error('Enter valid CVV')
        } else if (method === 'upi') {
            if (!upiId.includes('@') || upiId.length < 5) return toast.error('Enter a valid UPI ID')
        }

        setStep('processing')
        try {
            // Simulate payment processing delay
            await new Promise((r) => setTimeout(r, 2000))

            if (mode === 'single' && items[0]) {
                const res = await api.post(`/orders/${items[0]._id}`)
                if (res.data.success) {
                    await api.delete(`/cart/${items[0]._id}`)
                }
            } else {
                await api.post('/checkout')
            }
            setStep('success')
            setTimeout(() => navigate('/orders'), 2500)
        } catch (err) {
            setStep('form')
            toast.error(err.response?.data?.message || 'Payment failed')
        }
    }

    if (step === 'processing') {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={40} className="text-[#2874f0] animate-spin mx-auto mb-4" />
                    <p className="text-white font-medium text-lg">Processing your payment...</p>
                    <p className="text-xs text-white/40 mt-2">Please do not close this window or go back</p>
                </div>
            </div>
        )
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="text-center animate-in zoom-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 border border-green-500/20 shadow-lg shadow-green-500/10">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
                    <p className="text-white/60">₹{bill} paid successfully</p>
                    <p className="text-xs text-white/30 tracking-widest uppercase mt-4">Redirecting to orders</p>
                </div>
            </div>
        )
    }

    const paymentMethods = [
        { id: 'upi', label: 'UPI - Google Pay, PhonePe, Paytm', icon: <Smartphone size={18} /> },
        { id: 'card', label: 'Credit / Debit / ATM Card', icon: <CreditCard size={18} /> },
        { id: 'netbanking', label: 'Net Banking', icon: <Building size={18} /> },
        { id: 'cod', label: 'Cash on Delivery', icon: <Wallet size={18} /> }
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden py-10">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?w=1600&q=80" alt="bg" className="w-full h-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold text-white tracking-wide">Checkout</h1>
                </div>

                <div className="grid lg:grid-cols-[1fr_350px] gap-6 items-start">

                    {/* Left Col: Payment Selection & Form */}
                    <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden">
                        <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                            <h2 className="text-lg font-bold text-white">Payment Options</h2>
                        </div>

                        <div className="p-2 space-y-1">
                            {paymentMethods.map((pm) => (
                                <div key={pm.id} className={`rounded-xl transition-all duration-300 ${method === pm.id ? 'bg-white/5 border border-white/10' : 'border border-transparent hover:bg-white/[0.02]'}`}>
                                    {/* Method Header */}
                                    <label className="flex items-center gap-4 p-4 cursor-pointer">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${method === pm.id ? 'border-[#2874f0]' : 'border-white/20'}`}>
                                            {method === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-[#2874f0]"></div>}
                                        </div>
                                        <input type="radio" name="paymentMethod" value={pm.id} checked={method === pm.id} onChange={(e) => setMethod(e.target.value)} className="hidden" />
                                        <div className={`p-2 rounded-lg ${method === pm.id ? 'bg-[#2874f0]/10 text-[#2874f0]' : 'bg-white/5 text-white/40'}`}>
                                            {pm.icon}
                                        </div>
                                        <span className={`font-medium ${method === pm.id ? 'text-white' : 'text-white/60'}`}>{pm.label}</span>
                                    </label>

                                    {/* Method Expanded Content */}
                                    {method === pm.id && pm.id === 'card' && (
                                        <div className="px-4 pb-5 pt-1 pl-14 animate-in fade-in slide-in-from-top-2">
                                            <div className="space-y-4">
                                                <div>
                                                    <input type="text" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: formatCard(e.target.value) })}
                                                        placeholder="Card Number" maxLength={19}
                                                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#2874f0]/50 focus:ring-1 focus:ring-[#2874f0]/30 text-sm font-mono transition-all" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <input type="text" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                                                        placeholder="Valid Thru (MM/YY)" maxLength={5}
                                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#2874f0]/50 focus:ring-1 focus:ring-[#2874f0]/30 text-sm font-mono transition-all" />
                                                    <input type="password" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                                                        placeholder="CVV" maxLength={4}
                                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#2874f0]/50 focus:ring-1 focus:ring-[#2874f0]/30 text-sm font-mono transition-all" />
                                                </div>
                                                <button onClick={handlePay} className="mt-2 text-sm font-bold bg-[#2874f0] hover:bg-[#2874f0]/90 text-white px-8 py-3 rounded-lg shadow-lg shadow-[#2874f0]/20 transition-all">
                                                    PAY ₹{bill}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {method === pm.id && pm.id === 'upi' && (
                                        <div className="px-4 pb-5 pt-1 pl-14 animate-in fade-in slide-in-from-top-2">
                                            <div className="space-y-4">
                                                <div>
                                                    <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)}
                                                        placeholder="Enter your UPI ID (e.g., name@okhdfcbank)"
                                                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#2874f0]/50 focus:ring-1 focus:ring-[#2874f0]/30 text-sm transition-all" />
                                                    <p className="text-[11px] text-white/30 mt-2">The payment request will be sent to the UPI app linked to this ID.</p>
                                                </div>
                                                <button onClick={handlePay} className="mt-2 text-sm font-bold bg-[#2874f0] hover:bg-[#2874f0]/90 text-white px-8 py-3 rounded-lg shadow-lg shadow-[#2874f0]/20 transition-all">
                                                    VERIFY & PAY ₹{bill}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {method === pm.id && pm.id === 'netbanking' && (
                                        <div className="px-4 pb-5 pt-1 pl-14 animate-in fade-in slide-in-from-top-2">
                                            <p className="text-sm text-white/50 mb-4">Select your bank from the list to proceed with Net Banking.</p>
                                            <select className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#2874f0]/50 text-sm appearance-none cursor-pointer">
                                                <option value="">Select Bank</option>
                                                <option value="sbi">State Bank of India</option>
                                                <option value="hdfc">HDFC Bank</option>
                                                <option value="icici">ICICI Bank</option>
                                                <option value="axis">Axis Bank</option>
                                            </select>
                                            <button onClick={handlePay} className="mt-4 text-sm font-bold bg-[#2874f0] hover:bg-[#2874f0]/90 text-white px-8 py-3 rounded-lg shadow-lg shadow-[#2874f0]/20 transition-all">
                                                PAY ₹{bill}
                                            </button>
                                        </div>
                                    )}

                                    {method === pm.id && pm.id === 'cod' && (
                                        <div className="px-4 pb-5 pt-1 pl-14 animate-in fade-in slide-in-from-top-2">
                                            <div className="bg-[#0a0a0f] border border-white/5 rounded-xl p-4 flex gap-3">
                                                <Wallet className="text-white/40 flex-shrink-0" size={20} />
                                                <div>
                                                    <p className="text-sm font-medium text-white/90">Pay on Delivery</p>
                                                    <p className="text-xs text-white/50 mt-1">Please have exact amount ready when your order arrives. UPI is also supported at the time of delivery.</p>
                                                </div>
                                            </div>
                                            <button onClick={handlePay} className="mt-4 w-full sm:w-auto text-sm font-bold bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg shadow-lg transition-all">
                                                PLACE ORDER
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Col: Price Details */}
                    <div className="bg-black/60 border border-white/5 rounded-2xl p-5 sticky top-24 backdrop-blur-md">
                        <h2 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4 border-b border-white/5 pb-3">Price Details</h2>

                        <div className="space-y-4 text-sm mb-4 border-b border-white/5 pb-4">
                            <div className="flex justify-between text-white/80">
                                <span>Subtotal ({items.length} items)</span>
                                <span>₹{items.reduce((s, i) => s + Number(i.price), 0)}</span>
                            </div>
                            <div className="flex justify-between text-white/80">
                                <span>Shipping Fees</span>
                                <span>₹{items.length * 20}</span>
                            </div>
                            <div className="flex justify-between text-green-400 font-medium">
                                <span>Discount Redeemed</span>
                                <span>-₹{items.reduce((s, i) => s + Number(i.discount || 0), 0)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-bold text-white">Amount Payable</span>
                            <span className="text-xl font-bold text-white">₹{bill}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-white/40 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                            <ShieldCheck size={16} className="text-green-500" />
                            <span>Safe and secure payments. 100% Authentic products.</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
