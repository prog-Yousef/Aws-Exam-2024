const { db } = require("../../services/db")
const { v4: uuidv4 } = require('uuid');

module.exports.handler = async (event) => {
    console.log(event)

    // Exempel på hur rooms array kan se ut:
    // // rooms = [
    //         { "roomType": "single", "quantity": 1 },
    //     ]
    try {

        const { customerName, customerEmail, guests, rooms, checkInDate, checkOutDate, } = JSON.parse(event.body) // "name" är ett reserverat ord

        if (!customerName || !customerEmail || !guests || !rooms || !checkInDate || !checkOutDate ) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "All fields required" })
            }
        }

        // Validera antal gäster och rum och räkna ut priset
        let totalAllowedGuests = 0
        let totalCost = 0
        for (const room of rooms) {
            const { roomType, quantity } = room

            // Hämta info om rummen
            const {Items} = await db.query({
                TableName: "rooms",
                KeyConditionExpression: "roomType = :roomType",
                ExpressionAttributeValues: {
                    ":roomType": roomType
                }
            })

            const roomDetails = Items[0] // returnerade en array med ett objekt


            // räkna ut totala antal gäster som får plats samt totala priset
            totalAllowedGuests += roomDetails.guestsAllowed * quantity
            totalCost += roomDetails.price * quantity
        }

        // Validera om totala antal gäster som får plats i bokningen är större än antal bokade gäster
        if (totalAllowedGuests < guests) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Number of guests does not match total allowed guests" })
            }
        }

        const bookingId = uuidv4()
        const checkInDateObject = new Date(checkInDate)
        const checkOutDateObject = new Date(checkOutDate)

        await db.put({
            TableName: "bookings",
            Item: {
                bookingId: bookingId,
                customerName: customerName,
                customerEmail: customerEmail,
                guests: guests,
                rooms: rooms,
                checkInDate: checkInDateObject.toISOString(), 
                checkOutDate: checkOutDateObject.toISOString(),
                totalCost
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: "Booking created",
                bookingNumber: bookingId,
                numberOfGuests: guests,
                totalCost: totalCost,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                name: customerName
            })
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed", error: error.message })
        }
    }
}