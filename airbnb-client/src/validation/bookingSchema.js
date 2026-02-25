import * as yup from "yup"

export const bookingSchecma = yup.object({
    checkIn: yup.date()
        .required("Check-in required")
        .min(new Date(), "Check in cannot be in past")
    ,
    checkOut: yup.date().required("Check-out is required")
        .min(
            yup.ref("checkIn"),
            "Check-out must be after check-in"
        )
        .test("is-at-least-one-day",
            "Booking must be for at least 1 night",
            function (value) {
                const { checkIn } = this.parent
                console.log(checkIn)
                if (!checkIn || !value) return true

                const start = new Date(checkIn)
                const end = new Date(value)

                console.log("Start Date", start)
                console.log("End Date", end)

                const diffInMs = end.getTime() - start.getTime();
                console.log("Difference in minutes", diffInMs)

                const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                console.log("Difference in days", diffInDays)

                console.log("is greater or equal to a day :", diffInDays >= 1)
                return diffInDays >= 1;
            }
        )

})