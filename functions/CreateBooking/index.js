const { db } = require("../../services/db")
const { v4: uuidv4 } = require('uuid');
const validateGuestsAndRooms = require("../../utils/validateGuestsAndRooms")
const calculateTotalPrice = require("../../utils/calculateTotalPrice")


module.exports.handler = async (event) => {
    console.log(event)

    try {

        const { customerName, customerEmail, guests, rooms, checkInDate, checkOutDate, } = JSON.parse(event.body) // "name" är ett reserverat ord

        if (!customerName || !customerEmail || !guests || !rooms || !checkInDate || !checkOutDate ) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "All fields required" })
            }
        }

        // Validera antal gäster och rummens kapacitet 
        const validation = await validateGuestsAndRooms(guests, rooms) 
        if (!validation.valid) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: validation.message})
            }
        }

        // Beräkna kostnaden
        const totalCost = await calculateTotalPrice(rooms)

        const bookingId = uuidv4()
        const checkInDateFormatted = new Date(checkInDate).toISOString().split("T")[0] // Tar bort klockslag för att få YYYY-MM-DD
        const checkOutDateFormatted = new Date(checkOutDate).toISOString().split("T")[0]

        await db.put({
            TableName: "bookings",
            Item: {
                bookingId: bookingId,
                customerName: customerName,
                customerEmail: customerEmail,
                guests: guests,
                rooms: rooms,
                checkInDate: checkInDateFormatted, 
                checkOutDate: checkOutDateFormatted,
                totalCost
            }
        })

        const bookingConfirmation = {
            bookingNumber: bookingId,
            numberOfGuests: guests,
            totalCost,
            checkInDate,
            checkOutDate,
            name: customerName
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: "Booking created",
                bookingConfirmation
            })
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed", error: error.message })
        }
    }
}