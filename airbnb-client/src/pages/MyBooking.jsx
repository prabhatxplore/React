import { useEffect, useState } from "react";
import Card from "../components/Card";
import BookingCard from "../components/BookingCard";

function MyBooking() {
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    const fetchBookingHome = async () => {
      const res = await fetch(`/api/bookings`, { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        console.log(data);
        setBooking(data.bookings);
      }
    };
    fetchBookingHome();
  }, []);
  return (
    <div className="border-t-[1px] border-t-gray-300 px-3 overflow-y-auto">
      <h1 className=" text-center p-6 rounded-3xl font-medium text-2xl ">
        My Bookings
      </h1>
      <div  className="flex flex-wrap justify-center items-center gap-9">
        {booking?.map((home) => (
          <BookingCard key={home._id} booking={home} />
        ))}
      </div>
    </div>
  );
}

export default MyBooking;
