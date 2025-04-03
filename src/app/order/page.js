'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBox, FaShippingFast, FaCheckCircle, FaDownload } from 'react-icons/fa';
import styles from './page.module.css';
import { useGetUserOrdersQuery } from '@/Apis/orderApi';
import { Domain_URL } from '@/Constants/Url';
export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  const { data: orderData, isLoading, error } = useGetUserOrdersQuery();
    console.log("orderData",orderData);
  // Update orders when API data is received
  useEffect(() => {
    if (orderData && orderData.result) {
      setOrders(orderData.result);
    }
  }, [orderData]);

  // Since the new structure doesn't have status field, we'll use a placeholder
  // In a real application, you might want to add logic based on dates or another field
  const getOrderStatus = (order) => {
    // Just as an example - in a real app you would have actual status logic
    const createdDate = new Date(order.createdAt);
    const now = new Date();
    const daysDiff = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 2) return 'processing';
    if (daysDiff < 5) return 'shipped';
    return 'delivered';
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => getOrderStatus(order) === activeTab);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'processing':
        return <FaBox className={styles.statusIcon} style={{color: '#f59e0b'}} />;
      case 'shipped':
        return <FaShippingFast className={styles.statusIcon} style={{color: '#3b82f6'}} />;
      case 'delivered':
        return <FaCheckCircle className={styles.statusIcon} style={{color: '#10b981'}} />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  // Calculate total for an order
  const calculateOrderTotal = (products) => {
    console.log("productscalculateOrderTotal",products);
    return products.reduce((sum, product) => sum + (product.productPrice * 1), 0);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error loading orders. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Orders</h1>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'all' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Orders
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'processing' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('processing')}
        >
          Processing
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'shipped' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('shipped')}
        >
          Shipped
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'delivered' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('delivered')}
        >
          Delivered
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No orders found in this category.</p>
          {activeTab !== 'all' && (
            <button 
              className={styles.viewAllButton}
              onClick={() => setActiveTab('all')}
            >
              View All Orders
            </button>
          )}
        </div>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrders.map((order) => {
            const orderStatus = getOrderStatus(order);
            const orderTotal = calculateOrderTotal(order.products);
            
            return (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderInfo}>
                    <div className={styles.orderIdWrapper}>
                      <span className={styles.orderIdLabel}>Order</span>
                      <span className={styles.orderId}>{order.id.substring(0, 8)}</span>
                    </div>
                    <div className={styles.orderDate}>
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className={styles.orderStatus}>
                    {getStatusIcon(orderStatus)}
                    <span className={styles.statusText}>{getStatusText(orderStatus)}</span>
                  </div>
                </div>
                <div className={styles.orderItems}>
                  {order.products.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        <img 
                          src={`${Domain_URL}${item.productImages[0].imageUrl.replace(/^wwwroot[\\/]/, '').replace(/\\/g, '/').replace(/\s*\(\d+\)/, '')}`
                        } 
                          alt={item.name} 
                          width={60} 
                          height={60} 
                        />
                      </div>
                      <div className={styles.itemDetails}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <div className={styles.itemMeta}>
                          <span className={styles.itemPrice}>₺{item.productPrice?.toFixed(2) || '0.00'}</span>
                          <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={styles.orderFooter}>
                  <div className={styles.orderTotal}>
                    <span className={styles.totalLabel}>Total:</span>
                    <span className={styles.totalAmount}>₺{orderTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className={styles.orderActions}>
                    <Link href={`/product/${order.id}`} className={styles.viewDetailsButton}>
                      View Details
                    </Link>
                    {orderStatus === 'delivered' && (
                      <button className={styles.invoiceButton}>
                        <FaDownload size={14} />
                        <span>Invoice</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {filteredOrders.length > 0 && (
        <div className={styles.pagination}>
          <button className={styles.paginationButton} disabled>Previous</button>
          <span className={styles.pageInfo}>Page 1 of 1</span>
          <button className={styles.paginationButton} disabled>Next</button>
        </div>
      )}
    </div>
  );
}