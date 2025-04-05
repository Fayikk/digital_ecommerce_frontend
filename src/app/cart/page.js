'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useGetCartQuery,useRemoveFromCartMutation } from '@/Apis/cartApi';
import { Domain_URL } from '@/Constants/Url';
import { useDispatch } from 'react-redux';
import { equalCart } from '@/redux/slices/counterSlice';
import { useCheckout_stripeMutation } from '@/Apis/paymentApi';
import { useCreateOrderMutation } from '@/Apis/orderApi';
export default function CartPage() {
  // Sample cart data - in a real app, this would come from your global state or API

  const {data: cartData,isLoading,error} = useGetCartQuery();
  const dispatch = useDispatch();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [checkoutStripe] = useCheckout_stripeMutation();

  const [cartItems, setCartItems] = useState( []);

    if (error) {
        return <div>Error: {error.message}</div>;   
    }

  useEffect(() => {
    // Update cart items when cartData changes
    if (cartData && cartData.result && cartData.result.products) {
      setCartItems(cartData.result.products);
      dispatch(equalCart(cartData.result.products.length));
      console.log("cartItems",cartItems.length);
    }
  }, [cartData]);


  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total whenever cart items change
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.productPrice * 1, 
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

  const removeItem = async (id) => {
    console.log("removeItem",id);
    await removeFromCart(id).then((response) => {
      console.log("response",response);
    })
  };


  const handleCheckout = async () => {

    const phonesArr = cartItems.map(item => ({
      name: item.productName,
      amount: item.productPrice * 1,
    }))

    const paymentRequest = {
      phones: phonesArr,
      successUrl:`http://localhost:3000/success/${cartData.result.id}`,
      cancelUrl:'http://localhost:3000/cart',
    }

    await checkoutStripe(paymentRequest).then((response) => {
      window.location.href = response.data.url;
      console.log("response stripe payment",response);
    })
  }



  if (isLoading) {
    return <div>Loading...</div>;
    
  }
  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link href="/" className={styles.continueShopping}>
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
            <span className={styles.subtotalHeader}>Subtotal</span>
            <span className={styles.actionHeader}></span>
          </div>
          
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.productInfo}>
                <div className={styles.productImage}>


                {
          item.productImages.length > 0 && item.productImages[0].imageUrl && (
            <img
              src={`${Domain_URL}${item.productImages[0].imageUrl.replace(/^wwwroot[\\/]/, '').replace(/\\/g, '/').replace(/\s*\(\d+\)/, '')}`}
              alt={item.name}
              width={300}
              height={300}
              priority
              className={styles.image}
            />
          )} 
          {item.productImages.length === 0 && (
            <img
              src="https://clipground.com/images/cell-phones-clipart-12.jpg"
              alt="Default Product"
              width={300}
              height={300}
              priority
              className={styles.image}
            />
          )}

                </div>
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{item.productName}</h3>
                  <p className={styles.productId}>Description: {item.productDescription}</p>
                </div>
              </div>
              
              <div className={styles.price}>₺{item.productPrice.toFixed(2)}</div>
              
            
              <div className={styles.subtotal}>
              ₺{(item.productPrice * 1).toFixed(2)}
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
            <span>₺{total.toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>₺{total.toFixed(2)}</span>
          </div>
          
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          
          <Link href="/" className={styles.continueShoppingLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}