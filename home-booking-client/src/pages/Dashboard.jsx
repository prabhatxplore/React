import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const calculateDays = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    // Calculate difference in milliseconds
    const diffInMs = end - start;

    // Convert ms to days: ms / (1000ms * 60s * 60m * 24h)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    // Math.round ensures you get a whole number even with timezone shifts
    return Math.round(diffInDays);
  };

  // Usage inside your dashboard:
  const days = calculateDays("2026-03-10T00:00:00.000Z", "2026-03-11T00:00:00.000Z");
  console.log(days); // Output: 1
  // 1. Fetch data from your MERN backend
  const fetchHostDashboard = useCallback(() => {
    fetch('/api/host/get-bookings')
      .then(res => res.json())
      .then((data) => {
        if (data.success) {


          setBookings(data.hostHomes)
        }
        else {
          toast.error(data.message)
        }
      }).catch(err => toast.error("Failed communicating with server"));
  })
  useEffect(() => {
    fetchHostDashboard()
    // Mock data for now:
  }, []);

  // 2. Filter logic
  const paidHomes = bookings.filter(b => ["paid", "confirmed"].includes(b.status));

  const handleConfirm = useCallback(async (bookingId) => {
    const res = await fetch(`/api/host/confirm-booking/${bookingId}`, {
      method: "POST",
      credentials: "include"
    }).then(data => data.json())

    if (res.success) {
      toast.success(res.message)
      fetchHostDashboard()
    }
    else {
      toast.error(res.message)
    }
  })
  const handleCancel = useCallback(async (bookingId) => {
    const res = await fetch(`/api/host/cancel-booking/${bookingId}`, {
      method: "POST",
      credentials: "include"
    }).then(data => data.json())

    if (res.success) {
      toast.success(res.message)
      fetchHostDashboard()
    }
    else {
      toast.error(res.message)
    }
  })

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>

      {/* 3. Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-3xl font-bold">{bookings.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-500">Paid Homes</p>
          <h2 className="text-3xl font-bold text-green-600">{paidHomes.length}</h2>
        </div>
        <div className='flex'>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-gray-500">Total Earnings</p>
            <h2 className="text-3xl font-bold text-green-600">{bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}</h2>
          </div>

        </div>
      </div>

      {/* 4. Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left ">
          <thead className="bg-gray-50 text-center">
            <tr>
              <th className="p-4">Home Name</th>
              <th className="p-4">Price (NPR)</th>
              <th className="p-4">Days</th>

              <th className="p-4">Status</th>
              <th className="p-4">Confirm</th>

            </tr>
          </thead>
          <tbody>
            {bookings.map(home => (
              <tr key={home._id} className="border-t text-center">
                <td className="p-4">{home.homeDetails.house_name}</td>
                <td className="p-4">{home.totalPrice}</td>
                <td>{calculateDays(home.checkIn, home.checkOut)}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    {home.status}
                  </span>
                </td>
                <td><div className='flex justify-center gap-4'>
                  <button onClick={() => { handleConfirm(home._id) }} className='bg-green-300 p-1 cursor-pointer rounded-[6px]'>Confirm</button>
                  <button onClick={() => { handleCancel(home._id) }} className='bg-red-300 p-1 cursor-pointer rounded-[6px]'>Cancel</button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;