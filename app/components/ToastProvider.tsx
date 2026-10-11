'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3500,
        style: {
          background: '#ffffff',
          color: '#1f2937',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: '#168941',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#e11d48',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}
