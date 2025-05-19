
import React from "react";

  export const loadRazorpay = async (number,studentId) => {
    try {
        number=number*100;
      const response = await fetch("http://localhost:4000/api/students/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount:number,studentId }),
      });

      const data = await response.json();
    //   console.log(data)
      
      const options = {
        key: "rzp_test_P7YkP7F5qTq4Nn", // replace with your Razorpay key ID
        amount: data.data.amount,
        currency: data.data.currency,
        name: "Yo hai bhai name",
        description: "yo krdi Transaction",
        order_id: data.data.id,
        studentId:data.data.notes.studentId,
        handler: async function (response) {
          // Signature verification request
        //   console.log("response is" , response)
          const verifyRes = await fetch("http://localhost:4000/api/students/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
        //   console.log("verifgy data ",verifyData)
          if (verifyData.success) {
            
            alert("✅ Payment verified!");
          } else {
            alert("❌ Payment verification failed!");
          }
        },
        // prefill: {
        //   name: "Your Name",
        //   email: "email@example.com",
        // },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };


export default loadRazorpay;
