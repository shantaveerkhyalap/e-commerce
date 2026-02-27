import { useState, useEffect } from 'react'
import { ShoppingCart, Loader2, Search, MapPin, ArrowLeft } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { PRODUCTS } from '../data/products'

import { translations } from '../data/translations'

export default function Shop({ user, lang }) {
    const navigate = useNavigate()
    const t = translations[lang] || translations.en
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get('q') || ''
    const categoryFilter = searchParams.get('category') || ''

    const [dbProducts, setDbProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [addingToCart, setAddingToCart] = useState(null)
    const [address] = useState('Bengaluru, Karnataka, India')

    useEffect(() => { fetchShop() }, [])

    const fetchShop = async () => {
        try {
            const res = await api.get('/shop')
            if (res?.data?.success) setDbProducts(res.data.products.map(p => ({ ...p, fromDb: true })))
        } catch { }
        finally { setLoading(false) }
    }

    const allProducts = [...dbProducts, ...PRODUCTS]
    const filtered = allProducts.filter(p => {
        const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !categoryFilter || (p.category && p.category.toLowerCase() === categoryFilter.toLowerCase())
        return matchesSearch && matchesCategory
    })

    const addToCart = async (e, product) => {
        e.stopPropagation()
        setAddingToCart(product._id)
        try {
            const res = await api.post(`/addtocart/${product._id}`)
            if (res.data.success) {
                toast.success('Added to cart! 🛒')
                // Proactively update user's cart count for immediate UI feedback
                if (user && user.cart) {
                    user.cart.push(product._id)
                }
            }
        } catch { toast.error('Failed to add') }
        finally { setAddingToCart(null) }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]"><Loader2 className="w-6 h-6 text-[#2874f0] animate-spin" /></div>

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80" alt="bg" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-wide">Explore Products</h1>
                        <div className="flex items-center gap-1.5 text-xs text-white/40 mt-1">
                            <MapPin size={12} className="text-[#2874f0]" />
                            <span>Delivering to {address}</span>
                        </div>
                    </div>
                    <p className="text-sm text-white/40">{filtered.length} products found</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filtered.map((product) => {
                        const finalPrice = Number(product.price) - Number(product.discount || 0)
                        const hasDiscount = product.discount > 0
                        return (
                            <div key={product._id}
                                onClick={() => navigate(`/product/${product._id}`)}
                                className="group bg-black/40 rounded-xl overflow-hidden border border-white/5 hover:border-[#2874f0]/30 transition-all duration-400 hover:-translate-y-1 backdrop-blur-md shadow-2xl">
                                <div className="aspect-square overflow-hidden bg-[#1a1a22] relative">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    {hasDiscount && <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-₹{product.discount}</span>}
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-white text-sm truncate">{product.name}</h3>
                                    <div className="flex items-baseline gap-1.5 mt-1">
                                        <span className="text-base font-bold text-[#2874f0]">₹{finalPrice.toLocaleString()}</span>
                                        {hasDiscount && <span className="text-xs line-through text-white/20">₹{Number(product.price).toLocaleString()}</span>}
                                    </div>
                                    <button onClick={(e) => addToCart(e, product)} disabled={addingToCart === product._id}
                                        className="mt-2.5 w-full flex items-center justify-center gap-1.5 bg-[#2874f0]/70 hover:bg-[#2874f0] text-white text-xs font-medium py-2 rounded-lg transition-all cursor-pointer">
                                        {addingToCart === product._id ? <Loader2 size={12} className="animate-spin" /> : <><ShoppingCart size={12} /> {t.addToCart}</>}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

