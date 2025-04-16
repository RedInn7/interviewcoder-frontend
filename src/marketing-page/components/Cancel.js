import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h2>Payment Cancelled</h2>
      <p>
        Your payment was <span style={{ color: 'red', fontWeight: 900, fontSize: '1.5em' }}>NOT</span> completed. You can try again at any time.
      </p>
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