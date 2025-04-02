'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useSignInMutation } from '@/Apis/userApi';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const [SignIn] = useSignInMutation();



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here

    await SignIn({ email, password })
      .unwrap()
      .then((response) => {
        // Handle successful login response

        if (response.success) {
          localStorage.setItem('token', response.result.token);
          const decoedToken = jwtDecode(response.result.token);
          dispatch(setAuth({
            id: decoedToken.nameid,
            name: decoedToken.unique_name,
            email: decoedToken.unique_name,
            role: decoedToken.role,
            token: response.result.token,
            isAuthenticated: true,
          }));
          router.push('/'); // Redirect to home page or any other page
        }

        // Redirect or perform any other action
      })
      .catch((error) => {
        // Handle error response
        console.error('Login failed:', error);
      });

  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>
        
        <p className={styles.signupText}>
          Don't have an account?{' '}
          <Link href="/user/register" className={styles.signupLink}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}