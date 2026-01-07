import { backendApi } from "./paytm";

   export function loadRazorpayScript() {
          return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);

        document.body.appendChild(script);
      });
}

export const handleBuyNow = async (amount) => {
  
  if(localStorage.getItem('user')===undefined || localStorage.getItem('user')===null){
    alert("Please login to proceed with payment");
    return;
  }

  // 1. Load Razorpay script
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Payment SDK failed to load!");
    return;
  }

  // 2. Create order from backend
  const orderResponse = await fetch(`${backendApi}/api/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
    credentials:'include'
  });
  const order = await orderResponse.json();

  // 3. Razorpay payment options
  const options = {
    key: "rzp_test_Rhc7KDFTLLV3f9", // frontend key_id
    amount: order.order.amount,
    currency: "INR",
    name: "Flasko Store",
    description: "Order Payment",
    order_id: order.order.id,

    handler: async function (response) {
      // send details to backend for verification
      const verify = await fetch(`${backendApi}/api/payment/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

      const result = await verify.json();
      if (result.success) {
        alert("Payment Successful!");
      } else {
        alert("Payment Verification Failed!");
      }
    },

    theme: {
      color: "#000000",
    }
  };

  const paymentObj = new window.Razorpay(options);
  paymentObj.open();
};