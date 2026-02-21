import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const HomeDetails = () => {
  // These represent the fields you mentioned
  const [home, setHome] = useState({});
  const { homeID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await fetch(`/api/home-details/${homeID}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setHome(data.home);
        } else {
          alert(data.message);
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchHome();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-gray-900">
      {/* 1. Header Section */}
      <header className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">
          {home?.house_name}
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm font-semibold underline underline-offset-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {home?.location}
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:bg-gray-50 p-2 rounded-lg transition">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              Save
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Image - Clean full-width style */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-sm">
          <img
            className="w-full h-full object-cover"
            src={`http://192.168.100.65:3000${home?.photo}`}
            alt={home?.house_name}
          />
        </div>
      </section>

      {/* 3. Content Grid */}
      <main className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Details */}
        <div className="lg:col-span-2">
          <div className="border-b border-gray-100 pb-8 mb-8">
            <h2 className="text-2xl font-bold mb-1">
              About {home?.house_name}
            </h2>
            <p className="text-gray-500 font-medium">
              {home.location} • Premium Stay
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
              {home?.description}
            </p>
          </div>

          {/* Quick Icons Section (Hardcoded for clean UI) */}
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-gray-50 rounded-xl">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M2.25 21h19.5M4.5 21V3.545m0 0L12 2.25l7.5 1.295" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Entire Home</p>
                <p className="text-sm text-gray-500">
                  You'll have the house to yourself.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-gray-50 rounded-xl">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Free Cancellation</p>
                <p className="text-sm text-gray-500">
                  Full refund for 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Price Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 border border-gray-200 rounded-3xl p-8 shadow-xl shadow-gray-100/50 bg-white">
            <div className="flex justify-between items-baseline mb-8">
              <div>
                <span className="text-3xl font-extrabold text-gray-900">
                  ${home.price}
                </span>
                <span className="text-gray-500 font-medium"> / night</span>
              </div>
            </div>

            {/* Simulated Form for UI */}

            <button className="w-full cursor-pointer bg-[#FF385C] hover:bg-[#E31C5F] text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all">
              Book Now
            </button>

            <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
              <div className="flex justify-between font-bold text-gray-900 text-lg pt-2">
                <span>Total</span>
                <span>${home?.price}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeDetails;
