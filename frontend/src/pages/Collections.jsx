import { useState, useEffect } from 'react'
import { FolderOpen, Plus, Loader2, X, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { translations } from '../data/translations'

const STOCK_IMAGES = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80',
]

export default function Collections({ lang }) {
    const t = translations[lang] || translations.en
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
    const [title, setTitle] = useState('')
    const [creating, setCreating] = useState(false)

    useEffect(() => { fetchCollections() }, [])

    const fetchCollections = async () => {
        try {
            const res = await api.get('/users/collections')
            if (res.data.success) setCollections(res.data.collections)
        } catch { toast.error('Failed to load collections') }
        finally { setLoading(false) }
    }

    const createCollection = async (e) => {
        e.preventDefault()
        if (!title.trim()) return
        setCreating(true)
        try {
            const res = await api.post('/users/newCollection', { title })
            if (res.data.success) { toast.success('Created! ✨'); setTitle(''); setShowCreate(false); fetchCollections() }
        } catch { toast.error('Failed to create') }
        finally { setCreating(false) }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                <Loader2 className="w-8 h-8 text-[#2874f0] animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden pt-20">
            <div className="absolute inset-0 z-0 opacity-35">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80" alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10">
                <div className="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80" alt="Collections" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/90 to-[#0a0a0f]/60"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-5xl mx-auto px-4 w-full flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{t.wishlist}</h1>
                                <p className="text-white/40 mt-1">{collections.length} {t.itemsOrdered}</p>
                            </div>
                            <button onClick={() => setShowCreate(!showCreate)}
                                className="flex items-center gap-2 bg-[#2874f0] hover:bg-[#2874f0]/90 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-[#2874f0]/20 cursor-pointer">
                                {showCreate ? <X size={18} /> : <Plus size={18} />}
                                {showCreate ? 'Cancel' : 'New'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {showCreate && (
                        <form onSubmit={createCollection} className="mb-10 bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl">
                            <label className="text-sm font-medium text-white mb-2 block">Name</label>
                            <div className="flex gap-3">
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Favorites"
                                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#2874f0]/70 text-sm" required />
                                <button type="submit" disabled={creating}
                                    className="bg-[#2874f0] hover:bg-[#2874f0]/90 text-white font-medium px-6 py-3 rounded-xl transition-all disabled:opacity-50 cursor-pointer text-sm">
                                    {creating ? <Loader2 size={16} className="animate-spin" /> : 'Create'}
                                </button>
                            </div>
                        </form>
                    )}

                    {collections.length === 0 ? (
                        <div className="text-center py-24 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-sm">
                            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                                <FolderOpen className="w-10 h-10 text-white/10" />
                            </div>
                            <p className="text-white text-xl font-semibold mb-2">{t.wishlistEmpty}</p>
                            <p className="text-white/40 mb-6">{t.saveDesc}</p>
                            <a href="/shop" className="inline-flex items-center gap-2 bg-[#2874f0] hover:bg-[#2874f0]/90 text-white font-medium px-8 py-3 rounded-lg shadow-lg shadow-[#2874f0]/20 transition-all">
                                {t.browseShop}
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {collections.map((col) => (
                                <div key={col._id} className="bg-black/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-[#2874f0]/15 transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2874f0] to-blue-500 flex items-center justify-center shadow-lg shadow-[#2874f0]/20">
                                            <Sparkles size={16} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">{col.name}</h2>
                                            <p className="text-xs text-white/40">
                                                {col.products.length} product{col.products.length !== 1 ? 's' : ''}
                                                {col.createdAt && <span> · {new Date(col.createdAt).toLocaleDateString()}</span>}
                                            </p>
                                        </div>
                                    </div>

                                    {col.products.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                            {col.products.map((p, i) => (
                                                <div key={p._id} className="bg-black/60 rounded-xl overflow-hidden group border border-white/5">
                                                    <div className="aspect-square overflow-hidden">
                                                        <img src={p.image || STOCK_IMAGES[i % STOCK_IMAGES.length]} alt={p.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="p-2.5">
                                                        <p className="text-sm font-medium text-white truncate">{p.name}</p>
                                                        <p className="text-xs text-[#2874f0] font-semibold">₹{p.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-white/40 text-sm py-4 text-center border border-dashed border-white/10 rounded-xl">No products in this {t.wishlist} yet — add from the Shop page</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
