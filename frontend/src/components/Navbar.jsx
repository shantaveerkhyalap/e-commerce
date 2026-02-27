import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Store, Search, User, ChevronDown, Heart, Package, Globe, Shield, LogOut, LayoutGrid, Zap, Ticket, HelpCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { translations } from '../data/translations'
import api from '../utils/api'

export default function Navbar({ user, setUser, lang, setLang }) {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [moreOpen, setMoreOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [langSubOpen, setLangSubOpen] = useState(false)
    const menuRef = useRef()
    const moreRef = useRef()

    const t = translations[lang] || translations.en

    const displayName = user?.fullname || user?.email || 'User'
    const cartCount = user?.cart?.length || 0

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
            if (moreRef.current && !moreRef.current.contains(e.target)) {
                setMoreOpen(false)
                setLangSubOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            navigate(`/shop?q=${encodeURIComponent(searchTerm)}`)
        }
    }

    const handleLogout = async () => {
        try {
            await api.post('/users/logout')
            setUser(null)
            navigate('/')
        } catch { }
    }

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'kn', label: 'ಕನ್ನಡ' },
        { code: 'hi', label: 'हिन्दी' }
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2874f0] shadow-md">
            <div className="w-full px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-16 gap-4 lg:gap-8">
                    {/* Logo */}
                    <Link to={user ? '/shop' : '/'} className="flex flex-col flex-shrink-0 group items-center">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xl font-bold text-white italic tracking-tight">Scatch</span>
                            <span className="text-[#ffe500] italic font-bold text-xs uppercase mt-1">Plus</span>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl hidden md:block group/search">
                        <form onSubmit={handleSearch} className="relative w-full flex items-center bg-white rounded-md shadow-sm overflow-hidden h-9 border border-transparent group-focus-within/search:border-[#2874f0]/50 group-hover/search:shadow-lg transition-all">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className="w-full h-full pl-4 pr-12 text-sm text-black placeholder-gray-500 focus:outline-none"
                            />
                            <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center text-[#2874f0] hover:bg-gray-50 transition-colors cursor-pointer">
                                <Search size={18} className="stroke-[2.5]" />
                            </button>
                        </form>
                    </div>

                    {/* Right side navigation */}
                    <div className="flex items-center gap-4 lg:gap-8 flex-shrink-0">
                        {user ? (
                            <div className="relative" ref={menuRef}>
                                <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-1 text-white font-medium hover:bg-white/10 rounded-md transition-all cursor-pointer h-12 px-3 self-center">
                                    <span className="text-sm font-semibold">{displayName}</span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu - Dark Premium Mode */}
                                {menuOpen && (
                                    <div className="absolute right-0 top-[52px] w-64 bg-[#121212]/95 border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-0 animate-in zoom-in-95 duration-200 z-50 overflow-hidden backdrop-blur-xl ring-1 ring-white/10">
                                        <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                                            <p className="text-[10px] text-[#2874f0] font-black uppercase tracking-[0.2em] mb-1">{t.hello}</p>
                                            <p className="text-sm font-extrabold text-white truncate drop-shadow-sm">{displayName}</p>
                                        </div>

                                        <div className="flex flex-col pt-1 pb-3">
                                            {/* Categories - Premium Featured Section */}
                                            <Link to="/categories"
                                                className="relative mx-3 mt-3 mb-2 px-4 py-4 rounded-xl overflow-hidden group/cat flex items-center gap-4 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] border border-[#2874f0]/30 bg-[#2874f0]/5 hover:bg-[#2874f0]/10 shadow-[0_0_20px_rgba(40,116,240,0.1)]"
                                                onClick={() => setMenuOpen(false)}>
                                                <div className="w-10 h-10 rounded-full bg-[#2874f0] flex items-center justify-center group-hover/cat:scale-110 group-active/cat:scale-90 transition-all duration-300 shadow-[0_0_15px_rgba(40,116,240,0.4)]">
                                                    <LayoutGrid size={20} className="text-white" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-[#2874f0] uppercase tracking-widest opacity-80 mb-0.5">Explore</span>
                                                    <span className="text-sm font-black text-white tracking-widest uppercase">Categories</span>
                                                </div>
                                            </Link>

                                            <DropdownLink to="/plus-zone" icon={<Zap size={16} />} title="Plus Zone" isPremium onClick={() => setMenuOpen(false)} />
                                            <DropdownLink to="/coupons" icon={<Ticket size={16} />} title="Coupons" onClick={() => setMenuOpen(false)} />

                                            <div className="h-px bg-white/5 my-2 mx-5"></div>

                                            <DropdownLink to="/profile" icon={<User size={16} />} title={t.profile} onClick={() => setMenuOpen(false)} />
                                            <DropdownLink to="/orders" icon={<Package size={16} />} title={t.orders} onClick={() => setMenuOpen(false)} />
                                            <DropdownLink to="/wishlist" icon={<Heart size={16} />} title={t.wishlist} onClick={() => setMenuOpen(false)} />

                                            <div className="h-px bg-white/5 my-2 mx-5"></div>

                                            <DropdownLink to="/help-center" icon={<HelpCircle size={16} />} title="Help Center" onClick={() => setMenuOpen(false)} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white text-[#2874f0] px-8 py-1.5 rounded-sm font-bold text-sm hover:shadow-md transition-shadow">Login</Link>
                        )}

                        <Link to="/admin" className="items-center gap-1.5 text-white font-bold hover:underline transition-all text-sm h-12 px-1 self-center hidden lg:flex">
                            {t.becomeSeller}
                        </Link>

                        {/* More Dropdown - Dark Mode */}
                        <div className="relative hidden md:block" ref={moreRef}>
                            <button onClick={() => setMoreOpen(!moreOpen)} className="flex items-center gap-1 text-white font-medium hover:bg-white/10 rounded-md transition-all cursor-pointer h-12 px-3 self-center">
                                <span className="text-sm font-semibold">{t.more}</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {moreOpen && (
                                <div className="absolute right-0 top-[52px] w-60 bg-[#121212]/95 border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 animate-in zoom-in-95 duration-200 z-50 overflow-hidden backdrop-blur-xl ring-1 ring-white/10">
                                    <div className="flex flex-col">
                                        {!langSubOpen ? (
                                            <>
                                                <button onClick={() => setLangSubOpen(true)} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/5 transition-all group w-full cursor-pointer overflow-hidden relative">
                                                    <div className="flex items-center gap-3.5 relative z-10 transition-transform group-hover:translate-x-1 duration-300">
                                                        <Globe size={18} className="text-[#2874f0] group-hover:scale-110 transition-transform" />
                                                        <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">{t.language}</span>
                                                    </div>
                                                    <ChevronDown size={14} className="text-white/20 -rotate-90 group-hover:text-white/50 transition-colors" />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#2874f0]/0 to-[#2874f0]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </button>

                                                <div className="h-px bg-white/5 my-1.5 mx-5"></div>

                                                <button onClick={() => { setMoreOpen(false); navigate('/customer-care'); }} className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-white/5 transition-all group w-full text-left cursor-pointer overflow-hidden relative">
                                                    <Shield size={18} className="text-[#2874f0] group-hover:scale-110 transition-transform relative z-10" />
                                                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors relative z-10 uppercase tracking-widest transition-transform group-hover:translate-x-1 duration-300">{t.customerCare}</span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#2874f0]/0 to-[#2874f0]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </button>
                                            </>
                                        ) : (
                                            <div className="animate-in slide-in-from-right-2 duration-200">
                                                <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
                                                    <button onClick={() => setLangSubOpen(false)} className="text-[10px] font-bold text-[#2874f0] uppercase tracking-wider flex items-center gap-1 hover:underline">
                                                        <ChevronDown size={10} className="rotate-90" /> Back
                                                    </button>
                                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">{t.language}</p>
                                                </div>
                                                <div className="py-1">
                                                    {languages.map((l) => (
                                                        <button
                                                            key={l.code}
                                                            onClick={() => { setLang(l.code); setMoreOpen(false); setLangSubOpen(false); }}
                                                            className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-white/10 transition-colors w-full ${lang === l.code ? 'text-[#2874f0] font-bold' : 'text-white/70'}`}
                                                        >
                                                            <span>{l.label}</span>
                                                            {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-[#2874f0]"></div>}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link to="/cart" className="flex items-center gap-2 text-white font-bold hover:text-white/90 transition-all text-sm relative">
                            <div className="relative">
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#ffe500] text-[#2874f0] text-[10px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-[#2874f0]">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline">{t.cart}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function DropdownLink({ to, icon, title, isPremium, onClick }) {
    return (
        <Link to={to} onClick={onClick}
            className={`flex items-center gap-3.5 px-5 py-3 hover:bg-white/5 transition-all group relative overflow-hidden ${isPremium ? 'text-[#ffe500]' : 'text-white/80'}`}>
            <div className={`transition-all group-hover:scale-125 duration-300 z-10 ${isPremium ? 'text-[#ffe500]' : 'text-[#2874f0]'}`}>{icon}</div>
            <span className={`text-sm font-bold uppercase tracking-widest transition-all group-hover:translate-x-1 duration-300 z-10 group-hover:text-white`}>
                {title}
            </span>
            {isPremium && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ffe500] shadow-[0_0_8px_rgba(255,229,0,0.6)] animate-pulse"></div>}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2874f0]/0 to-[#2874f0]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>
    )
}
