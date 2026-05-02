import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(localWishlist);
    }, []);

    const toggleWishlist = (product) => {
        const exists = wishlist.find(item => item.id === product.id);
        let newWishlist;
        if (exists) {
            newWishlist = wishlist.filter(item => item.id !== product.id);
        } else {
            newWishlist = [...wishlist, product];
        }
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const isInWishlist = (id) => {
        return wishlist.some(item => item.id === id);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
