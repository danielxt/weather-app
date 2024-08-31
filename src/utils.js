export default function convertUnixToHoursAndMinutes(utcTime, timezone) {
    var unixTime = utcTime + timezone
    const dateObj = new Date(unixTime * 1000)
    const utcString = dateObj.toUTCString()
    
    const hours = utcString.split(':')[0].substr(-2)
    const minutes = utcString.split(':')[1]
    return hours + ":" + minutes
}