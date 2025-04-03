'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import { FaPlus, FaLayerGroup, FaTags, FaMobileAlt, FaImages, FaSave } from 'react-icons/fa';

export default function AdminPanel() {
  // State for active tab
  const [activeTab, setActiveTab] = useState('mainCategory');
  
  // Form states
  const [mainCategory, setMainCategory] = useState({
    categoryName: '',
    categoryDescription: ''
  });
  
  const [subCategory, setSubCategory] = useState({
    categoryName: '',
    categoryDescription: '',
    mainCategoryId: ''
  });
  
  const [product, setProduct] = useState({
    productName: '',
    productPrice: 0,
    productDescription: '',
    productStock: 0,
    color: 0,
    subCategoryId: ''
  });
  
  const [productImages, setProductImages] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');

  // Mock data for dropdowns - in real implementation, these would come from API
  const mockMainCategories = [
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Smartphones' },
    { id: '4fa85f64-5717-4562-b3fc-2c963f66afa7', name: 'Accessories' }
  ];
  
  const mockSubCategories = [
    { id: '5fa85f64-5717-4562-b3fc-2c963f66afa8', name: 'Android Phones' },
    { id: '6fa85f64-5717-4562-b3fc-2c963f66afa9', name: 'iOS Phones' }
  ];
  
  const mockProducts = [
    { id: '7fa85f64-5717-4562-b3fc-2c963f66afb0', name: 'Samsung Galaxy S21' },
    { id: '8fa85f64-5717-4562-b3fc-2c963f66afb1', name: 'iPhone 13' }
  ];

  // Handle form submissions
  const handleMainCategorySubmit = (e) => {
    e.preventDefault();
    console.log('Main Category Form Submitted:', mainCategory);
    // Here you would add API call to save the main category
  };

  const handleSubCategorySubmit = (e) => {
    e.preventDefault();
    console.log('Sub Category Form Submitted:', subCategory);
    // Here you would add API call to save the sub category
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log('Product Form Submitted:', product);
    // Here you would add API call to save the product
  };

  const handleProductImageSubmit = (e) => {
    e.preventDefault();
    console.log('Product Images Submitted:', productImages);
    console.log('For Product ID:', selectedProductId);
    // Here you would add API call to save the product images
  };

  // Handle file selection for product images
  const handleFileChange = (e) => {
    setProductImages(Array.from(e.target.files));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Panel</h1>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'mainCategory' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('mainCategory')}
        >
          <FaLayerGroup className={styles.tabIcon} />
          Main Categories
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'subCategory' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('subCategory')}
        >
          <FaTags className={styles.tabIcon} />
          Sub Categories
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'product' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('product')}
        >
          <FaMobileAlt className={styles.tabIcon} />
          Products
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'productImage' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('productImage')}
        >
          <FaImages className={styles.tabIcon} />
          Product Images
        </button>
      </div>
      
      <div className={styles.content}>
        {/* Main Category Form */}
        {activeTab === 'mainCategory' && (
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>
              <FaPlus className={styles.formIcon} />
              Add Main Category
            </h2>
            <form onSubmit={handleMainCategorySubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="mainCategoryName">Category Name</label>
                <input 
                  type="text" 
                  id="mainCategoryName" 
                  value={mainCategory.categoryName}
                  onChange={(e) => setMainCategory({...mainCategory, categoryName: e.target.value})}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="mainCategoryDescription">Category Description</label>
                <textarea 
                  id="mainCategoryDescription" 
                  value={mainCategory.categoryDescription}
                  onChange={(e) => setMainCategory({...mainCategory, categoryDescription: e.target.value})}
                  placeholder="Enter category description"
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                <FaSave className={styles.buttonIcon} />
                Save Main Category
              </button>
            </form>
          </div>
        )}
        
        {/* Sub Category Form */}
        {activeTab === 'subCategory' && (
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>
              <FaPlus className={styles.formIcon} />
              Add Sub Category
            </h2>
            <form onSubmit={handleSubCategorySubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="subCategoryName">Sub Category Name</label>
                <input 
                  type="text" 
                  id="subCategoryName" 
                  value={subCategory.categoryName}
                  onChange={(e) => setSubCategory({...subCategory, categoryName: e.target.value})}
                  placeholder="Enter sub category name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subCategoryDescription">Sub Category Description</label>
                <textarea 
                  id="subCategoryDescription" 
                  value={subCategory.categoryDescription}
                  onChange={(e) => setSubCategory({...subCategory, categoryDescription: e.target.value})}
                  placeholder="Enter sub category description"
                  rows="4"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="mainCategorySelect">Main Category</label>
                <select 
                  id="mainCategorySelect"
                  value={subCategory.mainCategoryId}
                  onChange={(e) => setSubCategory({...subCategory, mainCategoryId: e.target.value})}
                  required
                >
                  <option value="">Select Main Category</option>
                  {mockMainCategories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={styles.submitButton}>
                <FaSave className={styles.buttonIcon} />
                Save Sub Category
              </button>
            </form>
          </div>
        )}
        
        {/* Product Form */}
        {activeTab === 'product' && (
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>
              <FaPlus className={styles.formIcon} />
              Add Product
            </h2>
            <form onSubmit={handleProductSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="productName">Product Name</label>
                <input 
                  type="text" 
                  id="productName" 
                  value={product.productName}
                  onChange={(e) => setProduct({...product, productName: e.target.value})}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="productPrice">Price</label>
                  <input 
                    type="number" 
                    id="productPrice" 
                    value={product.productPrice}
                    onChange={(e) => setProduct({...product, productPrice: parseFloat(e.target.value)})}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="productStock">Stock</label>
                  <input 
                    type="number" 
                    id="productStock" 
                    value={product.productStock}
                    onChange={(e) => setProduct({...product, productStock: parseInt(e.target.value)})}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="productColor">Color Code</label>
                  <input 
                    type="number" 
                    id="productColor" 
                    value={product.color}
                    onChange={(e) => setProduct({...product, color: parseInt(e.target.value)})}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="productDescription">Product Description</label>
                <textarea 
                  id="productDescription" 
                  value={product.productDescription}
                  onChange={(e) => setProduct({...product, productDescription: e.target.value})}
                  placeholder="Enter product description"
                  rows="4"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subCategorySelect">Sub Category</label>
                <select 
                  id="subCategorySelect"
                  value={product.subCategoryId}
                  onChange={(e) => setProduct({...product, subCategoryId: e.target.value})}
                  required
                >
                  <option value="">Select Sub Category</option>
                  {mockSubCategories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={styles.submitButton}>
                <FaSave className={styles.buttonIcon} />
                Save Product
              </button>
            </form>
          </div>
        )}
        
        {/* Product Image Upload Form */}
        {activeTab === 'productImage' && (
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>
              <FaPlus className={styles.formIcon} />
              Add Product Images
            </h2>
            <form onSubmit={handleProductImageSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="productSelect">Select Product</label>
                <select 
                  id="productSelect"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  required
                >
                  <option value="">Select Product</option>
                  {mockProducts.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="productImages">Upload Images</label>
                <div className={styles.fileUploadContainer}>
                  <input 
                    type="file" 
                    id="productImages" 
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    required
                  />
                  <div className={styles.fileUploadLabel}>
                    <FaImages className={styles.uploadIcon} />
                    <span>Choose images or drag & drop</span>
                  </div>
                </div>
                {productImages.length > 0 && (
                  <div className={styles.selectedFiles}>
                    <p>{productImages.length} file(s) selected</p>
                    <ul className={styles.fileList}>
                      {productImages.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button type="submit" className={styles.submitButton}>
                <FaSave className={styles.buttonIcon} />
                Upload Images
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
