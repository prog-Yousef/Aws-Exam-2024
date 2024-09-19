const {db} = require("../../services/db.js");
const {sendResponse, sendError} = require("../../responses/index.js");

exports.handler = async (event) => {
    
    try {
      // Querying the DynamoDB table "bookings"
      const result = await db.query({
        TableName: "bookings",
        KeyConditionExpression: "bookingId = :bookingId",
        ExpressionAttributeValues: {
          ":bookingId": event.pathParameters.id,
        },
        ProjectionExpression: "bookingId, checkInDate, checkOutDate, numberOfGuests, customerName, rooms",
      })
  
      // Return the bookings in the response
      return sendResponse(200, {
        message: "Successfully retrieved bookings",
        data: result.Items,
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return sendError(500, error.message);
    }
  };