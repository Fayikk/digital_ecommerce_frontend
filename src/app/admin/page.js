'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FaPlus, FaLayerGroup, FaTags, FaMobileAlt, FaImages, FaSave } from 'react-icons/fa';
import { useAddMainCategoryMutation,useGetMainCategoriesQuery } from '@/Apis/mainCategoryApi';
import {useAddSubCategoryMutation} from '@/Apis/subCategoryApi';
import { useGetSubCategoriesQuery } from '@/Apis/subCategoryApi';
import { useAddProductMutation, useGetAllProductsQuery } from '@/Apis/productApi';
import { useAddProductImageMutation } from '@/Apis/productImageApi';
import toast from 'react-hot-toast';
import ChekcAdminControl from '@/Wrappers/HoC/CheckAdminControl';
function AdminPanel() {
  // State for active tab
  const [mainCategoriesData, setMainCategoriesData] = useState([]);
    const [subCategoriesData, setSubCategoriesData] = useState([]);
    const [phonesDataValue, setPhonesData] = useState([]);
  const [activeTab, setActiveTab] = useState('mainCategory');
  const [addMainCategory] = useAddMainCategoryMutation();
  const [addSubCategory] = useAddSubCategoryMutation();
  const [addPhone] = useAddProductMutation();
  const [addProductImage] = useAddProductImageMutation();
  const {data:mainCategories,isLoading,error}  = useGetMainCategoriesQuery();
  const {data:subCategories,isLoadingSubCategory,errorSubCategory} = useGetSubCategoriesQuery();
  const {data:phonesData,isLoadingPhones,errorPhones} = useGetAllProductsQuery();
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
console.log("phonesData",phonesData);

  useEffect(()=>{
    if(mainCategories && subCategories && phonesData){
        setMainCategoriesData(mainCategories.result);
        setSubCategoriesData(subCategories.result);
        setPhonesData(phonesData.result);
    }
  },[])



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading main categories</div>;{
    
  }
  if (isLoadingSubCategory) return <div>Loading...</div>;
  if (errorSubCategory) return <div>Error loading sub categories</div>;{
    
  }
  console.log("mainCategories",mainCategories);
  console.log("subCategories",subCategories);


  
  const [productImages, setProductImages] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');

  // Mock data for dropdowns - in real implementation, these would come from API
  const mockMainCategories = mainCategoriesData.map((category) => ({
    id: category.id,
    name: category.categoryName
  }));
  
  const mockSubCategories = subCategoriesData.map((category) => ({
    id: category.id,
    name: category.categoryName
  }));
  
  const mockProducts = phonesDataValue.map((product) => ({
    id: product.id,
    name: product.productName
  }));

  // Handle form submissions
  const handleMainCategorySubmit = async (e) => {
    e.preventDefault();
    console.log('Main Category Form Submitted:', mainCategory);
    await addMainCategory(mainCategory).unwrap()
      .then((response) => {
        console.log('Main Category added:', response);
        toast.success('Main Category added successfully!');
        setMainCategory({ categoryName: '', categoryDescription: '' });
      })
      .catch((error) => {
        console.error('Error adding main category:', error);
      });
    console.log('Main Category Form Submitted:', mainCategory);
    // Here you would add API call to save the main category
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    await addSubCategory(subCategory).unwrap()
      .then((response) => {
        console.log('Sub Category added:', response);
        toast.success('Sub Category added successfully!');
        setSubCategory({ categoryName: '', categoryDescription: '', mainCategoryId: '' });
      })
      .catch((error) => {
        console.error('Error adding sub category:', error);
      });
    console.log('Sub Category Form Submitted:', subCategory);
    // Here you would add API call to save the sub category
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    await addPhone(product).unwrap()
      .then((response) => {
        console.log('Product added:', response);
        toast.success('Product added successfully!');
        setProduct({ productName: '', productPrice: 0, productDescription: '', productStock: 0, color: 0, subCategoryId: '' });
      })
    console.log('Product Form Submitted:', product);
    // Here you would add API call to save the product
  };

  const handleProductImageSubmit = async (e) => {
    e.preventDefault();
    console.log('Product Images Submitted:', productImages);
    console.log('For Product ID:', selectedProductId);
    
    await addProductImage({ productId: selectedProductId, file: productImages }).unwrap()
      .then((response) => {
        console.log('Product images added:', response);
        toast.success('Product images added successfully!');
        setProductImages([]);
        setSelectedProductId('');
      })
      .catch((error) => {
        console.error('Error adding product images:', error);
      });
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

export default ChekcAdminControl(AdminPanel);