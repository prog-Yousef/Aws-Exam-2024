const { db } = require("../../services/db")

const { db } = require("../../services/db");



// Hämtar bokningar sorterat efter datum. Men kanske räcker med att göra en scan för att hämta allt...
module.exports.handler = async (event) => {
    console.log(event)

    const { startDate, endDate } = JSON.parse(event.body)

    try {
        const {Items} = await db.scan({
            TableName: "bookings",
            // IndexName: "CheckInDateIndex",
            // KeyConditionExpression: "checkInDate >= :startDate AND checkInDate <= :endDate",
            // ExpressionAttributeValues: {
            //     ":startDate": startDate,
            //     ":endDate": endDate
            // },
            // ScanIndexForward: true, // sorterar efter datum i fallande ordning 
            ProjectionExpression: "bookingId, checkInDate, checkOutDate, numberOfGuests, customerName, rooms"
        })

        

        return {
            statusCode: 200,
            body: JSON.stringify(Items)
        }

    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error get bookings", error: error.message})
        }
    }
}
