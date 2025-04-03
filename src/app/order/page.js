'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBox, FaShippingFast, FaCheckCircle, FaDownload } from 'react-icons/fa';
import styles from './page.module.css';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
  // Example data - in a real app, this would come from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD-123456',
          date: '2023-06-15',
          total: 459.97,
          status: 'delivered',
          items: [
            { id: 1, name: 'Smartphone XYZ', price: 299.99, quantity: 1, image: 'https://placehold.co/60x60' },
            { id: 2, name: 'Wireless Earbuds', price: 79.99, quantity: 2, image: 'https://placehold.co/60x60' },
          ]
        },
        {
          id: 'ORD-123457',
          date: '2023-06-10',
          total: 129.99,
          status: 'processing',
          items: [
            { id: 3, name: 'Bluetooth Speaker', price: 129.99, quantity: 1, image: 'https://placehold.co/60x60' }
          ]
        },
        {
          id: 'ORD-123458',
          date: '2023-06-05',
          total: 349.98,
          status: 'shipped',
          items: [
            { id: 4, name: 'Tablet Pro', price: 349.98, quantity: 1, image: 'https://placehold.co/60x60' }
          ]
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

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

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your orders...</p>
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
          {filteredOrders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <div className={styles.orderIdWrapper}>
                    <span className={styles.orderIdLabel}>Order</span>
                    <span className={styles.orderId}>{order.id}</span>
                  </div>
                  <div className={styles.orderDate}>
                    Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <div className={styles.orderStatus}>
                  {getStatusIcon(order.status)}
                  <span className={styles.statusText}>{getStatusText(order.status)}</span>
                </div>
              </div>
              
              <div className={styles.orderItems}>
                {order.items.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
                    <div className={styles.itemImage}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        width={60} 
                        height={60} 
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <div className={styles.itemMeta}>
                        <span className={styles.itemPrice}>₺{item.price.toFixed(2)}</span>
                        <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.orderFooter}>
                <div className={styles.orderTotal}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalAmount}>₺{order.total.toFixed(2)}</span>
                </div>
                
                <div className={styles.orderActions}>
                  <Link href={`/order/${order.id}`} className={styles.viewDetailsButton}>
                    View Details
                  </Link>
                  {order.status === 'delivered' && (
                    <button className={styles.invoiceButton}>
                      <FaDownload size={14} />
                      <span>Invoice</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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