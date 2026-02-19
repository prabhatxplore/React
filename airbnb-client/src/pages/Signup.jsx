import React from 'react'

function Signup() {
    return (
        <main className="flex-1 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-2">
                    Create your account
                </h2>

                <p className="text-center text-gray-500 text-sm mb-8">
                    Join us and start your journey
                </p>

                <form action="/signup" method="POST" className="space-y-5">

                    {/* {  First & Last Name } */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input value="" type="text" name="first_name" required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 
                                   focus:outline-none focus:ring-2 
                                   focus:ring-[#FF385C] transition"/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input value="" type="text" name="last_name" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 
                                   focus:outline-none focus:ring-2 
                                   focus:ring-[#FF385C] transition"/>
                        </div>
                    </div>

                    {/* {<!-- Email -->} */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input value="" type="email" name="email" required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 
                               focus:outline-none focus:ring-2 
                               focus:ring-[#FF385C] transition"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input type="password" name="password" required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 
                               focus:outline-none focus:ring-2 
                               focus:ring-[#FF385C] transition"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input type="password" name="confirm_password" required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 
                               focus:outline-none focus:ring-2 
                               focus:ring-[#FF385C] transition"/>
                    </div>

                    {/* { <!-- User Type -->} */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Register As
                        </label>

                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="user_type" value="guest" required
                                    className="accent-[#FF385C]" />
                                <span className="text-gray-700">Guest</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="user_type" value="host"
                                    className="accent-[#FF385C]" />
                                <span className="text-gray-700">Host</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm">
                        <input type="checkbox" name="terms" required className="mt-1 w-4 h-4 accent-[#FF385C]" />
                        <p className="text-gray-600 leading-relaxed">
                            I agree to the
                            <a href="#" className="text-[#FF385C] font-medium hover:underline">
                                Terms & Conditions
                            </a>
                        </p>
                    </div>

                    <button type="submit" className="w-full bg-[#FF385C] hover:bg-[#e03150]
                               text-white font-medium py-3 rounded-xl 
                               transition duration-200 shadow-md hover:shadow-lg">
                        Create Account
                    </button>

                </form>

            </div>
        </main>
    )
}

export default Signup