import './App.css';

export function TempWidget({temp}) {

    return (<div> 
        the temp is: {temp} C
    </div>
    )
}

export function HumidityWidget({humidity}) {

    return (<div> 
        the humidty is: {humidity} %
    </div>
    )
}


export function IconWidget({iconCode, size}) {
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    return (
        <img src={iconUrl} style={{height: size}}></img>
    )
}

// const backStyle = {
//     background: 'blue'
// }

// export function Background({weather}) {
//     let cloudy = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG5qemp2eXlwM2FiaDNmem9icDJjdDU1NTZwNTd2MWljYTAyY2Z4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yB3gwsCaymSglI1Jqt/giphy-downsized-large.gif'
//     let rain = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGY1a2d0dmFtcTU0MXRycHVpcjA1bjlwcjF3Y3lsOXptZnAxaTkwYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tnPxFTth7qoDiw1rnm/giphy-downsized-large.gif'
//     let clear = 'https://i.gifer.com/XFbw.gif'
//     return (
//         <div>
//             <style>
//                 {`body { background-image: url(${rain});  background-size: cover }`}
//             </style>
//         </div>
//     )
// }

