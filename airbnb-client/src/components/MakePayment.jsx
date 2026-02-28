import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


function MakePayment({ bookingHome }) {
    console.log(bookingHome)
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (e) => {
        e.preventDefault()
        if (!elements || !stripe) return
        const card = elements.getElement(CardElement);
        const res = await fetch(`/api/payment/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId: bookingHome._id }), credentials: "include"
        })

        const { clientSecret } = await res.json()

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card }
        })

        if (result.error) {
            console.error(result)
        } else if (result.paymentIntent.status === "succeeded") {
            alert("Successfully paid")
        }
        console.log(result)
    }

    return (
        <form onSubmit={handlePayment} className="p-8">
            <div className="mb-6">
                <CardElement className="p-4 border border-gray-300 rounded-lg" />
            </div>
            <button type="submit"
                className="w-full px-6 cursor-pointer py-3 bg-green-500 border-[1.8px] font-medium border-green-700 text-white rounded-lg hover:opacity-70 transition text-lg"
            >
                Pay now
            </button>
        </form>
    );
}

export default MakePayment;