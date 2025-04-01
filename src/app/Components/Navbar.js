'use client'
import React, { useState, useEffect } from 'react'
import { useGetMainCategoriesQuery } from '../../Apis/mainCategoryApi'
import Link from 'next/link'
import Image from 'next/image'
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi'
import styles from './Navbar.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/slices/searchSlice'
function Navbar() {
    const { data: categories, error, isLoading } = useGetMainCategoriesQuery();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dispatch = useDispatch();
    const [searchQuery, setSearchValue] = useState('');
    console.log("trigger searchQuery",searchQuery)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSearch = () => {
        console.log("trigger isSearchOpen",isSearchOpen)
        setIsSearchOpen(!isSearchOpen);
    }


    const handleKey = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
        console.log("trigger Enter",searchQuery)

            console.log("trigger hit enter",searchQuery)
            setSearchValue(searchQuery);
            console.log("trigger searchQuery",searchQuery)
            dispatch(setSearchQuery(searchQuery))
        }
    }

console.log(isMenuOpen)
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
                            <Link href="/" className={styles.logoLink}>
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
                                                        <Link 
                                                            href={`/category/${subCategory.id}`} 
                                                            key={subCategory.id}
                                                            className={styles.subCategoryLink}
                                                        >
                                                            {subCategory.categoryName}
                                                        </Link>
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
                                    0
                                </span>
                            </Link>
                            
                            {/* User menu */}
                            <div className={styles.userMenu}>
                                <Link href="/login" className={styles.authLink}>
                                    Giriş Yap
                                </Link>
                                <span className={styles.separator}>|</span>
                                <Link href="/register" className={styles.authLink}>
                                    Kayıt Ol
                                </Link>
                            </div>
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
                    
                    <div className={styles.mobileAuthSection}>
                        <div className={styles.mobileAuthButtons}>
                            <Link href="/login" className={styles.loginButton}>
                                <FiUser className={styles.authIcon} />
                                Giriş Yap
                            </Link>
                            <Link href="/register" className={styles.registerButton}>
                                Kayıt Ol
                            </Link>
                        </div>
                    </div>
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