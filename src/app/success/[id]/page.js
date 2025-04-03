'use client';
import { useRemoveCartMutation } from '@/Apis/cartApi';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import styles from './page.module.css';
import { useDispatch } from 'react-redux';
import { equalCart } from '@/redux/slices/counterSlice';
import { useCreateOrderMutation } from '@/Apis/orderApi';

function SuccessPage() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const dispatch = useDispatch();
    const [removeCart] = useRemoveCartMutation();
    const [createOrder] = useCreateOrderMutation();
    const [orderDetails, setOrderDetails] = useState({
        orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        orderDate: new Date().toLocaleDateString(),
        orderTime: new Date().toLocaleTimeString()
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const clearCart = async () => {
            try {
                // Clear the cart after successful payment

                await createOrder().then((response) => {
                     removeCart(id).then((response) => {
                        console.log("Cart cleared successfully", response);
                        // Update cart count in Redux store to 0
                        dispatch(equalCart(0));
                        setIsLoading(false);
                    });
                    console.log("Order created successfully", response);});

           
            } catch (error) {
                console.error("Error clearing cart:", error);
                setIsLoading(false);
            }
        };

        if (id) {
            clearCart();
        }
    }, [id, removeCart, dispatch]);

    const handleContinueShopping = () => {
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Processing your order...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.successCard}>
                <div className={styles.iconWrapper}>
                    <FaCheckCircle className={styles.successIcon} />
                </div>
                
                <h1 className={styles.title}>Payment Successful!</h1>
                <p className={styles.message}>
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>
                
                <div className={styles.orderDetails}>
                    <div className={styles.orderInfo}>
                        <span className={styles.label}>Order Number:</span>
                        <span className={styles.value}>{orderDetails.orderNumber}</span>
                    </div>
                    <div className={styles.orderInfo}>
                        <span className={styles.label}>Date:</span>
                        <span className={styles.value}>{orderDetails.orderDate}</span>
                    </div>
                    <div className={styles.orderInfo}>
                        <span className={styles.label}>Time:</span>
                        <span className={styles.value}>{orderDetails.orderTime}</span>
                    </div>
                </div>
                
                <p className={styles.confirmationText}>
                    A confirmation email has been sent to your email address.
                </p>
                
                <div className={styles.actions}>
                    <button 
                        className={styles.primaryButton}
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                    <Link href="/orders" className={styles.secondaryButton}>
                        View My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SuccessPage;