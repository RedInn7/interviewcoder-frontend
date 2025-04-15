import React, { useState } from 'react';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('未能获取支付链接');
      }
    } catch (err) {
      setError('请求失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h2>订阅 Interview Coder 年度会员</h2>
      <button
        style={{
          padding: '12px 32px',
          fontSize: 18,
          background: '#635bff',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? '跳转中...' : '立即支付 $300/年'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
}
