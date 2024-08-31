function getUtcString(utcTime, timezone) {
    var unixTime = utcTime + timezone
    const dateObj = new Date(unixTime * 1000)
    return dateObj.toUTCString()
}

export function convertUnixToHoursAndMinutes(utcTime, timezone) {
    const utcString = getUtcString(utcTime, timezone)
    const hours = utcString.split(':')[0].substr(-2)
    const minutes = utcString.split(':')[1]
    return hours + ":" + minutes
}

export function convertUnixToWeekdayDayMonth(utcTime, timezone) {
    const utcString = getUtcString(utcTime, timezone)
    console.log(utcString)
    const weekday = utcString.split(' ')[0]
    const month = utcString.split(' ')[2]
    const day = utcString.split(' ')[1]
    return weekday + " " + month + " " + day
}