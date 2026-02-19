import React from 'react'

function Login() {
    return (
        <main class="flex justify-center items-center px-4 py-10 sm:py-16">
            <form action="/login" class="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col gap-6"
                method="POST">

                <h1 class="text-center text-2xl sm:text-3xl font-bold">
                    Login Page
                </h1>

                <div class="flex flex-col gap-4">
                    <input required minlength="7" value=""
                        class="outline outline-gray-300 w-full bg-white h-11 rounded-3xl px-5 focus:outline-green-500"
                        type="email" name="email" placeholder="Email" />

                    <input type="password" required name="password"
                        class="outline outline-gray-300 w-full bg-white h-11 rounded-3xl px-5 focus:outline-green-500"
                        placeholder="Password" />
                </div>

                <input type="submit" value="Login"
                    class="w-full cursor-pointer font-medium shadow-md bg-green-500 hover:bg-green-600 text-black rounded-3xl h-11 transition duration-300 active:scale-95" />

            </form>
        </main>
    )
}

export default Login