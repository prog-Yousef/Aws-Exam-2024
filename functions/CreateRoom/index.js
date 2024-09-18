const { db } = require("../../services/db");
const { sendResponse, sendError } = require("../../responses/index");
const generateRooms = require("../../utils/generateRooms.js");
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  const body = JSON.parse(event.body)

  const { Volume, roomType, price, isAvailable, guestsAllowed } = body;

  if (!Volume || !roomType || !price || !isAvailable || !guestsAllowed) {
    return sendError(400, "Please provide all fields");
  }

  try {
    await db.put({
      TableName: "rooms",
      Item: {
        id: uuidv4(),
        RoomType: roomType,
        price: price,
        isAvailable: isAvailable,
        guestsAllowed: guestsAllowed
      }
    })
    return sendResponse(200, "Room Created!");
  } catch (error) {
    return sendError(500, "Error creating room");
  }
}


