
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
            roomType: 'suite'
 
        };
    } else {
        return {
            error: true,
            message: `The hotel cannot accommodate ${guestsAllowed} guests. Please adjust your booking.`,
        };
    }
};



module.exports = { generateRooms };

