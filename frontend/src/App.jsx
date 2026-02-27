import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import api from './utils/api'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Orders from './pages/Orders'
import Collections from './pages/Collections'
import AdminPanel from './pages/AdminPanel'
import AdminProducts from './pages/AdminProducts'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import ProductDetail from './pages/ProductDetail'
import Categories from './pages/Categories'

function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')
    const location = useLocation()

    useEffect(() => {
        localStorage.setItem('lang', lang)
    }, [lang])

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get('/me')
                if (res?.data?.success) setUser(res.data.user)
            } catch { setUser(null) }
            finally { setLoading(false) }
        })()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                <div className="w-10 h-10 border-4 border-white/20 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
        )
    }

    const hideNavbar = ['/', '/login', '/register'].includes(location.pathname) && !user

    return (
        <>
            <Toaster position="top-right" />
            {!hideNavbar && <Navbar user={user} setUser={setUser} lang={lang} setLang={setLang} />}
            <main className={hideNavbar ? '' : 'pt-14'}>
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/shop" /> : <Home />} />
                    <Route path="/login" element={user ? <Navigate to="/shop" /> : <Login setUser={setUser} />} />
                    <Route path="/register" element={user ? <Navigate to="/shop" /> : <Register setUser={setUser} />} />
                    <Route path="/shop" element={user ? <Shop user={user} lang={lang} /> : <Navigate to="/" />} />
                    <Route path="/product/:id" element={user ? <ProductDetail lang={lang} /> : <Navigate to="/" />} />
                    <Route path="/cart" element={user ? <Cart lang={lang} /> : <Navigate to="/" />} />
                    <Route path="/payment" element={user ? <Payment lang={lang} /> : <Navigate to="/" />} />
                    <Route path="/orders" element={user ? <Orders lang={lang} /> : <Navigate to="/" />} />
                    <Route path="/wishlist" element={user ? <Collections user={user} lang={lang} /> : <Navigate to="/" />} />
                    <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} lang={lang} /> : <Navigate to="/" />} />
                    <Route path="/change-password" element={user ? <ChangePassword lang={lang} /> : <Navigate to="/" />} />
                    <Route path="/categories" element={user ? <Categories /> : <Navigate to="/" />} />
                    <Route path="/admin" element={user ? <AdminPanel lang={lang} /> : <Navigate to="/" />} />
                    <Route path="/admin/products" element={user ? <AdminProducts lang={lang} /> : <Navigate to="/" />} />
                </Routes>
            </main>
        </>
    )
}

export default App
