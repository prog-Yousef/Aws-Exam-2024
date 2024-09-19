const { db } = require("../../services/db");
const { sendResponse, sendError } = require("../../responses/index");
/* const generateRooms = require("../../utils/generateRooms.js");
 */const { v4: uuidv4 } = require('uuid');

// Function to generate room details based on guestsAllowed
 const generateRooms = (guestsAllowed) => {
  if (guestsAllowed === 1) {
    return {
      price: 500,
      roomType: 'single',
    };
  } else if (guestsAllowed === 2) {
    return {
      price: 1000,
      roomType: 'double',
    };
  } else if (guestsAllowed === 3) {
    return {
      price: 1500,
      roomType: 'suite',
    };
  } else {
    return {
      error: true,
      message: `The hotel cannot accommodate ${guestsAllowed} guests. Please adjust your booking.`,
    };
  }
}; 
exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  // Check for required fields
  if (body.guestsAllowed === undefined || body.roomType === undefined || body.price === undefined) {
    return sendError(400, "Please provide guestsAllowed, roomType, and price.");
  }

  // Generate room details based on guestsAllowed
 const roomDetails = generateRooms(body.guestsAllowed); 

  // Check for errors in room generation
  if (roomDetails.error) {
    return sendError(400, roomDetails.message);
  }

  try {
    // Insert the item into the DynamoDB table
    await db.put({
      TableName: "rooms",
      Item: {
        id: uuidv4(), // Generate a unique ID
        roomType: body.roomType,
        price: body.price,
        guestsAllowed: body.guestsAllowed,

      },
    })

  } catch (error) {
    console.error("Error creating room:", error); // Log the error for debugging
    return sendError(500, `Error creating room: ${error.message || "Internal server error"}`);
  }
  return sendResponse(200, "Room Created!");
};