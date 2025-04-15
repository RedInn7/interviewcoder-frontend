import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase. Your subscription is now active.</p>
      <Link to="/">
        <button
          style={{
            padding: '10px 28px',
            fontSize: 16,
            background: '#635bff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            marginTop: 24,
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
} 