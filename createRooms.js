const { db } = require("./services/db")
const rooms = [
    { roomType: "single", guestsAllowed: 1, price: 500, availableRooms: 8 },
    { roomType: "double", guestsAllowed: 2, price: 1000, availableRooms: 8 },
    { roomType: "suite", guestsAllowed: 3, price: 1500, availableRooms: 4 }
]

rooms.forEach(async (room) => {
    await db.put({
        TableName: "rooms",
        Item: room
    })
})

// Skapa rummen genom att köra: node createRooms.js
