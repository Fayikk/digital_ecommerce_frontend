'use client'
import React, { useState, useEffect } from 'react'
import { useGetMainCategoriesQuery } from '../../Apis/mainCategoryApi'
import Link from 'next/link'
import Image from 'next/image'
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX ,FiLogOut} from 'react-icons/fi'
import styles from './Navbar.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSearchQuery,setSearchCategoryId,resetSearchCategoryId } from '@/redux/slices/searchSlice'
import { clearAuth } from '@/redux/slices/authSlice'
function Navbar() {
    const { data: categories, error, isLoading } = useGetMainCategoriesQuery();
    const [isAdmin,setIsAdmin] = useState(false)
    const cartCounter = useSelector((state) => state.counter.value);
    const authValues = useSelector((state) => state.auth);
    console.log("authValues",authValues)


    useEffect(()=>{
        if (authValues && authValues.authValue.role !== null && Array.isArray(authValues.authValue.role)) {
            authValues.authValue.role.map((item,i) =>{
               if(item === 'Admin'){
                console.log("user role",item)
                setIsAdmin(true)    
            } })
        }
        else {
            setIsAdmin(false);
        }
    },[authValues])


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dispatch = useDispatch();
    const [searchQuery, setSearchValue] = useState('');
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const handleSubMenuClick = (categoryId) => {
        dispatch(setSearchCategoryId(categoryId))
    }

    const reset = () => {
        dispatch(resetSearchCategoryId());
    
    }

    const handleKey = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            setSearchValue(searchQuery);
            dispatch(setSearchQuery(searchQuery))
        }
    }

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.navbarContainer}>
            {/* Main Navbar */}
            <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
                <div className={styles.container}>
                    <div className={styles.navbarContent}>
                        {/* Logo */}
                        <div className={styles.logoContainer}>
                            <Link href="/" onClick={()=>    reset()} className={styles.logoLink}>
                                <div className={styles.logoWrapper}>
                                    <div className={styles.logoImage}>
                                        LOGO
                                    </div>
                                    <span className={styles.logoText}>E-Shop</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className={styles.desktopNav}>
                            {!isLoading && categories?.result && (
                                <div className={styles.categoryList}>
                                    {categories.result.map((category) => (
                                        <div key={category.id} className={styles.categoryItem}>
                                            <button className={styles.categoryButton}>
                                                {category.categoryName}
                                            </button>
                                            {category.subCategories && category.subCategories.length > 0 && (
                                                <div className={styles.subCategoryDropdown}>
                                                    {category.subCategories.map((subCategory) => (
                                                        <a 
                                                            key={subCategory.id}
                                                            className={styles.subCategoryLink}
                                                            onClick={()=> handleSubMenuClick(subCategory.id)}
                                                        >
                                                            {subCategory.categoryName}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right side icons */}
                        <div className={styles.navActions}>
                            {/* Search */}
                            <button 
                                onClick={toggleSearch} 
                                className={styles.iconButton}
                                aria-label="Search"
                            >
                                <FiSearch className={styles.icon} />
                            </button>
                            
                            {/* Shopping cart */}
                            <Link href="/cart" className={styles.cartLink}>
                                <FiShoppingCart className={styles.icon} />
                                <span className={styles.cartBadge}>
                                    {cartCounter}
                                </span>
                            </Link>
                            
                            {/* User menu */}

                            {authValues && authValues.authValue.isAuthenticated ? (
                                 <div className={styles.userMenu}>
                               
                                 <Link href="/user/profile" className={styles.authLink}>
                                     <FiUser className={styles.authIcon} />
                                     {authValues.authValue.email}
                                 </Link>
                                {
                                    isAdmin ? (
                                        <Link href="/admin" className={styles.authLink}>
                                            <FiUser className={styles.authIcon} />
                                            Admin Paneli
                                        </Link>
                                    ) : null
                                }
                                 <Link href="/order" className={styles.authLink}>
                                     Siparişlerim
                                 </Link>
                                 <button 
                                    onClick={() =>{
                                        dispatch(clearAuth())
                                        localStorage.removeItem('token')
                                    } }
                                    className={styles.logoutButton}
                                >
                                    <FiLogOut className={styles.logoutIcon} />
                                    Çıkış Yap
                                </button>
                             </div>):(
                                
                                 <div className={styles.userMenu}>
                                 <Link href="/user/login" className={styles.authLink}>
                                     Giriş Yap
                                 </Link>
                                 <span className={styles.separator}>|</span>
                                 <Link href="/user/register" className={styles.authLink}>
                                     Kayıt Ol
                                 </Link>
                             </div>
                             )
                            }

                           
                        </div>

                        {/* Mobile menu button */}
                        <div className={styles.mobileActions}>
                            <button 
                                onClick={toggleSearch} 
                                className={styles.mobileIconButton}
                                aria-label="Search"
                            >
                                <FiSearch className={styles.icon} />
                            </button>
                            
                            <Link href="/cart" className={styles.mobileCartLink}>
                                <FiShoppingCart className={styles.icon} />
                                <span className={styles.mobileCartBadge}>
                                    0
                                </span>
                            </Link>
                            
                            <button 
                                onClick={toggleMenu} 
                                className={styles.mobileMenuButton}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMenuOpen ? <FiX className={styles.icon} /> : <FiMenu className={styles.icon} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search bar - toggle visibility */}
            <div className={`${styles.searchBar} ${isSearchOpen ? styles.searchBarOpen : ''}`}>
                <div className={styles.container}>
                    <div className={styles.searchInputWrapper}>
                        <input
                            type="text"
                            placeholder="Ürün, kategori veya marka ara..."
                            className={styles.searchInput}
                            autoFocus={isSearchOpen}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyUp={handleKey}
                        />
                        <div className={styles.searchIcon}>
                            <FiSearch />
                        </div>
                        <button 
                            onClick={toggleSearch}
                            className={styles.closeSearchButton}
                        >
                            <FiX />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu - toggle visibility */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.mobileMenuContent}>
                    {!isLoading && categories?.result && categories.result.map((category) => (
                        <div key={category.id} className={styles.mobileCategoryItem}>
                            <button className={styles.mobileCategoryButton}>
                                {category.categoryName}
                            </button>
                            
                            {category.subCategories && category.subCategories.length > 0 && (
                                <div className={styles.mobileSubCategories}>
                                    {category.subCategories.map((subCategory) => (
                                        <Link 
                                            href={`/category/${subCategory.id}`} 
                                            key={subCategory.id}
                                            className={styles.mobileSubCategoryLink}
                                        >
                                            {subCategory.categoryName}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {
                        authValues && authValues.isAuthenticated ? (
                            <div className={styles.mobileUserSection}>
                                <Link href="" className={styles.mobileUserLink}>
                                    <FiUser className={styles.authIcon} />
                                    {authValues.email}
                                </Link>
                                <Link href="/user/profile" className={styles.mobileUserLink}>
                                    <FiUser className={styles.authIcon} />
                                    Profilim
                                </Link>
                                <Link href="/order" className={styles.mobileUserLink}>
                                    Siparişlerim
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.mobileAuthSection}>
                                <Link href="/user/login" className={styles.mobileLoginButton}>
                                    Giriş Yap
                                </Link>
                                <Link href="/user/register" className={styles.mobileRegisterButton}>
                                    Kayıt Ol
                                </Link>
                            </div>
                        )
                    }
                   
                </div>
            </div>
            
            {/* Overlay for mobile menu & search */}
            {(isMenuOpen || isSearchOpen) && (
                <div 
                    className={styles.overlay}
                    onClick={() => {
                        setIsMenuOpen(false);
                        setIsSearchOpen(false);
                    }}
                ></div>
            )}
        </div>
    )
}

export default Navbar