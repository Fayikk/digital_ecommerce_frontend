'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function CartPage() {
  // Sample cart data - in a real app, this would come from your global state or API
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Headphones',
      price: 129.99,
      quantity: 1,
      image: 'https://placehold.co/100x100',
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      price: 49.99,
      quantity: 2,
      image: 'https://placehold.co/100x100',
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      price: 89.99,
      quantity: 1,
      image: 'https://placehold.co/100x100',
    },
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total whenever cart items change
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link href="/products" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      
      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          <div className={styles.headerRow}>
            <span className={styles.productHeader}>Product</span>
            <span className={styles.priceHeader}>Price</span>
            <span className={styles.quantityHeader}>Quantity</span>
            <span className={styles.subtotalHeader}>Subtotal</span>
            <span className={styles.actionHeader}></span>
          </div>
          
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.productInfo}>
                <div className={styles.productImage}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    width={80}
                    height={80}
                    className={styles.image}
                  />
                </div>
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{item.name}</h3>
                  <p className={styles.productId}>Product ID: {item.id}</p>
                </div>
              </div>
              
              <div className={styles.price}>${item.price.toFixed(2)}</div>
              
              <div className={styles.quantityControl}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className={styles.quantityButton}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className={styles.quantityInput}
                />
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>
              
              <div className={styles.subtotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              <button 
                onClick={() => removeItem(item.id)}
                className={styles.removeButton}
                aria-label="Remove item"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className={styles.cartSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button className={styles.checkoutButton}>
            Proceed to Checkout
          </button>
          
          <Link href="/products" className={styles.continueShoppingLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}