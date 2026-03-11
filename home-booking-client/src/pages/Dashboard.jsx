import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'paid', 'pending', 'cancelled'

  // Helper for Status Colors - Clean and maintainable
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const calculateDays = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffInMs = end - start;
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  };

  const fetchHostDashboard = useCallback(() => {
    fetch('/api/host/get-bookings')
      .then(res => res.json())
      .then((data) => {
        if (data.success) {
          setBookings(data.hostHomes);
        } else {
          toast.error(data.message);
        }
      })
      .catch(err => toast.error("Failed communicating with server"));
  }, []);

  useEffect(() => {
    fetchHostDashboard();
  }, [fetchHostDashboard]);

  // Combined Filtering Logic
  const filteredBookings = bookings.filter(b => {
    if (filterStatus === 'all') return true;
    return b.status.toLowerCase() === filterStatus;
  });

  // Action Handlers
  const handleAction = async (bookingId, action) => {
    const endpoint = action === 'confirm' ? 'confirm-booking' : 'cancel-booking';
    try {
      const res = await fetch(`/api/host/${endpoint}/${bookingId}`, {
        method: "POST",
        credentials: "include"
      }).then(data => data.json());

      if (res.success) {
        toast.success(res.message);
        fetchHostDashboard();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Owner Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-2xl font-bold text-gray-800">
            $ {bookings.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.totalPrice, 0)}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Active Bookings</p>
          <h2 className="text-2xl font-bold text-blue-600">{bookings.filter(b => b.status !== 'cancelled').length}</h2>
        </div>
        {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Cancellation Rate</p>
          <h2 className="text-2xl font-bold text-red-500">
            {bookings.length > 0 ? ((bookings.filter(b => b.status === 'cancelled').length / bookings.length) * 100).toFixed(1) : 0}%
          </h2>
        </div> */}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 bg-white p-1 rounded-lg shadow-sm w-fit border border-gray-200">
        {['all', 'paid', 'pending', 'cancelled','confirmed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterStatus === status
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Home Name</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Price</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Stay</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Status</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? filteredBookings.map(home => (
              <tr key={home._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{home.homeDetails.house_name}</td>
                <td className="p-4 text-center">${home.totalPrice}</td>
                <td className="p-4 text-center text-sm text-gray-600">
                  {calculateDays(home.checkIn, home.checkOut)} Nights
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(home.status)}`}>
                      {home.status.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className='flex justify-center gap-2'>
                    {home.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAction(home._id, 'confirm')}
                          className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded-md transition-colors'
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleAction(home._id, 'cancel')}
                          className='bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1 text-sm rounded-md transition-colors'
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {home.status !== 'pending' && <span className="text-gray-400 text-xs italic">Completed</span>}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400">No bookings found for this filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;