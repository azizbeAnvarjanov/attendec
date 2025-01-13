"use client"
import React, { useState } from 'react';

export default function Home() {
  const [isScanning, setIsScanning] = useState(false);
  const [authStatus, setAuthStatus] = useState('');

  const handleButtonClick = async () => {
    setIsScanning(true);
    try {
      const options = {
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [],
          timeout: 60000,
          userVerification: 'required',
        },
      };
      
      const credential = await navigator.credentials.get(options);
      if (credential) {
        setAuthStatus('Xodim topildi va maʼlumotlar bazaga yozildi.');
        // Bu yerda credential bilan ishlaymiz va bazaga yozamiz
      }
    } catch (error) {
      setAuthStatus('Xodim topilmadi yoki xato yuz berdi.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Xodim uchun Kirish</h1>
      <button
        onClick={handleButtonClick}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600"
      >
        Men keldim
      </button>
      {isScanning && <p className="mt-4 text-gray-600">Barmoq izi skanerlanmoqda...</p>}
      {authStatus && <p className="mt-4 text-gray-800">{authStatus}</p>}
    </div>
  );
}
