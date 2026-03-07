import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const BookingCard = ({ booking, setSelectBooking, setClientSecret, refresh }) => {
  const [date, setDate] = useState(null)
  useEffect(() => {
    setDate(new Date(booking.createdAt))
  }, [])
  const [isPay, setIsPay] = useState(false)
  const statusTheme = {
    pending: {
      card: "bg-yellow-50 border-yellow-200",
      badge: "bg-yellow-500 text-black",

    },
    paid: {
      card: "bg-blue-50 border-blue-200",
      badge: "bg-blue-600 text-white"
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
          toast.success(data.message)
          refresh()
        } else {
          setError(data.message);
          toast.error(data.message)
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed")
      }
    }
  };

  const handlePay = async (e) => {
    setIsPay(true)
    e.preventDefault();
    const data = await fetch(`/api/payment/create-payment-intent`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: booking._id })
    })

    const response = await data.json()
    console.log(response)
    if (response.success) {
      toast.info(response.message)
      setSelectBooking(booking)
      setClientSecret(response.clientSecret)
      refresh()
    } else {
      setIsPay(false)
      toast.info(response.message)
      setSelectBooking(null)
      setClientSecret(null)
    }
  }

  return (
    <div
      className={`relative w-full max-w-6xl mb-6 mx-auto rounded-2xl border ${current.card} p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md transition duration-500 group`}
    >
      {/* Time created */}

      {/* Status Badge */}
      <span className={`absolute z-10 -top-4  right-6  border-[1px] rounded-[7px] px-3 ${current.card} `}>
        {date && date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",

          hour12: true // or false for 24h format
        })}
      </span>
      <span
        className={`absolute z-10 top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${current.badge}`}
      >
        {booking.status?.toUpperCase()}
      </span>
      <div className="flex-4 flex gap-5">
        {/* Image */}
        <div className=" w-full h-40 overflow-hidden rounded-xl">
          <img
            className="w-full h-full group-hover:scale-110 object-cover object-center  transition-transform ease-in duration-300"
            src={`${booking.home?.photo}`}
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

      {["pending"].includes(booking.status) && <> <div

        className="flex flex-1 flex-col justify-center gap-4 "
      >
        <button onClick={handlePay}
          className="px-4 text-center cursor-pointer py-2 bg-green-400 border-[1.7px] font-medium border-green-600 text-black rounded-lg hover:opacity-70 transition text-sm"
        >
          Pay
        </button>
        <button onClick={handleCancel}
          disabled={isPay}
          className="px-4 cursor-pointer py-2 bg-red-100 border-[1.5px] font-medium border-red-500 text-red-500 rounded-lg hover:opacity-70 transition text-sm"
        >
          Cancel
        </button>
      </div>
      </>}


      {/* )} */}
    </div>
  );
};

export default BookingCard;
