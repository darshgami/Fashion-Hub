import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCart(localCart);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const { data } = await API.get('cart/');
            setCart(data);
        } catch (err) {
            console.error(err);
        }
    };

    const addToCart = async (product, quantity = 1) => {
        if (user) {
            await API.post('cart/', { product_id: product.id, quantity });
            fetchCart();
        } else {
            const newCart = [...cart];
            const index = newCart.findIndex(item => item.product.id === product.id);
            if (index > -1) {
                newCart[index].quantity += quantity;
            } else {
                newCart.push({ product, quantity });
            }
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const removeFromCart = async (id) => {
        if (user) {
            await API.delete(`cart/${id}/`);
            fetchCart();
        } else {
            const newCart = cart.filter(item => item.product.id !== id);
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const updateQuantity = async (id, quantity) => {
        if (user) {
            await API.put(`cart/${id}/`, { quantity });
            fetchCart();
        } else {
            const newCart = cart.map(item => item.product.id === id ? { ...item, quantity } : item);
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
