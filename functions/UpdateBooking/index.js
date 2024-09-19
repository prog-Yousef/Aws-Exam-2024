const { db } = require("../../services/db")
const validateGuestsAndRooms = require("../../utils/validateGuestsAndRooms")
const calculateTotalPrice = require("../../utils/calculateTotalPrice")

exports.handler = async (event) => {
    console.log(event)

    try {
        const { id } = event.pathParameters

        const { guests, rooms, checkInDate, checkOutDate } = JSON.parse(event.body)

        // Hämta bokningen
        const bookingResult = await db.get({
            TableName: "bookings",
            Key: { bookingId: id }
        })

        const booking = bookingResult.Item

        if (!booking) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Booking not found" })
            }
        }

        console.log("Booking:", booking)

        // Validera antal rum och antal gäster beroende på vad som skickats in, antingen rum eller gäster eller både och
        // Beräka total kostnad ifall rooms har ändrats, annars behåll 
        const updatedRooms = rooms || booking.rooms
        const updatedGuests = guests || booking.guests

        if (updatedRooms || updatedGuests) {
            const validation = await validateGuestsAndRooms(updatedGuests, updatedRooms)
            if (!validation.valid) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: validation.message })
                };
            }
        }
        
        const updatedTotalCost = updatedRooms ? await calculateTotalPrice(updatedRooms) : booking.totalCost
        
        const updatedBooking = {
            ...booking,
            guests: guests || booking.guests,
            rooms: rooms || booking.rooms,
            checkInDate: checkInDate || booking.checkInDate,
            checkOutDate: checkOutDate || booking.checkOutDate,
            totalCost: updatedTotalCost || booking.totalCost 
        }

        await db.put({
            TableName: "bookings",
            Item: updatedBooking
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Successfully updated booking", updatedBooking })
        }

    } catch (error) {
        console.error(error)
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Failed to update booking", error: error.message })
        }
    }
}