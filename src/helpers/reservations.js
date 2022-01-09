export const removeBookings = function(slots, events) {
    
    let tmp = slots
    events.forEach((evt) => {
        if (!evt.isCanceled) {
            tmp = tmp.filter((slot) => { return new Date(slot.starts_at).toLocaleString() != new Date(evt.date).toLocaleString() })
        }
    })
    
    return tmp
}