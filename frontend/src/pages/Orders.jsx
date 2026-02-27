import { useState, useEffect } from 'react'
import { Package, Loader2, CheckCircle, Clock, Truck, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { translations } from '../data/translations'

const STOCK_IMAGES = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80',
]

export default function Orders({ lang }) {
    const t = translations[lang] || translations.en
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const TRACKING_STEPS = [
        { title: t.orderPlaced, desc: 'We have received your order' },
        { title: t.processing, desc: 'Seller is preparing your package' },
        { title: t.shipped, desc: 'Handed over to delivery partner' },
        { title: t.outForDelivery, desc: 'Arriving today' },
        { title: t.delivered, desc: 'Package delivered successfully' }
    ]

    useEffect(() => { fetchOrders() }, [])

    const fetchOrders = async () => {
        try {
            const res = await api.get('/me')
            if (res.data.success) {
                const fetchedOrders = res.data.user.orders || []
                const ordersWithTracking = fetchedOrders.map(order => ({
                    ...order,
                    currentStep: Math.floor(Math.random() * 3) + 1
                }))
                setOrders(ordersWithTracking)
            }
        } catch { toast.error('Failed to load orders') }
        finally { setLoading(false) }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                <Loader2 className="w-8 h-8 text-[#2874f0] animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-35">
                <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&q=80" alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-wide">{t.myOrders}</h1>
                    <p className="text-white/40 mb-8">{orders.length} {t.itemsOrdered}</p>

                    {orders.length === 0 ? (
                        <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 text-center py-24 shadow-xl">
                            <div className="w-24 h-24 rounded-full bg-[#1a1a22] flex items-center justify-center mx-auto mb-6">
                                <Package className="w-10 h-10 text-white/20" />
                            </div>
                            <p className="text-white text-xl font-bold mb-2 tracking-wide">{t.noOrders}</p>
                            <p className="text-white/40 mb-8">{t.startShoppingDesc}</p>
                            <a href="/shop" className="inline-flex items-center gap-2 bg-[#2874f0] hover:bg-[#2874f0]/90 text-white font-medium px-8 py-3 rounded-lg shadow-lg shadow-[#2874f0]/20 transition-all">
                                {t.browseShop}
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order, i) => {
                                const imgSrc = order.image || STOCK_IMAGES[i % STOCK_IMAGES.length]
                                const activeStep = order.currentStep || 2

                                return (
                                    <div key={order._id || i} className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-white/10">
                                        <div className="flex flex-col sm:flex-row gap-5 p-5 border-b border-white/5 bg-white/[0.02]">
                                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#1a1a22] flex-shrink-0 border border-white/5">
                                                <img src={imgSrc} alt={order.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-semibold text-white text-lg line-clamp-2 pr-4">{order.name || 'Product'}</h3>
                                                    <p className="text-white font-bold text-lg whitespace-nowrap">₹{order.price?.toLocaleString() || '—'}</p>
                                                </div>
                                                <p className="text-sm text-white/40 mb-3">Qty: 1 • Color: Black</p>
                                                <div className="flex flex-wrap items-center gap-3 mt-auto">
                                                    <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap">
                                                        <CheckCircle size={14} /> {t.confirmed}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-lg whitespace-nowrap">
                                                        <Clock size={14} /> {t.expectedDelivery} 3-5 Days
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 sm:px-8 bg-[#0a0a0f]/50">
                                            <h4 className="text-sm font-bold text-white/80 mb-6 flex items-center gap-2 tracking-wide uppercase">
                                                <Truck size={16} className="text-[#2874f0]" /> {t.trackPackage}
                                            </h4>
                                            <div className="relative">
                                                <div className="absolute top-4 left-4 right-4 h-0.5 bg-white/10 hidden sm:block"></div>
                                                <div className="absolute top-4 left-4 h-0.5 bg-[#2874f0] hidden sm:block transition-all duration-1000" style={{ width: `${(activeStep / (TRACKING_STEPS.length - 1)) * 100}%` }}></div>
                                                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 relative z-10">
                                                    {TRACKING_STEPS.map((step, index) => {
                                                        const isCompleted = index <= activeStep;
                                                        const isActive = index === activeStep;
                                                        return (
                                                            <div key={index} className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 flex-1">
                                                                {index !== TRACKING_STEPS.length - 1 && (
                                                                    <div className="absolute left-4 top-[32px] bottom-[-24px] w-0.5 bg-white/10 sm:hidden"></div>
                                                                )}
                                                                {index !== TRACKING_STEPS.length - 1 && isCompleted && (
                                                                    <div className="absolute left-4 top-[32px] bottom-[-24px] w-0.5 bg-[#2874f0] sm:hidden transition-all duration-1000"></div>
                                                                )}
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 z-10 ${isCompleted ? 'bg-[#2874f0] border-[#2874f0]' : 'bg-[#1a1a22] border-white/10'}`}>
                                                                    {isCompleted ? <Check size={14} className="text-white" /> : <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>}
                                                                </div>
                                                                <div className="sm:text-center w-full">
                                                                    <p className={`font-semibold text-sm transition-colors duration-300 ${isCompleted ? 'text-white' : 'text-white/40'}`}>{step.title}</p>
                                                                    <p className={`text-xs mt-1 transition-colors duration-300 ${isActive ? 'text-[#2874f0]' : 'text-white/30'}`}>{step.desc}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
