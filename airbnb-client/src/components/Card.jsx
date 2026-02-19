import { Link } from "react-router-dom"


function Card({ homeId, houseName, location, price, }) {
    return (
        <div className="w-full max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-100 group">

            {/* */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg"
                    alt="Property"
                />

                {/* Favorite Heart Over Image */}
                <form action="/fav-list/toggle" method="POST" className="absolute top-3 right-3 z-10">
                    <input type="hidden" name="_id" value="<%= home._id %>" />
                    <button type="submit" className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow-sm transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* */}
            <div className="p-4 flex flex-col gap-3 flex-grow">

                {/* */}
                <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-900 text-lg truncate">Prabhat</h3>
                        <span className="text-[#FF385C] font-bold text-lg">$5,000</span>
                    </div>

                    {/* Location Row */}
                    <div className="flex items-center gap-1 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827 0-4.401-3.506-8-8-8s-8 3.599-8 8c0 3.847 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium truncate">Ratnanagar, Nepal</p>
                    </div>
                </div>

                {/* */}
                <div className="flex gap-2 mt-2">
                    <Link
                        to="/home-details/1"
                        className="flex-1 text-center py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
                    >
                        Details
                    </Link>
                    <button className="flex-1 py-2 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-black transition">
                        Book Now
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Card