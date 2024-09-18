// const volume = [
//     { roomType: "suite", guestsAllowed: 3, price: 1500, isAvailable: true },
//     { roomType: "suite", guestsAllowed: 3, price: 1500, isAvailable: true },
//     { roomType: "suite", guestsAllowed: 3, price: 1500, isAvailable: true },
//     { roomType: "single", guestsAllowed: 1, price: 500, isAvailable: true },
//     { roomType: "single", guestsAllowed: 1, price: 500, isAvailable: true },
//     { roomType: "single", guestsAllowed: 1, price: 500, isAvailable: true },
//     { roomType: "single", guestsAllowed: 1, price: 500, isAvailable: true },
//     { roomType: "single", guestsAllowed: 1, price: 500, isAvailable: true },
//     { roomType: "single", guestsAllowed: 1, price: 500, isAvailable: true },
//     { roomType: "single", guestsAllowed: 1, price: 500, isAvailable: true },
//     { roomType: "double", guestsAllowed: 2, price: 1000, isAvailable: true },
//     { roomType: "double", guestsAllowed: 2, price: 1000, isAvailable: true },
//     { roomType: "double", guestsAllowed: 2, price: 1000, isAvailable: true },
//     { roomType: "double", guestsAllowed: 2, price: 1000, isAvailable: true },
//     { roomType: "double", guestsAllowed: 2, price: 1000, isAvailable: true },
//     { roomType: "double", guestsAllowed: 2, price: 1000, isAvailable: true },
//     { roomType: "double", guestsAllowed: 2, price: 1000, isAvailable: true },
//     { roomType: "double", guestsAllowed: 2, price: 1000, isAvailable: true },
// ];

const generateRooms = (Volume) => {
    if (Volume === 1) {
        return {
            price: 500,
            roomType: 'single',
            isAvailable: true,
        };
    } else if (Volume === 2) {
        return {
            price: 1000,
            roomType: 'double',
             isAvailable: true,
        };
    } else if (Volume === 3) {
        return {
            price: 1500,
            roomType: 'suite',
             isAvailable: true,
        };
    } else {
        return {
            error: true,
            message: `The hotel can not accommodate ${guestsAllowed} people. Please change`,
        };
    }
};



module.exports = { generateRooms };

