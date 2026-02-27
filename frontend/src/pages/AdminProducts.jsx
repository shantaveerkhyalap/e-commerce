import { useState, useEffect } from 'react'
import { ArrowLeft, Loader2, Package, Trash2, Edit3, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { translations } from '../data/translations'

export default function AdminProducts({ lang }) {
    const navigate = useNavigate()
    const t = translations[lang] || translations.en
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchMyProducts() }, [])

    const fetchMyProducts = async () => {
        try {
            const res = await api.get('/owners/products')
            if (res.data.success) setProducts(res.data.products)
        } catch { toast.error('Failed to load your products') }
        finally { setLoading(false) }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]"><Loader2 className="w-8 h-8 text-[#2874f0] animate-spin" /></div>

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80" alt="bg" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin')} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-wide">{t.myProducts}</h1>
                            <p className="text-sm text-white/30">Manage the items you've added to the store</p>
                        </div>
                    </div>
                    <div className="bg-[#2874f0]/10 border border-[#2874f0]/20 px-4 py-2 rounded-xl">
                        <span className="text-sm font-semibold text-[#2874f0]">{products.length} Products Found</span>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-24 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-md shadow-2xl">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Package className="w-8 h-8 text-white/10" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-1">No products yet</h3>
                        <p className="text-sm text-white/40 mb-6">Start by adding your first product from the admin panel</p>
                        <button onClick={() => navigate('/admin')} className="bg-[#2874f0] hover:bg-[#2874f0]/90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#2874f0]/20">
                            Add Product
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((p) => (
                            <div key={p._id} className="group bg-black/60 border border-white/5 rounded-2xl overflow-hidden hover:border-[#2874f0]/30 transition-all duration-300 backdrop-blur-md shadow-2xl">
                                <div className="aspect-video overflow-hidden relative">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <div className="p-2.5 rounded-xl bg-black/50 backdrop-blur-md text-white/80 hover:text-[#2874f0] hover:bg-black/80 cursor-pointer transition-all border border-white/10" title="Edit">
                                            <Edit3 size={16} />
                                        </div>
                                        <div className="p-2.5 rounded-xl bg-red-500/10 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition-all border border-red-500/20" title="Delete">
                                            <Trash2 size={16} />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-white mb-1 truncate text-lg">{p.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-extrabold text-[#2874f0]">₹{(p.price - (p.discount || 0)).toLocaleString()}</span>
                                            {p.discount > 0 && <span className="text-xs line-through text-white/20">₹{p.price.toLocaleString()}</span>}
                                        </div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#2874f0] bg-[#2874f0]/10 px-2.5 py-1 rounded">
                                            {p.category || 'scatch'}
                                        </div>
                                    </div>
                                    <div className="mt-5 pt-5 border-t border-white/5 flex gap-2">
                                        <button onClick={() => navigate(`/product/${p._id}`)} className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 hover:text-[#2874f0] text-white text-xs font-bold py-3 rounded-xl transition-all border border-white/5">
                                            <ExternalLink size={14} /> View Page
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
