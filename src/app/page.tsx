'use client'

import React from 'react';
import LoginPage from "./login/page";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/register');
  };

  return (
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen bg-black" style={{ marginTop: "-100px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '100%', margin: '0 auto' }}>
        <div className="flex justify-center items-center space-x-20 mt-20" style={{ width: '100%', maxWidth: '100%', height: '70%', maxHeight: '70%' }}>
          <LoginPage />
        </div>
      </div>
      <p className="text-2xl text-center text-white mt-[-230px]">
    Crear cuenta nueva{' '}
    <a href="/register" onClick={handleRegisterClick} className="underline hover:text-blue-900">
    Registrarte
   </a>
  </p>

    </main>
  );
}
