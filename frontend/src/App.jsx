import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import CheckoutPage from './pages/CheckoutPage';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="app-wrapper">
                <Navbar />
                <main style={{ minHeight: '80vh' }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<AllProducts />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
