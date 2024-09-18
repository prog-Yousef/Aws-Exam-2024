const { db } = require("../../services/db")


// Hämtar alla bokningar 
module.exports.handler = async (event) => {
    console.log(event)

    // const { startDate, endDate } = JSON.parse(event.body)

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
            body: JSON.stringify({ message: "Successfully retreived bookings", Items})
        }

    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error get bookings", error: error.message})
        }
    }
}
