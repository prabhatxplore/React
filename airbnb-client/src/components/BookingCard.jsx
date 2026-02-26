import { useState } from "react";

const BookingCard = ({ booking }) => {
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
        conole.log(err);
      }
    }
  };

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto rounded-2xl border ${current.card} p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md transition`}
    >
      {/* Status Badge */}
      <span
        className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${current.badge}`}
      >
        {booking.status?.toUpperCase()}
      </span>

      {/* Image */}
      <div className="md:w-60 w-full h-40 flex-shrink-0">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={`http://192.168.100.64:3000${booking.home?.photo}`}
          alt={booking.home?.house_name}
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center space-y-3">
        {/* Title + Location */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Ronaldo</h2>

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

      {/* Button */}
      {/* {booking.status !== "cancelled" && ( */}
      <form
        onSubmit={handleCancel}
        className="flex flex-col justify-center items-center"
      >
        <button
          type="submit"
          className="px-4 cursor-pointer py-2 bg-red-100 border-[1.5px] font-medium border-red-500 text-red-500 rounded-lg hover:opacity-70 transition text-sm"
        >
          Cancel
        </button>
        <span className="font-light text-[14px] text-red-500  ">
          {error && error}
        </span>
      </form>
      {/* )} */}
    </div>
  );
};

export default BookingCard;
