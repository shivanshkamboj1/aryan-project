

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {

        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
            { courses },
            { Authorization: `Bearer ${token}` }
        );

        console.log("PRINTING orderResponse", orderResponse); // Log the response

        // Adjust the checks to reflect the new structure
        if (!orderResponse.data.success) {
            console.error("Error from backend:", orderResponse.data.message);
            throw new Error(orderResponse.data.message);
        }

        // Access the nested data
        const message = orderResponse.data.data; // Changed to access the correct data

        if (!message || !message.currency || !message.amount || !message.id) {
            throw new Error("Payment order details are incomplete");
        }

        // Options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: message.currency,
            amount: `${message.amount}`,
            order_id: message.id,
            name: "ScholarsBridge",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function(response) {
                verifyPayment({...response, courses}, token, navigate, dispatch);
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        });
        
    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}


//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });

        console.log("VERIFY PAYMENT RESPONSE", response); // Log the verification response

        if (!response.data.success) {
            console.error("Verification failed:", response.data.message); // Log the failure message
            throw new Error(response.data.message);
        }

        toast.success("Payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error(`Could not verify Payment: ${error.message}`); // Include specific error message
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
