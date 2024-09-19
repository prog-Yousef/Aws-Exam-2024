const { db } = require("../services/db")

const validateGuestsAndRooms = async (guests, rooms) => {
    let totalAllowedGuests = 0

    for (const room of rooms) {
        const { roomType, quantity } = room

        // Hämta info om rummet
        const { Items } = await db.query({
            TableName: "rooms",
            KeyConditionExpression: "roomType = :roomType",
            ExpressionAttributeValues: {
                ":roomType": roomType
            }
        })

        
        if (Items.length === 0) {
            return {
                valid: false,
                message: `Room type ${roomType} not found`
            }
        }

        const roomDetails = Items[0] // array med ett objekt

        totalAllowedGuests += roomDetails.guestsAllowed * quantity
    }

    // Kolla om antalet gäster är mer än vad som är tillåtet
    if (guests > totalAllowedGuests) {
        return {
            valid: false,
            message: "Number of guests do not match total allowed guests"
        }
    }

    return {
        valid: true
    }
}

module.exports = validateGuestsAndRooms