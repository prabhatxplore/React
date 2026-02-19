import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <nav className="w-full h-16 flex justify-between text-center items-center gap-4 px-4">
            <div className="flex-1">
                <span className="font-bold text-2xl text-[#FF385C]" an>Airbnb</span>
            </div>
            <div className="flex-3 flex justify-center">
                <NavLink className="transition duration-150 rounded-[8px] p-1 px-3 font-medium"
                    href="/">Home</NavLink>

                <NavLink className=" transition duration-150 rounded-[8px] p-1 px-3 font-medium"
                    href="/bookings">Booking</NavLink>
                <NavLink className=" transition duration-150 rounded-[8px] p-1 px-3 font-medium"
                    href="/fav-list">Favourite</NavLink>


                <NavLink className=" transition duration-150 rounded-[8px] p-1 px-3 font-medium"
                    href="/host/host-home">Host Home</NavLink>
                <NavLink className=" transition duration-150 rounded-[8px] p-1 px-3 font-medium"
                    href="/host/add-home">Add Home</NavLink>



            </div>
            <div className="flex-1 h-16 flex items-center">
                <NavLink to="/login"
                    className=" w-full cursor-pointer  transition duration-150 rounded-[8px] p-1 px-3 font-medium">Login</NavLink>


                <NavLink to="/signup"
                    className="w-full cursor-pointer  transition duration-150 rounded-[8px] p-1 px-3 font-medium">Sign
                    up</NavLink>



                <button type="submit"
                    className="bg-[#FF385C] w-full cursor-pointer  transition duration-150 rounded-4xl p-3 font-medium">Logout</button>


            </div>
        </nav>
    )
}

export default Navbar