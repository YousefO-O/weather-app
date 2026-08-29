const weatherApiKey = "78VXK83JGHH3HA9V4EBR7AQ2V"

export async function fetchWeatherData(location) {
    try {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${formattedDate}?key=${weatherApiKey}`)
        const weatherData = await weatherResponse.json()
        console.log(weatherData)
        return weatherData
    }
    catch (error) {
        throw new Error(error)
    }
}

export function processWeatherData(data) {
    const address = data.address
    const maxTemp = data.days[0].tempmax
    const minTemp = data.days[0].tempmin
    const temperature = data.days[0].temp
    const conditions = data.days[0].conditions
    const humidity = data.days[0].humidity
    const precipitation = data.days[0].precipitation
    const icon = data.days[0].icon
    return {
        address,
        maxTemp,
        minTemp,
        temp,
        conditions,
        icon,
    }
}
// For Testing:
// (async () => {
//     const weatherData = await fetchWeatherData('Saudi Arabia')
//     const processedData = processWeatherData(weatherData)
//     console.log(processedData)
// })()