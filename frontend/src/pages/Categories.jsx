import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, Shirt, Monitor, Footprints, Headphones, Watch, UtensilsCrossed, Gamepad2, Dumbbell, Gem, Baby, Monitor as Tv, Users, Home as HomeIcon, BookOpen as Book, Plane, Tag, ArrowLeft, Brush } from 'lucide-react'

export default function Categories() {
    const navigate = useNavigate()

    const categories = [
        { name: "All Categories", icon: <LayoutGrid size={24} className="mb-2" />, path: "/shop", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80" },
        { name: "Fashion", icon: <Shirt size={24} className="mb-2" />, path: "/shop?category=Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80" },
        { name: "Electronics", icon: <Monitor size={24} className="mb-2" />, path: "/shop?category=Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80" },
        { name: "Footwear", icon: <Footprints size={24} className="mb-2" />, path: "/shop?category=Footwear", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80" },
        { name: "Audio", icon: <Headphones size={24} className="mb-2" />, path: "/shop?category=Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80" },
        { name: "Watches", icon: <Watch size={24} className="mb-2" />, path: "/shop?category=Watches", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80" },
        { name: "Food & Nutrition", icon: <UtensilsCrossed size={24} className="mb-2" />, path: "/shop?category=food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
        { name: "Toys & Games", icon: <Gamepad2 size={24} className="mb-2" />, path: "/shop?category=Toys", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80" },
        { name: "Fitness", icon: <Dumbbell size={24} className="mb-2" />, path: "/shop?category=Fitness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" },
        { name: "Accessories", icon: <Gem size={24} className="mb-2" />, path: "/shop?category=accessories", image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&q=80" },
        { name: "Kids", icon: <Baby size={24} className="mb-2" />, path: "/shop?category=Kids", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80" },
        { name: "Beauty", icon: <Brush size={24} className="mb-2" />, path: "/shop?category=Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80" }
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden pt-20 px-4 sm:px-6 lg:px-8">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 opacity-35">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80" alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto w-full">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-3xl font-bold text-white tracking-wide">All Categories</h1>
                </div>

                <div className="mt-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {categories.map((cat, i) => (
                            <div key={i} onClick={() => navigate(cat.path)}
                                className="relative rounded-2xl overflow-hidden aspect-[4/5] flex flex-col items-center justify-center group cursor-pointer border border-white/5 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 hover:-translate-y-2 bg-black/60 backdrop-blur-sm">

                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-40" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent"></div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-center p-6 text-center mt-auto">
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-white group-hover:bg-primary-500 group-hover:scale-110 shadow-lg transition-all duration-300">
                                        {React.cloneElement(cat.icon, { className: "mb-0", size: 22 })}
                                    </div>
                                    <span className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-primary-300 transition-colors drop-shadow-md">{cat.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
