import moment from "moment-timezone";

const fillTimeSlot = function(start, end, duration, timezone) {
    let startTime = moment(start, 'HH:mm').tz(timezone);
    let endTime = moment(end, 'HH:mm').tz(timezone);
    
    if (endTime.isBefore(startTime)) {
        endTime.add(1, 'day');
    }

    let timeSlots = [];

    while(startTime <= endTime){
        const slot = {
            'starts_at': moment(startTime).toISOString(),
        }
        startTime.add(duration, 'minutes');
        slot['ends_at'] = moment(startTime).toISOString();
        timeSlots.push(slot);
    }
    timeSlots.pop();
    return timeSlots;
}

const getAllDayNumber = function(dayNumber, timezone) { // Get all (dayNumber) in these 2 months 
    let start = moment.tz(timezone);
    let end = start.clone().add(moment().daysInMonth() + moment().add(1, 'M').daysInMonth() - start.date(), 'd');  // moment().daysInMonth();
    
    let arr = []
    
    let tmp = start.clone().day(dayNumber);
    
    if (tmp.isSame(moment.tz(timezone), 'day')) {
        arr.push(tmp.toISOString());
    }

    if (tmp.isAfter(start, 'd')) {
        arr.push(tmp.toISOString());
    }

    while (tmp.isBefore(end)) {
        tmp.add(7, 'days');
        arr.push(tmp.toISOString());
    }
    
    return arr
}

// Generates array of {'starts_at', 'ends_at'} for the upcoming 2 months
export const getSlots = function(eventType, timezone) {
    let allSlots = [];
    const duration = eventType.duration;
    const availabilities = eventType.availability
    
    availabilities.forEach((day) => {
        // Array of all upcoming days
        const dayNumbers = getAllDayNumber(day.dayNumber, timezone) // Array of all days of dayNumber x
        
        // Fill time slots on these days 
        dayNumbers.forEach((dayNumber) => {
            day.slots.forEach((slot) => {
                const slotStart = moment(dayNumber).tz(timezone).hour(slot.startTime.hour).minute(slot.startTime.minute).second(0);
                const slotEnd = moment(dayNumber).tz(timezone).hour(slot.endTime.hour).minute(slot.endTime.minute).second(0);
                const timeSlots = fillTimeSlot(slotStart, slotEnd, duration, timezone);
                allSlots = [...allSlots, ...timeSlots]
            })
        })
        
    });
    
    return Array.from(new Set(allSlots));
}