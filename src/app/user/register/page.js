'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        // Here you would add your API call to register the user
        // For example: await api.post('/register', formData);
        
        router.push('/user/login');
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.heading}>
          Create your account
        </h2>
        <p className={styles.subHeading}>
          Or{' '}
          <Link href="/user/login" className={styles.link}>
            sign in to your account
          </Link>
        </p>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />
                {formErrors.name && <p className={styles.errorText}>{formErrors.name}</p>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email address
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
                {formErrors.email && <p className={styles.errorText}>{formErrors.email}</p>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                />
                {formErrors.password && <p className={styles.errorText}>{formErrors.password}</p>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={styles.input}
                />
                {formErrors.confirmPassword && <p className={styles.errorText}>{formErrors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.button} ${isSubmitting ? styles.buttonDisabled : ''}`}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}