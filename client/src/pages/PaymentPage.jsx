// src/pages/PaymentPage.jsx
import { useState } from 'react';

const PaymentPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();

    if (!window.FlutterwaveCheckout) {
      alert("Flutterwave script not loaded");
      return;
    }

    window.FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-X", // replace with your test/live public key
      tx_ref: "tx-" + Date.now(),
      amount: amount,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: email,
        name: name,
      },
      callback: function (data) {
        console.log(data);
        alert("✅ Payment Successful!");
      },
      onclose: function () {
        console.log("Modal closed");
      },
      customizations: {
        title: "Toheebay Subscription",
        description: "Access to premium blog content",
        logo: "https://your-logo-url.com/logo.png", // optional
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: 20 }}>
      <h2>Subscribe to Premium</h2>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="number"
          placeholder="Amount (₦)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <button
          type="submit"
          style={{
            background: '#0a0',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
