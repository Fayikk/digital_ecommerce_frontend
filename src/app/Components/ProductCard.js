'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './ProductCard.module.css';
import { Domain_URL } from '@/Constants/Url';
import { useAddCartMutation } from '@/Apis/cartApi';
import { useDispatch } from 'react-redux';
import { equalCart } from '@/redux/slices/counterSlice';
const ProductCard = ({ product }) => {


  const [isHovered, setIsHovered] = useState(false);
  const [AddToCart] = useAddCartMutation();
  const dispatch = useDispatch();
  
  // Fiyat hesaplama
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100) 
    : product.price;
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };


  const handleAddToCart = async (productId) => {
    
    try {
      const response = await AddToCart(productId).unwrap();
      dispatch(equalCart(response.result.products.length));
      console.log('Added to cart:', response.result.products.length);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }




  useEffect(()=>{
    if(product && product.productImages && product.productImages.length > 0){
    }
  },[product])
  const imageUrl = product.image?.startsWith('http') 
  ? product.image 
  : `/images/${product.image}`; 

  // https://localhost:7014/images/i.webp
  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        {product.discount && (
          <div className={styles.discountBadge}>
            -{product.discount}%
          </div>
        )}
        <Link href={`/product/${product.id}`} className={styles.imageLink}>
          <div className={styles.imageWrapper}>
          <img
              src={`${Domain_URL}${product.productImages[0].imageUrl.replace(/^wwwroot[\\/]/, '').replace(/\\/g, '/').replace(/\s*\(\d+\)/, '')}`}

              alt={product.name}
              width={300}
              height={300}
              priority
              className={styles.productImage}
            />
          </div>
        </Link>
        
        <div className={`${styles.actions} ${isHovered ? styles.visible : ''}`}>
          <button className={styles.actionButton} aria-label="Add to favorites">
            <FiHeart />
          </button>
          <button className={styles.actionButton} aria-label="Quick view">
            <FiStar />
          </button>
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.productName}>
          <Link href={`/product/${product.id}`} className={styles.productLink}>
            {product.productName}
          </Link>
        </h3>
        
        <div className={styles.specs}>
          <span>{product.productDescription}</span>
          <span className={styles.divider}></span>
          <span>{product.color}</span>
        </div>
        
        <div className={styles.pricing}>
          {product.discount ? (
            <>
              <span className={styles.price}>{formatPrice(discountedPrice)}</span>
              <span className={styles.originalPrice}>{formatPrice(product.productPrice)}</span>
            </>
          ) : (
            <span className={styles.price}>{formatPrice(product.productPrice)}</span>
          )}
        </div>
        
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              className={i < Math.floor(product.rating) ? styles.starFilled : styles.star}
              fill={i < Math.floor(product.rating) ? '#FFC107' : 'none'}
            />
          ))}
          <span className={styles.ratingText}>{product.rating}</span>
        </div>
        
        <button className={styles.addToCartButton} onClick={()=>handleAddToCart(product.id)}>
          <FiShoppingCart className={styles.cartIcon} />
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
