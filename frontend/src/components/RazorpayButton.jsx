// RazorpayButton.jsx
import React from "react";

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const RazorpayButton = ({ amount, user, backendUrl, token, orderItems, currState, onSuccess, onError }) => {
  const handlePayment = async () => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    try {
      // 1. Create order in backend (place-order)
      const placeOrderRes = await fetch(`${backendUrl}/api/user/place-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          userId: user?._id || user?.id,
          mode: currState,
          items: orderItems,
          totalPrice: amount,
          payment: "Online",
        }),
      });
      const placeOrderData = await placeOrderRes.json();
      if (!placeOrderData.success || !placeOrderData.order) throw new Error(placeOrderData.message || "Order creation failed");
      const orderId = placeOrderData.order._id || placeOrderData.order.id || placeOrderData.order.orderId;
      if (!orderId) throw new Error("Order ID missing from backend response");

      // 2. Create Razorpay order using orderId
      const razorpayRes = await fetch(`${backendUrl}/api/user/payment-razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ orderId }),
      });
      const razorpayData = await razorpayRes.json();
      if (!razorpayData.success || !razorpayData.response) throw new Error(razorpayData.message || "Razorpay order creation failed");
      const rOrder = razorpayData.response;
      const options = {
        key: razorpayData.key,
        amount: rOrder.amount,
        currency: rOrder.currency,
        name: "Food Order Payment",
        description: "Order Payment",
        order_id: rOrder.id,
        handler: async function (response) {
          // Verify payment on backend
          const verifyRes = await fetch(`${backendUrl}/api/user/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            onSuccess && onSuccess(verifyData);
          } else {
            onError && onError(verifyData.message || "Payment verification failed");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      onError && onError(err.message);
    }
  };

  return (
    <button
      className="bg-green-500 text-white px-6 py-1.5 rounded-md hover:bg-green-700 duration-300"
      onClick={handlePayment}
    >
      Pay Online
    </button>
  );
};

export default RazorpayButton;
