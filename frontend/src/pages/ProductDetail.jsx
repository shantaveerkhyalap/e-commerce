import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw, Loader2, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { PRODUCTS } from '../data/products'
import { translations } from '../data/translations'

export default function ProductDetail({ lang }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [adding, setAdding] = useState(false)
    const t = translations[lang] || translations.en

    const product = PRODUCTS.find(p => p._id === id)
    if (!product) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-lg mb-2">Product not found</p>
                    <button onClick={() => navigate('/shop')} className="text-[#2874f0] text-sm cursor-pointer">← {t.browseShop}</button>
                </div>
            </div>
        )
    }

    const finalPrice = Number(product.price) - Number(product.discount || 0)
    const similar = PRODUCTS.filter(p => p.category === product.category && p._id !== product._id).slice(0, 6)
    const recommended = PRODUCTS.filter(p => p.category !== product.category).sort(() => 0.5 - Math.random()).slice(0, 6)

    const addToCart = async () => {
        if (!product.fromDb) return toast('Featured preview product', { icon: '👀' })
        setAdding(true)
        try {
            const res = await api.post(`/addtocart/${product._id}`)
            if (res.data.success) toast.success('Added to cart! 🛒')
        } catch { toast.error('Failed') }
        finally { setAdding(false) }
    }

    const buyNow = () => {
        navigate('/payment', { state: { items: [product], bill: finalPrice, mode: 'single' } })
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" alt="bg" className="w-full h-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Back */}
                <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors mb-6 cursor-pointer">
                    <ArrowLeft size={15} /> {t.back}
                </button>

                {/* Product */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Image */}
                    <div className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center">
                        <span className="text-xs text-[#2874f0] font-semibold uppercase tracking-wider mb-2 capitalize">{product.category}</span>
                        <h1 className="text-3xl font-extrabold text-white mb-3">{product.name}</h1>
                        <p className="text-white/60 leading-relaxed mb-6">{product.desc}</p>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-extrabold text-[#2874f0]">₹{finalPrice.toLocaleString()}</span>
                            {product.discount > 0 && (
                                <>
                                    <span className="text-lg line-through text-white/20">₹{Number(product.price).toLocaleString()}</span>
                                    <span className="text-sm text-green-400 font-semibold">Save ₹{product.discount}</span>
                                </>
                            )}
                        </div>

                        {/* Star rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className={s <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'} />)}
                            </div>
                            <span className="text-sm text-white/40">4.{Math.floor(Math.random() * 5 + 5)} (1{Math.floor(Math.random() * 9)}k reviews)</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mb-8">
                            <button onClick={addToCart} disabled={adding}
                                className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-medium py-3.5 rounded-xl hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50 backdrop-blur-sm">
                                {adding ? <Loader2 size={16} className="animate-spin" /> : <><ShoppingCart size={16} /> {t.addToCart}</>}
                            </button>
                            <button onClick={buyNow}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#2874f0] to-[#2874f0]/80 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-[#2874f0]/20 cursor-pointer">
                                {t.buyNow}
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-3">
                            <Feature icon={<Truck size={16} />} title={t.freeShip} desc="Over ₹499" />
                            <Feature icon={<Shield size={16} />} title={t.secure} desc="Encrypted" />
                            <Feature icon={<RotateCcw size={16} />} title={t.returns} desc="7 days" />
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                {similar.length > 0 && (
                    <ProductRow title={t.similarProducts} subtitle="More from this category" products={similar} navigate={navigate} />
                )}

                {/* Recommendations */}
                {recommended.length > 0 && (
                    <ProductRow title={t.youMightLike} subtitle="Recommended for you" products={recommended} navigate={navigate} />
                )}
            </div>
        </div>
    )
}

function Feature({ icon, title, desc }) {
    return (
        <div className="bg-black/40 border border-white/5 backdrop-blur-md rounded-xl p-3 text-center">
            <div className="text-[#2874f0] flex justify-center mb-1">{icon}</div>
            <p className="text-xs font-semibold text-white">{title}</p>
            <p className="text-[10px] text-white/25">{desc}</p>
        </div>
    )
}

function ProductRow({ title, subtitle, products, navigate }) {
    return (
        <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
            <p className="text-sm text-white/25 mb-5">{subtitle}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {products.map(p => {
                    const fp = Number(p.price) - Number(p.discount || 0)
                    return (
                        <div key={p._id} onClick={() => { navigate(`/product/${p._id}`); window.scrollTo(0, 0) }}
                            className="group bg-black/40 rounded-xl overflow-hidden border border-white/5 hover:border-[#2874f0]/30 transition-all cursor-pointer hover:-translate-y-0.5 backdrop-blur-sm shadow-xl">
                            <div className="aspect-square overflow-hidden bg-[#1a1a22]">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-2.5">
                                <h3 className="text-xs font-medium text-white truncate">{p.name}</h3>
                                <span className="text-sm font-bold text-[#2874f0]">₹{fp.toLocaleString()}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
