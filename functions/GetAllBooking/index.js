const { db } = require("../../services/db")


// Hämtar alla bokningar 
module.exports.handler = async (event) => {
    console.log(event)

    try {
        const {Items} = await db.scan({
            TableName: "bookings",
            ProjectionExpression: "bookingId, checkInDate, checkOutDate, guests, customerName, rooms"
        })

        const bookingResponse = Items.map(item => ({
            bookingNumber: item.bookingId,
            checkInDate: item.checkInDate,
            checkOutDate: item.checkOutDate,
            numberOfGuests: item.guests,
            numberOfRooms: item.rooms.reduce((acc, room) => acc + room.quantity, 0), // Beräknar antalet rum
            customerName: item.customerName

        }
        ))

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: "Successfully retreived bookings", 
                bookings: bookingResponse
            })
        }

    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error get bookings", error: error.message})
        }
    }
}
