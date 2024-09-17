const { db } = require("../../services/db")



// Hämtar bokningar sorterat efter datum. Men kanske räcker med att göra en scan för att hämta allt...
exports.handler = async (event) => {
    console.log(event)

    const { startDate, endDate } = JSON.parse(event.body)

    try {
        const {Items} = await db.query({
            TableName: "bookings",
            IndexName: "CheckInDateIndex",
            KeyConditionExpression: "checkInDate >= :startDate AND checkInDate <= :endDate",
            ExpressionAttributeValues: {
                ":startDate": startDate,
                ":endDate": endDate
            },
            ScanIndexForward: true // sorterar efter datum i fallande ordning 
        })

        // Specificera returen: 
        // Bokningsnummer
        // In-och utcheckningsdatum
        // Antal gäster
        // Antalet rum
        // Namn på den som bokade rummet

        return {
            statusCode: 200,
            body: JSON.stringify(Items)
        }

    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error", error: error.message})
        }
    }
}