
const { db } = require("../../services/db")

exports.handler = async (event) => {
    console.log(event)

    const { roomType, guestsAllowed, price, availableRooms} = JSON.parse(event.body)
    try {
        await db.put({
            TableName: "rooms",
            Item: {
                roomType: roomType,
                guestsAllowed: guestsAllowed,
                price: price,
                availableRooms: availableRooms
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Created room" })
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Error creating room", erro: error.message})
        }
    }
}