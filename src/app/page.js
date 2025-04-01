'use client';
import { useSelector, useDispatch } from "react-redux";
import ProductCard from './Components/ProductCard';
import styles from './page.module.css';
import { useGetProductWithPaginationMutation } from "@/Apis/productApi";
import { useEffect, useState } from "react";
export default function Home() {
  const counter = useSelector((state) => state.counter.value); 
  const dispatch = useDispatch();

  const [paginationModel, setPaginationModel] = useState({
    pageNumber: 1,
    pageSize: 8,
    keyword: "",
  });
  const [product, setProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
    const searchValue = useSelector((state) => state.searchQuery.value);
  const [getProductWithPagination] = useGetProductWithPaginationMutation(paginationModel);


  useEffect(()=>{
    setPaginationModel({
      ...paginationModel,
      keyword: searchValue,
      pageNumber: 1
    })
  },[searchValue])

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
    console.log("searchValuesearchValuesearchValue",searchValue)
       
        console.log("paginationModel",paginationModel)
        
        const response = await getProductWithPagination(paginationModel).unwrap();
        console.log(response);
        setProduct(response.result.items);
        setTotalPages(Math.ceil(response.result.totalCount / paginationModel.pageSize));
        setTotalItems(response.result.totalCount);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [paginationModel]);

  const handlePageChange = (newPage) => {
    setPaginationModel({
      ...paginationModel,
      pageNumber: newPage
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, paginationModel.pageNumber - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button
    buttons.push(
      <button 
        key="prev" 
        onClick={() => handlePageChange(Math.max(1, paginationModel.pageNumber - 1))}
        disabled={paginationModel.pageNumber === 1}
        className={styles.paginationButton}
      >
        &laquo;
      </button>
    );

    // First page
    if (startPage > 1) {
      buttons.push(
        <button 
          key="1" 
          onClick={() => handlePageChange(1)}
          className={`${styles.paginationButton} ${1 === paginationModel.pageNumber ? styles.active : ''}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="dots1" className={styles.paginationDots}>...</span>);
      }
    }

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)}
          className={`${styles.paginationButton} ${i === paginationModel.pageNumber ? styles.active : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="dots2" className={styles.paginationDots}>...</span>);
      }
      buttons.push(
        <button 
          key={totalPages} 
          onClick={() => handlePageChange(totalPages)}
          className={`${styles.paginationButton} ${totalPages === paginationModel.pageNumber ? styles.active : ''}`}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button 
        key="next" 
        onClick={() => handlePageChange(Math.min(totalPages, paginationModel.pageNumber + 1))}
        disabled={paginationModel.pageNumber === totalPages}
        className={styles.paginationButton}
      >
        &raquo;
      </button>
    );

    return buttons;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Telefonlar</h1>
      <p className={styles.subtitle}>En yeni ve popüler modeller</p>
      
      <div className={styles.productGrid}>
        {product.map((phone) => (
          <ProductCard key={phone.id} product={phone} />
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <p className={styles.paginationInfo}>
          Toplam {totalItems} ürünün {paginationModel.pageSize * (paginationModel.pageNumber - 1) + 1}-
          {Math.min(paginationModel.pageSize * paginationModel.pageNumber, totalItems)} arası gösteriliyor
        </p>
        <div className={styles.pagination}>
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
}
