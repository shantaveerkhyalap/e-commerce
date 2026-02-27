import { useState, useEffect } from 'react'
import { Trash2, ShoppingBag, Loader2, CreditCard, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { translations } from '../data/translations'

export default function Cart({ lang }) {
    const navigate = useNavigate()
    const t = translations[lang] || translations.en
    const [items, setItems] = useState([])
    const [bill, setBill] = useState(0)
    const [loading, setLoading] = useState(true)
    const [removing, setRemoving] = useState(null)

    useEffect(() => { fetchCart() }, [])

    const fetchCart = async () => {
        try {
            const res = await api.get('/cart')
            if (res.data.success) { setItems(res.data.items); setBill(res.data.bill) }
        } catch { toast.error('Failed to load cart') }
        finally { setLoading(false) }
    }

    const removeItem = async (productId) => {
        setRemoving(productId)
        try {
            const res = await api.delete(`/cart/${productId}`)
            if (res.data.success) { toast.success('Removed'); fetchCart() }
        } catch { toast.error('Failed') }
        finally { setRemoving(null) }
    }

    const buyNow = async (item) => {
        setRemoving(item._id) // Use removing state for loading feedback
        try {
            const res = await api.post(`/orders/${item._id}`)
            if (res.data.success) {
                toast.success('Order placed! 📦')
                navigate('/orders')
            }
        } catch {
            toast.error('Order failed')
        } finally {
            setRemoving(null)
        }
    }

    const checkoutAll = () => {
        navigate('/payment', { state: { items, bill, mode: 'cart' } })
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]"><Loader2 className="w-6 h-6 text-[#2874f0] animate-spin" /></div>

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 opacity-35">
                <img src="https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80" alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
                <h1 className="text-2xl font-extrabold text-white mb-1">{t.shoppingCart}</h1>
                <p className="text-xs text-white/30 mb-6">{items.length} {t.productsFound}</p>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="w-7 h-7 text-white/15" />
                        </div>
                        <p className="text-white text-base font-medium mb-1">{t.cartEmpty}</p>
                        <p className="text-xs text-white/25 mb-4">Add products from the shop</p>
                        <a href="/shop" className="inline-flex items-center gap-1.5 bg-[#2874f0] hover:bg-[#2874f0]/90 text-white text-xs font-medium px-5 py-2 rounded-lg transition-all">
                            {t.browseShop} <ArrowRight size={12} />
                        </a>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-3">
                            {items.map((item, i) => (
                                <div key={item._id} className="flex gap-3 bg-white/5 backdrop-blur-md border border-white/5 rounded-xl p-3 group hover:border-white/10 transition-all shadow-lg">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-white/5">
                                        <img src={item.image} alt={item.name}
                                            className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-medium text-white text-sm truncate">{item.name}</h3>
                                            <p className="text-[10px] text-white/20">₹{item.price} + ₹20 ship {item.discount > 0 ? `- ₹${item.discount}` : ''}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-1.5">
                                            <span className="text-sm font-bold text-[#2874f0]">₹{item.bill}</span>
                                            <div className="flex items-center gap-1.5">
                                                <button onClick={() => buyNow(item)} className="flex items-center gap-1 bg-green-600/80 hover:bg-green-500 text-white text-[10px] font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                                                    <CreditCard size={10} /> {t.buyNow}
                                                </button>
                                                <button onClick={() => removeItem(item._id)} disabled={removing === item._id}
                                                    className="w-7 h-7 flex items-center justify-center bg-white/5 hover:bg-red-500/15 hover:text-red-400 text-white/20 rounded-lg transition-all cursor-pointer">
                                                    {removing === item._id ? <Loader2 size={10} className="animate-spin" /> : <Trash2 size={10} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <div className="sticky top-20 bg-white/5 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-xl">
                                <h2 className="text-sm font-bold text-white mb-3">{t.summary}</h2>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between text-white/30"><span>{t.subtotal}</span><span>₹{items.reduce((s, i) => s + Number(i.price), 0)}</span></div>
                                    <div className="flex justify-between text-white/30"><span>{t.shipping}</span><span>₹{items.length * 20}</span></div>
                                    <div className="flex justify-between text-white/30"><span>{t.discount}</span><span className="text-green-400">-₹{items.reduce((s, i) => s + Number(i.discount || 0), 0)}</span></div>
                                    <div className="border-t border-white/5 pt-2 mt-2">
                                        <div className="flex justify-between"><span className="text-sm font-bold text-white">{t.total}</span>
                                            <span className="text-lg font-extrabold text-[#2874f0]">₹{bill}</span></div>
                                    </div>
                                </div>
                                <button onClick={checkoutAll}
                                    className="w-full mt-4 flex items-center justify-center gap-1.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-semibold py-2.5 rounded-lg hover:from-green-500 hover:to-emerald-400 transition-all shadow-md shadow-green-500/10 cursor-pointer">
                                    <CreditCard size={13} /> {t.proceedToPayment}
                                </button>
                                <p className="text-[9px] text-white/15 text-center mt-2">🔒 Secure checkout · 7-day returns</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
