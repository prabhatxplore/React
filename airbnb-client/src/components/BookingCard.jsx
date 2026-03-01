import { useState } from "react";
import { Link } from "react-router-dom";

const BookingCard = ({ booking, setSelectBooking, setClientSecret }) => {
  console.log("This is my booking", booking);
  const statusTheme = {
    pending: {
      card: "bg-yellow-50 border-yellow-200",
      badge: "bg-yellow-500 text-white",
    },
    confirmed: {
      card: "bg-green-50 border-green-200",
      badge: "bg-green-600 text-white",
    },
    cancelled: {
      card: "bg-red-50 border-red-200",
      badge: "bg-red-600 text-white",
    },
  };

  const current = statusTheme[booking.status] || {
    card: "bg-gray-50 border-gray-200",
    badge: "bg-gray-500 text-white",
  };

  const [error, setError] = useState(null);
  const handleCancel = async (e) => {
    e.preventDefault();
    if (confirm("Are sure want to cancel") && booking.status !== "cancelled") {
      try {
        const res = await fetch(`/api/bookings/${booking._id}/cancel-booking`, {
          method: "PATCH",
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          alert(data.message);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handlePay = async (e) => {
    e.preventDefault();
    const data = await fetch(`/api/payment/create-payment-intent`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: booking._id })
    })

    const response = await data.json()
    if (response.success) {
      console.log("Set select Booking", booking)
      setSelectBooking(booking)
      setClientSecret(response.clientSecret)
    } else {
      alert("failed to create payment intent")
      setSelectBooking(null)
      setClientSecret(null)
    }
  }

  return (
    <div
      className={`relative w-full max-w-6xl mx-auto rounded-2xl border ${current.card} p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md transition group`}
    >
      {/* Status Badge */}
      <span
        className={`absolute z-10 top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${current.badge}`}
      >
        {booking.status?.toUpperCase()}
      </span>
      <div className="flex-4 flex gap-5">
        {/* Image */}
        <div className=" w-full h-40 overflow-hidden rounded-xl">
          <img
            className="w-full h-full group-hover:scale-110 object-cover object-top  transition-transform ease-in duration-300"
            src={`http://192.168.100.65:3000${booking.home?.photo}`}
            alt={booking.home?.house_name}
          />
        </div>

        {/* Info */}
        <div className=" flex flex-col justify-center space-y-3">
          {/* Title + Location */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{booking.home?.house_name}</h2>

            <p className="text-sm text-gray-500">📍 {booking.home?.location}</p>

            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {booking.home?.description}
            </p>
          </div>

          {/* Dates */}
          <div className="flex gap-10 text-sm text-gray-700">
            <div>
              <p className="font-medium">Check In</p>
              <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="font-medium">Check Out</p>
              <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Button */}
      {/* {booking.status !== "cancelled" && ( */}
      <div

        className="flex flex-1 flex-col justify-center gap-4 "
      >
        <button onClick={handlePay}
          className="px-4 text-center cursor-pointer py-2 bg-green-400 border-[1.7px] font-medium border-green-600 text-black rounded-lg hover:opacity-70 transition text-sm"
        >
          Pay
        </button>
        <button onClick={handleCancel}
          className="px-4 cursor-pointer py-2 bg-red-100 border-[1.5px] font-medium border-red-500 text-red-500 rounded-lg hover:opacity-70 transition text-sm"
        >
          Cancel
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default BookingCard;
