import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Plus, Check, Save, Lock, LogOut, Globe, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { translations } from '../data/translations'

export default function Profile({ user, setUser, lang }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const t = translations[lang] || translations.en
    const [form, setForm] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        contact: user?.contact || '',
    })

    // Simulated addresses state
    const [addresses, setAddresses] = useState([
        { id: 1, type: 'Home', text: '123 Tech Park Road, Bengaluru, Karnataka 560001', isDefault: true },
        { id: 2, type: 'Work', text: 'Floor 4, Innovation Building, Whitefield, Bengaluru', isDefault: false }
    ])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.put('/me', { fullname: form.fullname, contact: form.contact })
            if (res.data.success) { toast.success('Profile updated! ✨'); setUser(res.data.user) }
        } catch (err) { toast.error(err.response?.data?.message || 'Update failed') }
        finally { setLoading(false) }
    }

    const handleLogout = async () => {
        try {
            await api.post('/users/logout')
            setUser(null)
            toast.success('Logged out')
            navigate('/')
        } catch { toast.error('Logout failed') }
    }

    const setAsDefaultAddress = (id) => {
        setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })))
        toast.success('Default address updated')
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-[#0a0a0f] relative overflow-hidden py-10">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt="bg" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* Left Sidebar */}
                <div className="md:col-span-4 space-y-4">
                    <div className="bg-black/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 text-center shadow-xl">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#2874f0] to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-primary-500/20 mb-4 border-4 border-[#0a0a0f]">
                            {(user?.fullname || user?.email || 'U')[0].toUpperCase()}
                        </div>
                        <h1 className="text-xl font-bold text-white">{user?.fullname || 'User'}</h1>
                        <p className="text-sm text-white/40 mb-6">{user?.email}</p>

                        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold py-3 rounded-xl transition-all">
                            <LogOut size={16} /> {t.logout}
                        </button>
                    </div>

                    <div className="bg-black/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-xl">
                        <h3 className="text-sm font-bold text-white mb-4">Preferences</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <Globe size={16} className="text-white/40" /> {t.language}
                                </div>
                                <span className="bg-white/5 border border-white/10 rounded-lg text-xs text-white px-3 py-1 font-medium capitalize">
                                    {translations[lang]?.language_name || lang}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="md:col-span-8 space-y-6">

                    {/* Personal Info */}
                    <form onSubmit={handleSubmit} className="bg-black/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2"><User size={18} className="text-[#2874f0]" /> {t.profile}</h2>
                            <Link to="/change-password" className="text-xs font-semibold text-[#2874f0] hover:text-primary-300 flex items-center gap-1">
                                <Lock size={12} /> {t.changePassword}
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5 mb-5">
                            <ProfileInput icon={<User size={15} />} label={t.fullName} type="text" value={form.fullname} onChange={(v) => setForm({ ...form, fullname: v })} placeholder="Your name" />
                            <ProfileInput icon={<Mail size={15} />} label="Email" type="email" value={form.email} onChange={() => { }} placeholder="Email" disabled />
                        </div>
                        <div className="mb-6">
                            <ProfileInput icon={<Phone size={15} />} label={t.contactNumber} type="tel" value={form.contact} onChange={(v) => setForm({ ...form, contact: v })} placeholder="e.g., 9876543210" />
                        </div>

                        <button type="submit" disabled={loading} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#2874f0] to-[#2874f0]/80 hover:from-primary-500 hover:to-primary-400 text-white text-sm font-semibold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary-500/20 disabled:opacity-50">
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <><Save size={16} /> {t.updateProfile}</>}
                        </button>
                    </form>

                    {/* Saved Addresses */}
                    <div className="bg-black/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2"><MapPin size={18} className="text-green-400" /> {t.manageAddresses}</h2>
                            <button className="text-xs font-semibold text-green-400 hover:text-green-300 flex items-center gap-1">
                                <Plus size={14} /> Add New
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {addresses.map(addr => (
                                <div key={addr.id} onClick={() => setAsDefaultAddress(addr.id)} className={`relative p-5 rounded-xl border transition-all cursor-pointer ${addr.isDefault ? 'bg-green-500/5 border-green-500/30 shadow-md shadow-green-500/5' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
                                    {addr.isDefault && <div className="absolute top-4 right-4 text-green-400"><Check size={16} /></div>}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${addr.isDefault ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/50'}`}>{addr.type}</span>
                                        {addr.isDefault && <span className="text-[10px] text-green-400 font-medium">· Default</span>}
                                    </div>
                                    <p className="text-xs text-white/70 leading-relaxed pr-6">{addr.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

function ProfileInput({ icon, label, type, value, onChange, placeholder, disabled = false }) {
    return (
        <div>
            <label className="text-[10px] font-semibold text-white/40 mb-1.5 block uppercase tracking-wider">{label}</label>
            <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">{icon}</span>
                <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
                    className={`w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#2874f0]/50 focus:bg-black/60 transition-all text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} />
            </div>
        </div>
    )
}
