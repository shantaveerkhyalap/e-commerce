import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'

export default function ChangePassword() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState({ current: false, next: false, confirm: false })
    const [form, setForm] = useState({ password: '', confirmPassword: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password.length < 4) return toast.error('Password must be at least 4 characters')
        if (form.password !== form.confirmPassword) return toast.error('Passwords do not match')
        setLoading(true)
        try {
            const res = await api.put('/me', { password: form.password })
            if (res.data.success) {
                toast.success('Password changed! 🔒')
                navigate('/profile')
            }
        } catch (err) { toast.error(err.response?.data?.message || 'Failed to update') }
        finally { setLoading(false) }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center px-4">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 opacity-35">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10 w-full max-w-sm">
                <Link to="/profile" className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors mb-6">
                    <ArrowLeft size={13} /> Back to Profile
                </Link>

                <div className="bg-[#13131a] border border-white/5 rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                        <Lock size={18} className="text-primary-400" />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-1">Change Password</h2>
                    <p className="text-xs text-white/30 mb-6">Enter your new password below.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-[10px] font-medium text-white/40 mb-1 block uppercase tracking-wider">New Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                                <input type={show.next ? 'text' : 'password'} value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min. 4 characters" required
                                    className="w-full pl-9 pr-9 py-2.5 bg-white/5 border border-white/5 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-primary-500/50 transition-all text-xs" />
                                <button type="button" onClick={() => setShow({ ...show, next: !show.next })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 cursor-pointer">
                                    {show.next ? <EyeOff size={13} /> : <Eye size={13} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-medium text-white/40 mb-1 block uppercase tracking-wider">Confirm Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                                <input type={show.confirm ? 'text' : 'password'} value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Re-enter password" required
                                    className="w-full pl-9 pr-9 py-2.5 bg-white/5 border border-white/5 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-primary-500/50 transition-all text-xs" />
                                <button type="button" onClick={() => setShow({ ...show, confirm: !show.confirm })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 cursor-pointer">
                                    {show.confirm ? <EyeOff size={13} /> : <Eye size={13} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 cursor-pointer">
                            {loading ? <Loader2 size={14} className="animate-spin" /> : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
