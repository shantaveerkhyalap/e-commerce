import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Store } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'

export default function Login({ setUser }) {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ email: '', password: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.post('/users/login', form)
            if (res.data.success) {
                toast.success('Welcome back! 🎉')
                const meRes = await api.get('/me')
                if (meRes.data.success) setUser(meRes.data.user)
                navigate('/shop')
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left image panel */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" alt="Fashion" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-900/20 to-dark-900/60"></div>
                <div className="absolute bottom-12 left-12 right-12">
                    <div className="bg-dark-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <p className="text-white font-medium text-lg mb-1">"Best shopping experience I've ever had!"</p>
                        <p className="text-white/50 text-sm">— Priya S., Verified Buyer</p>
                    </div>
                </div>
            </div>

            {/* Right form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-dark-900 relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 opacity-35">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" alt="bg" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900"></div>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    <Link to="/" className="flex items-center gap-2.5 mb-10 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
                            <Store size={20} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">Scatch</span>
                    </Link>

                    <h2 className="text-3xl font-extrabold text-white mb-2 text-center">Sign in</h2>
                    <p className="text-dark-100 mb-8 text-center">Welcome back! Enter your credentials to continue.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-xs font-medium text-dark-100 mb-1.5 block">Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-200" />
                                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="you@example.com" required
                                    className="w-full pl-10 pr-4 py-3.5 bg-dark-700/50 border border-dark-400/30 rounded-xl text-white placeholder-dark-200 focus:outline-none focus:border-primary-500/70 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-dark-100 mb-1.5 block">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-200" />
                                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="••••••••" required
                                    className="w-full pl-10 pr-11 py-3.5 bg-dark-700/50 border border-dark-400/30 rounded-xl text-white placeholder-dark-200 focus:outline-none focus:border-primary-500/70 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-200 hover:text-white transition-colors cursor-pointer">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-primary-500 hover:to-primary-400 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <> Sign in <ArrowRight size={17} /></>}
                        </button>
                    </form>

                    <p className="text-center text-dark-100 text-sm mt-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">Sign up free</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
