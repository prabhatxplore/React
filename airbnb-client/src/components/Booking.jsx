import { ErrorMessage, useFormik } from "formik"
import { bookingSchecma } from "../validation/bookingSchema"

export default function Booking({ home }) {

    const formik = useFormik({
        initialValues: {
            checkIn: "",
            checkOut: "",
        },
        validationSchema: bookingSchecma,
        onSubmit: async (values) => {
            console.log(values)
        }
    })
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="col-span-4 sticky top-24 h-fit border border-gray-200 shadow-xl rounded-2xl p-6 flex flex-col gap-4 bg-white"
        >
            {/* Price Header */}
            <div className="mb-2">
                <span className="text-2xl font-bold">${home.price}</span>
                <span className="text-gray-600 font-normal text-base"> night</span>
            </div>

            {/* Date Picker Container */}
            <div className="border border-gray-400 rounded-xl overflow-hidden">
                <div className="flex border-b border-gray-400">
                    {/* Check In */}
                    <div className="flex-1 p-3 border-r border-gray-400 focus-within:bg-gray-50 transition-colors">
                        <label htmlFor="checkIn" className="block text-[10px] font-bold uppercase tracking-tight text-gray-900">
                            Check In
                        </label>
                        <input
                            type="date"
                            name="checkIn"
                            id="checkIn"
                            className="w-full text-sm outline-none bg-transparent cursor-pointer"
                            {...formik.getFieldProps('checkIn')}
                        />
                    </div>

                    {/* Check Out */}
                    <div className="flex-1 p-3 focus-within:bg-gray-50 transition-colors">
                        <label htmlFor="checkOut" className="block text-[10px] font-bold uppercase tracking-tight text-gray-900">
                            Check Out
                        </label>
                        <input
                            type="date"
                            name="checkOut"
                            id="checkOut"
                            className="w-full text-sm outline-none bg-transparent cursor-pointer"
                            {...formik.getFieldProps('checkOut')}
                        />
                    </div>
                </div>
            </div>

            {/* Error Messages (Floating below inputs) */}
            {(formik.touched.checkIn && formik.errors.checkIn) || (formik.touched.checkOut && formik.errors.checkOut) ? (
                <div className="flex flex-col gap-1 px-1">
                    {formik.touched.checkIn && formik.errors.checkIn && (
                        <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full" /> {formik.errors.checkIn}
                        </p>
                    )}
                    {formik.touched.checkOut && formik.errors.checkOut && (
                        <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full" /> {formik.errors.checkOut}
                        </p>
                    )}
                </div>
            ) : null}

            {/* Price Breakdown */}
            <div className="flex flex-col gap-3 mt-2 py-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600">
                    <span className="underline italic">Price per night</span>
                    <span>${home.price}</span>
                </div>

                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3 mt-1">
                    <span>Total price</span>
                    <span>${/* Add logic here */}0</span>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 shadow-md"
            >
                Reserve
            </button>

            <p className="text-center text-sm text-gray-500 mt-2 font-normal">
                You won't be charged yet
            </p>
        </form>
    )
}
