import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Truck, Shield, ShoppingBag, Star, Zap, Heart } from 'lucide-react'

const CATEGORIES = [
    { img: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a56?w=400&q=80', label: 'Electronics', count: '250+' },
    { img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80', label: 'Fashion', count: '400+' },
    { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', label: 'Home & Living', count: '180+' },
    { img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80', label: 'Beauty', count: '150+' },
]

const PRODUCTS = [
    { img: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80', name: 'MacBook Pro M3', price: '₹1,49,999', oldPrice: '₹1,79,999', rating: 4.9 },
    { img: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&q=80', name: 'Aviator Sunglasses', price: '₹2,499', oldPrice: '₹3,999', rating: 4.6 },
    { img: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=400&q=80', name: 'Smart Fitness Band', price: '₹3,499', oldPrice: '₹5,999', rating: 4.5 },
    { img: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80', name: 'Running Shoes Pro', price: '₹7,999', oldPrice: '₹11,499', rating: 4.8 },
    { img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80', name: 'Streetwear Sneakers', price: '₹5,999', oldPrice: '₹8,499', rating: 4.7 },
    { img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80', name: 'Perfume Gift Set', price: '₹4,299', oldPrice: '₹6,999', rating: 4.9 },
    { img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80', name: 'Designer Handbag', price: '₹12,499', oldPrice: '₹16,999', rating: 4.8 },
    { img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80', name: 'High-Top Sneakers', price: '₹6,499', oldPrice: '₹9,499', rating: 4.6 },
    { img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80', name: 'Wireless Earbuds', price: '₹8,999', oldPrice: '₹12,999', rating: 4.7 },
    { img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80', name: 'Mechanical Keyboard', price: '₹4,999', oldPrice: '₹7,499', rating: 4.5 },
    { img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80', name: 'Silk Designer Shirt', price: '₹3,999', oldPrice: '₹5,999', rating: 4.4 },
    { img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80', name: 'Canvas Shoes', price: '₹2,799', oldPrice: '₹4,499', rating: 4.3 },
    { img: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&q=80', name: 'Crossbody Bag', price: '₹5,499', oldPrice: '₹8,999', rating: 4.7 },
    { img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80', name: 'Wireless Headphones', price: '₹11,999', oldPrice: '₹16,499', rating: 4.8 },
    { img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80', name: 'Retro Jordan Kicks', price: '₹14,999', oldPrice: '₹18,999', rating: 4.9 },
    { img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80', name: 'Graphic Tee', price: '₹1,499', oldPrice: '₹2,499', rating: 4.2 },
    { img: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&q=80', name: 'Smart Watch Ultra', price: '₹24,999', oldPrice: '₹32,999', rating: 4.8 },
    { img: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&q=80', name: 'Sports Bottle', price: '₹899', oldPrice: '₹1,499', rating: 4.4 },
    { img: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&q=80', name: 'Tactical Backpack', price: '₹3,999', oldPrice: '₹5,999', rating: 4.6 },
    { img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80', name: 'Gold Necklace', price: '₹6,999', oldPrice: '₹9,999', rating: 4.5 },
]

const TESTIMONIALS = [
    { name: 'Priya S.', text: 'Amazing quality! Delivery was super fast and packaging was premium.', avatar: 'PS', rating: 5 },
    { name: 'Rahul K.', text: 'Best shopping experience. Collections feature helps organize my wishlist.', avatar: 'RK', rating: 5 },
    { name: 'Ananya M.', text: 'Love the curated products. Every item exceeded my expectations!', avatar: 'AM', rating: 5 },
]

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 opacity-35">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80" alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/20 to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10">
                {/* HERO */}
                <section className="relative min-h-[88vh] flex items-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80" alt="Hero" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/92 to-[#0a0a0f]/40"></div>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6 animate-pulse">
                                <Sparkles size={12} className="text-primary-400" />
                                <span className="text-xs text-primary-300 font-medium">New Season 2026</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
                                Discover <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Premium Style</span>
                            </h1>
                            <p className="text-base text-white/60 leading-relaxed mb-8 max-w-md">
                                Curated collections of the finest products. Shop with confidence.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link to="/login" className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium py-3 px-7 rounded-xl hover:from-primary-500 hover:to-primary-400 transition-all shadow-lg shadow-primary-500/20 text-sm">
                                    Start Shopping <ArrowRight size={15} />
                                </Link>
                                <Link to="/register" className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-medium py-3 px-7 rounded-xl hover:bg-white/10 transition-all text-sm">
                                    Create Account
                                </Link>
                            </div>
                            <div className="flex gap-8 mt-10">
                                <div><p className="text-2xl font-extrabold text-white">10K+</p><p className="text-xs text-white/40">Customers</p></div>
                                <div><p className="text-2xl font-extrabold text-white">500+</p><p className="text-xs text-white/40">Products</p></div>
                                <div><p className="text-2xl font-extrabold text-white">99%</p><p className="text-xs text-white/40">Satisfaction</p></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TRUST */}
                <section className="bg-[#0d0d14] border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <TrustBadge icon={<Truck size={18} />} color="text-blue-400" title="Free Shipping" desc="Over ₹499" />
                            <TrustBadge icon={<Shield size={18} />} color="text-green-400" title="Secure Pay" desc="100% safe" />
                            <TrustBadge icon={<Zap size={18} />} color="text-yellow-400" title="Fast Delivery" desc="2-5 days" />
                            <TrustBadge icon={<Heart size={18} />} color="text-pink-400" title="Easy Returns" desc="7 days" />
                        </div>
                    </div>
                </section>

                {/* CATEGORIES */}
                <section className="py-16 bg-[#0a0a0f]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Shop by Category</h2>
                            <p className="text-sm text-white/40">Explore popular categories</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {CATEGORIES.map((cat) => (
                                <Link to="/login" key={cat.label} className="relative group rounded-xl overflow-hidden cursor-pointer aspect-[4/5]">
                                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-base font-bold text-white">{cat.label}</h3>
                                        <p className="text-[11px] text-white/40">{cat.count} items</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 20 PRODUCTS — compact cards */}
                <section className="py-16 bg-[#0d0d14]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Trending Now</h2>
                                <p className="text-sm text-white/40">{PRODUCTS.length} popular products</p>
                            </div>
                            <Link to="/login" className="hidden sm:flex items-center gap-1.5 text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors">
                                Shop All <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {PRODUCTS.map((item, i) => (
                                <div key={i} className="group bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 hover:border-primary-500/20 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/5">
                                    <div className="aspect-[4/3] overflow-hidden bg-[#1a1a22] relative">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <span className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                            <Star size={7} className="fill-yellow-400 text-yellow-400" /> {item.rating}
                                        </span>
                                        {i < 3 && <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">HOT</span>}
                                    </div>
                                    <div className="p-2.5">
                                        <h3 className="font-medium text-white text-xs truncate">{item.name}</h3>
                                        <div className="flex items-baseline gap-1 mt-0.5">
                                            <span className="text-sm font-bold text-primary-400">{item.price}</span>
                                            <span className="text-[10px] line-through text-white/25">{item.oldPrice}</span>
                                        </div>
                                        <Link to="/login" className="mt-2 w-full flex items-center justify-center gap-1 bg-primary-600/80 hover:bg-primary-500 text-white text-[10px] font-semibold py-1.5 rounded-lg transition-all">
                                            <ShoppingBag size={10} /> Add to Cart
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="py-16 bg-[#0a0a0f]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Customer Reviews</h2>
                            <p className="text-sm text-white/40">Join thousands of happy shoppers</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {TESTIMONIALS.map((t) => (
                                <div key={t.name} className="bg-white/5 backdrop-blur-md border border-white/5 rounded-xl p-5 hover:border-primary-500/15 transition-all shadow-xl">
                                    <div className="flex gap-0.5 mb-3">{[...Array(t.rating)].map((_, i) => <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />)}</div>
                                    <p className="text-white/60 text-xs leading-relaxed mb-4">"{t.text}"</p>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center text-white text-[10px] font-bold">{t.avatar}</div>
                                        <span className="text-xs font-medium text-white">{t.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80" alt="CTA" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#0a0a0f]/60 backdrop-blur-[2px]"></div>
                    </div>
                    <div className="relative z-10 max-w-xl mx-auto text-center px-4">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Ready to Shop?</h2>
                        <p className="text-sm text-white/50 mb-6">Create a free account for exclusive deals.</p>
                        <Link to="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium py-3 px-8 rounded-xl hover:from-primary-500 hover:to-primary-400 transition-all shadow-lg shadow-primary-500/20 text-sm">
                            Get Started Free <ArrowRight size={15} />
                        </Link>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-[#0d0d14] border-t border-white/5 py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                        <Sparkles size={12} className="text-white" />
                                    </div>
                                    <span className="text-base font-bold text-white">Scatch</span>
                                </div>
                                <p className="text-xs text-white/30 leading-relaxed">Premium e-commerce for the modern shopper.</p>
                            </div>
                            <FooterCol title="Shop" links={['All Products', 'New Arrivals', 'Best Sellers', 'Deals']} />
                            <FooterCol title="Account" links={['Login', 'Register', 'My Orders', 'Profile']} />
                            <FooterCol title="Support" links={['Help Center', 'Shipping', 'Returns', 'Contact']} />
                        </div>
                        <div className="border-t border-white/5 mt-8 pt-5 text-center">
                            <p className="text-[10px] text-white/20">© 2026 Scatch. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

function TrustBadge({ icon, color, title, desc }) {
    return (
        <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${color}`}>{icon}</div>
            <div><p className="text-xs font-semibold text-white">{title}</p><p className="text-[10px] text-white/30">{desc}</p></div>
        </div>
    )
}

function FooterCol({ title, links }) {
    return (
        <div>
            <h4 className="text-xs font-semibold text-white mb-2">{title}</h4>
            <ul className="space-y-1.5">{links.map((l) => <li key={l}><span className="text-xs text-white/30 hover:text-white cursor-pointer transition-colors">{l}</span></li>)}</ul>
        </div>
    )
}
