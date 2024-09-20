const { db } = require("../../services/db")
const moment = require("moment")

exports.handler = async (event) => {
    console.log(event)

    try {
        const { id } = event.pathParameters

        // Hämta bokningen
        const bookingResult = await db.get({
            TableName: "bookings",
            Key: { bookingId: id }
        })
    
        const booking = bookingResult.Item
        console.log("booking:", booking)

        if (!booking) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Booking not found" })
            }
        }

        const checkInDate = booking.checkInDate

        const today = moment().startOf("day") // dagens datum
        const checkIn = moment(checkInDate)
        
        const daysDiff = checkIn.diff(today, "days")

        if (daysDiff < 2) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Cancellation can only be made at least two days ahead of checkInDate" })
            }
        }

        const deleteResult = await db.delete({
            TableName: "bookings",
            Key: { bookingId: id},
            ReturnValues: "ALL_OLD"  // returnerar det gamla itemet
        })

        console.log("deleteResult:", deleteResult)

        const deleteResponse = deleteResult.Attributes

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Booking successfully canceled", deleteResponse})
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Failed to cancel booking", error: error.message })
        }
    }
    

}