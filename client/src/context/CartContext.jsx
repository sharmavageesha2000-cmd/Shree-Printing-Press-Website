import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('printcraft_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('printcraft_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(i => i.productName === item.productName && i.paperType === item.paperType && i.size === item.size);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        updated[existingIdx].totalPrice = updated[existingIdx].quantity * updated[existingIdx].unitPrice;
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const subtotal = cart.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
  const discount = coupon ? coupon.discountAmount : 0;
  const tax = (subtotal - discount) * 0.08; // 8% sales tax
  const shipping = subtotal > 150 ? 0 : 15; // Free shipping over $150
  const total = Math.max(0, subtotal - discount + tax + shipping);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      coupon,
      setCoupon,
      subtotal,
      discount,
      tax,
      shipping,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};
