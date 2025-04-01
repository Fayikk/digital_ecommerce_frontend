'use client'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Page.module.css'

function ProductDetail() {
  const params = useParams();
  const { id } = params;
  
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProduct({
          id,
          name: "iPhone 15 Pro Max",
          price: 1299.99,
          description: "Apple'ın en gelişmiş iPhone'u, A17 Pro çip, profesyonel kamera sistemi ve titanyum tasarım ile birlikte.",
          features: [
            "A17 Pro çip",
            "6.7-inç Super Retina XDR ekran",
            "Pro kamera sistemi: 48MP ana, ultra geniş ve telefoto",
            "Aksiyon modu video kaydı",
            "Titanyum tasarım"
          ],
          colors: [
            { name: "Siyah Titanyum", code: "#2e2e2e" },
            { name: "Beyaz Titanyum", code: "#f0f0f0" },
            { name: "Mavi Titanyum", code: "#4169e1" },
            { name: "Doğal Titanyum", code: "#a0a0a0" }
          ],
          images: [
            "/images/iphone-1.jpg",
            "/images/iphone-2.jpg",
            "/images/iphone-3.jpg",
            "/images/iphone-4.jpg"
          ],
          inStock: true
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Ürün verisi çekilirken hata oluştu:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFoundContainer}>
        <h1 className={styles.notFoundTitle}>Ürün Bulunamadı</h1>
        <p className={styles.notFoundMessage}>Aradığınız ürün bulunamadı veya artık mevcut değil.</p>
        <Link href="/products" className={styles.backLink}>
          Tüm Ürünlere Dön
        </Link>
      </div>
    );
  }

  return <ProductView product={product} />;
}

function ProductView({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Ana Sayfa</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link href="/products" className={styles.breadcrumbLink}>Ürünler</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>
      
      <div className={styles.productCard}>
        <div className={styles.productGrid}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              {/* Image component is commented out, possibly due to missing images in development */}
              {/* <Image 
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Görsel ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
                priority={currentImageIndex === 0}
                quality={85}
              /> */}
              <div className={styles.placeholder}>
                <div className={styles.placeholderIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.placeholderSvg}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <p className={styles.placeholderText}>Ürün Görseli {currentImageIndex + 1}</p>
              </div>
            </div>
            
            <button 
              onClick={prevImage}
              aria-label="Önceki görsel"
              className={styles.prevButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.buttonIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              aria-label="Sonraki görsel"
              className={styles.nextButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.buttonIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            
            <div className={styles.indicators}>
              {product.images.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentImageIndex(idx)}
                  aria-label={`Görsel ${idx + 1}`}
                  className={`${styles.indicator} ${idx === currentImageIndex ? styles.activeIndicator : ''}`}
                />
              ))}
            </div>
          </div>
          
          <div className={styles.productDetails}>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-xl font-semibold text-blue-600 mt-2">{product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</p>
              </div>
              
              {product.inStock ? (
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Stokta</span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Tükendi</span>
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Renk</h3>
              <div className={styles.colorContainer}>
                {product.colors.map((color) => (
                  <button 
                    key={color.name} 
                    onClick={() => setSelectedColor(color)}
                    aria-label={color.name}
                    className={`${styles.colorButton} ${selectedColor.name === color.name ? styles.colorButtonSelected : ''}`}
                  >
                    <div 
                      className={styles.colorSwatch}
                      style={{ backgroundColor: color.code }}
                    />
                    <span className={styles.colorName}>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Miktar</h3>
              <div className={styles.quantityControl}>
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  className={styles.quantityButton}
                  aria-label="Miktarı azalt"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.buttonIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                  </svg>
                </button>
                <div className={styles.quantityDisplay}>
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className={styles.quantityButton}
                  aria-label="Miktarı arttır"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.buttonIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={styles.buttonContainer}>
              <button 
                className={styles.addToCartButton}
                disabled={!product.inStock}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.buttonIcon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Sepete Ekle
              </button>
              <button 
                className={styles.buyNowButton}
                disabled={!product.inStock}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.buttonIcon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                Hemen Satın Al
              </button>
            </div>
            
            <div className="mt-8 border-t pt-6 border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Özellikler</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;