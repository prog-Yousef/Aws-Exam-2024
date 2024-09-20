const { db } = require("../../services/db")
const validateGuestsAndRooms = require("../../utils/validateGuestsAndRooms")
const calculateTotalPrice = require("../../utils/calculateTotalPrice")

exports.handler = async (event) => {
    console.log(event)

    try {
        const { id } = event.pathParameters

        const { guests, rooms, checkInDate, checkOutDate } = JSON.parse(event.body)

        // Om inget skickats in så avbryt
        if (!guests && !rooms && !checkInDate && !checkOutDate) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "No fields to update" })
            }
        }

        // Hämta bokningen för att jämföra om guests eller rooms har ändrats
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

        const updatedGuests = guests || booking.guests
        const updatedRooms = rooms || booking.rooms
        const updatedCheckInDate = checkInDate || booking.checkInDate
        const updatedCheckOutDate = checkOutDate || booking.checkOutDate

        // Kolla om något har förändrats, annars returnera
        if (updatedGuests === booking.guests && JSON.stringify(updatedRooms) === JSON.stringify(booking.rooms) &&
            updatedCheckInDate === booking.checkInDate && updatedCheckOutDate === booking.checkOutDate
        ) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Nothing has changed from your booking" })
            }
        }

        // Kör validering bara om guests eller rooms har ändrats. Var tvungen att göra om rooms till strängar. 
        if (updatedGuests !== booking.guests || JSON.stringify(updatedRooms) !== JSON.stringify(booking.rooms)) {
            const validation = await validateGuestsAndRooms(updatedGuests, updatedRooms)
            if (!validation.valid) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: validation.message })
                };
            }
        }
        
        // Beräka total kostnad ifall rooms har ändrats, annars behåll. Gör om till strängar för att kunna jämföra arrays med objects...
        const updatedTotalCost = JSON.stringify(updatedRooms) !== JSON.stringify(booking.rooms) ? await calculateTotalPrice(updatedRooms) : booking.totalCost

        // UpdateExpressions beroende på vad som skickats in
        let updateExpressions = []
        let expressionAttributeValues = {}

        // Uppdatera bara om attributet har ändrats. T ex om man skickar in ett attribut som ändrats och ett annat som inte har ändrats så kommer det ändå gå igenom, men bara uppdatera attributet som har ändrats.
        if (guests && guests !== booking.guests) {
            updateExpressions.push("guests = :guests")
            expressionAttributeValues[":guests"] = guests
        }

        if (rooms && JSON.stringify(rooms) !== JSON.stringify(booking.rooms)) {
            updateExpressions.push("rooms = :rooms")
            expressionAttributeValues[":rooms"] = rooms
        }

        if (checkInDate && checkInDate !== booking.checkInDate) {
            updateExpressions.push("checkInDate = :checkInDate")
            expressionAttributeValues[":checkInDate"] = checkInDate
        }

        if (checkOutDate && checkOutDate !== booking.checkOutDate) {
            updateExpressions.push("checkOutDate = :checkOutDate")
            expressionAttributeValues[":checkOutDate"] = checkOutDate
        }

        if (updatedTotalCost !== booking.totalCost) {
            updateExpressions.push("totalCost = :totalCost")
            expressionAttributeValues[":totalCost"] = updatedTotalCost
        }
        

        const updateExpression = "SET " + updateExpressions.join(", ")

        const updateResult = await db.update({
            TableName: "bookings",
            Key: { bookingId: id},
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "UPDATED_NEW" // returnerar endast de attribut som ändrats
            // ReturnValues: "ALL_NEW" returnerar alla attribut efter uppdateringen
        })

        console.log("Update result:", updateResult)

        const updatedBooking = updateResult.Attributes

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