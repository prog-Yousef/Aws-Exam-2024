const { db } = require("../services/db")

const calculateTotalPrice = async (rooms) => {
    let totalCost = 0

    for (const room of rooms) {
        const { roomType, quantity } = room

         // Hämta info om rumstypen
        const { Items } = await db.query({
            TableName: "rooms",
            KeyConditionExpression: "roomType = :roomType",
            ExpressionAttributeValues: {
                ":roomType": roomType
            }
        })

        const roomDetails = Items[0]

        totalCost += roomDetails.price * quantity
    }

   return totalCost
}

module.exports = calculateTotalPrice