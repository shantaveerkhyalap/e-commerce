import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Loader2, Package, Palette, ImagePlus, Store as Storefront } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'

import { translations } from '../data/translations'

export default function AdminPanel({ lang }) {
    const navigate = useNavigate()
    const t = translations[lang] || translations.en
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '', price: '', discount: '', category: '',
        bgcolor: '#2874f0', panelcolor: '#f0f5ff', textcolor: '#000000',
    })
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) { setImage(file); setPreview(URL.createObjectURL(file)) }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image) return toast.error('Please select a product image')
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', image)
            Object.entries(form).forEach(([k, v]) => formData.append(k, v || (k === 'discount' ? '0' : '')))
            const res = await api.post('/products/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            if (res.data.success) {
                toast.success('Product created! 🎉')
                setForm({ name: '', price: '', discount: '', category: '', bgcolor: '#2874f0', panelcolor: '#f0f5ff', textcolor: '#000000' })
                setImage(null); setPreview(null)
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed – are you an owner?')
        } finally { setLoading(false) }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden pt-16">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" alt="bg" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10">
                {/* Hero */}
                <div className="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80" alt="Admin" className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-4xl mx-auto px-4 w-full flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{t.adminPanel}</h1>
                                <p className="text-white/40 mt-1">{t.createManageProducts}</p>
                            </div>
                            <button onClick={() => navigate('/admin/products')} className="flex items-center gap-2 bg-[#2874f0] hover:bg-[#2874f0]/90 text-white px-5 py-2.5 rounded-xl transition-all text-sm font-semibold shadow-lg shadow-[#2874f0]/20">
                                <Package size={18} /> {t.myProducts}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-8 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl">
                                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <Storefront size={24} className="text-[#2874f0]" /> {t.bestSellerTitle}
                                </h2>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    {t.sellerHubDesc}
                                </p>
                            </div>

                            <div className="bg-[#2874f0]/10 border border-[#2874f0]/20 rounded-2xl p-6 backdrop-blur-md">
                                <h3 className="text-sm font-bold text-[#2874f0] uppercase tracking-wider mb-2">Pro Tip</h3>
                                <p className="text-xs text-white/60 italic">Use bright background colors for summer collections and subtle tones for formal wear.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="lg:col-span-3 bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                            {/* Image */}
                            <label className="block cursor-pointer">
                                <span className="text-sm font-semibold text-white/70 mb-2 block">{t.productImage}</span>
                                <div className="relative h-56 bg-black/40 border-2 border-dashed border-white/10 rounded-2xl overflow-hidden hover:border-[#2874f0]/50 transition-all group">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-contain p-4" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-2 group-hover:text-[#2874f0] transition-colors">
                                            <ImagePlus size={40} />
                                            <span className="text-sm font-medium">{t.clickToUpload}</span>
                                            <span className="text-[10px] uppercase tracking-widest">JPG, PNG up to 5MB</span>
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </div>
                            </label>

                            {/* Name & Category */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-white/70 mb-2 block">{t.productName}</label>
                                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="e.g., Premium Wireless Headphones" required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#2874f0] transition-all text-sm" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-white/70 mb-2 block">Category</label>
                                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2874f0] transition-all text-sm appearance-none cursor-pointer">
                                        <option value="" className="bg-[#121212]">Select Category</option>
                                        <option value="fashion" className="bg-[#121212]">Fashion</option>
                                        <option value="electronics" className="bg-[#121212]">Electronics</option>
                                        <option value="bags" className="bg-[#121212]">Bags</option>
                                        <option value="footwear" className="bg-[#121212]">Footwear</option>
                                        <option value="grocery" className="bg-[#121212]">Grocery</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price + Discount */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-white/70 mb-2 block">{t.price} (₹)</label>
                                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        placeholder="999" required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#2874f0] transition-all text-sm" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-white/70 mb-2 block">{t.discount} (₹)</label>
                                    <input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })}
                                        placeholder="0"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#2874f0] transition-all text-sm" />
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-white/70 mb-3"><Palette size={16} /> {t.cardColors}</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <ColorPicker label={t.background} value={form.bgcolor} onChange={(v) => setForm({ ...form, bgcolor: v })} />
                                    <ColorPicker label={t.panel} value={form.panelcolor} onChange={(v) => setForm({ ...form, panelcolor: v })} />
                                    <ColorPicker label={t.text} value={form.textcolor} onChange={(v) => setForm({ ...form, textcolor: v })} />
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#fb641b] to-[#ff5722] hover:from-[#ff5722] hover:to-[#fb641b] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 cursor-pointer text-sm uppercase tracking-widest mt-4">
                                {loading ? <Loader2 size={18} className="animate-spin" /> : t.createProduct}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ColorPicker({ label, value, onChange }) {
    return (
        <div>
            <span className="text-xs text-dark-200 mb-1 block">{label}</span>
            <div className="flex items-center gap-2 bg-dark-600/40 border border-dark-400/30 rounded-lg px-3 py-2">
                <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0" />
                <span className="text-xs text-dark-100 font-mono">{value}</span>
            </div>
        </div>
    )
}
