import { fetchWeatherData, processWeatherData } from "./data.js"
import { tempUnits } from "./temp-units.js"
const getWeatherForm = document.querySelector('form')
getWeatherForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    if(isTesting) {
        weatherData = testObject
        updateDisplayData()
        displayWeatherData(displayData)
        return
    }
    const location = document.querySelector('#location-input').value
    const data = await fetchWeatherData(location)
    const processedData = processWeatherData(data)
    console.log(processedData)
    weatherData = processedData
    displayWeatherData(processedData)
})

const isTesting = true

const testObject = {
    address: "Saudi Arabia",
    minTemp: 92,
    maxTemp: 105,
    temp: 97,
    conditions: "weather is pretty nice yo!",
    icon: "partly-cloudy-day",
}

let tempUnit = tempUnits.farenheit

function updateDisplayData() {
    const conversionMethod = 'to' + tempUnit.name[0].toUpperCase() + 
    tempUnit.name.slice(1, tempUnit.name.length)
    for(const value in weatherData) {
        displayData[value] = weatherData[value]
    }
    if(!tempUnits.farenheit[conversionMethod]) return
    displayData.temp = tempUnits.farenheit[conversionMethod](weatherData.temp)
    displayData.minTemp = tempUnits.farenheit[conversionMethod](weatherData.temp)
    displayData.maxTemp = tempUnits.farenheit[conversionMethod](weatherData.temp)
}

const tempUnitInputs = document.querySelectorAll('input[name="temp-unit"]')
tempUnitInputs.forEach(input=>{
    input.addEventListener('input', ()=>{
        tempUnit = tempUnits[input.value]
        if(!weatherData) return
        if(tempUnit.givenByApi) {
            displayWeatherData(weatherData)
            return
        }
        updateDisplayData()
        displayWeatherData(displayData)
    })
})

let weatherData = null
let displayData = {}

function displayWeatherData(data) {
    document.querySelector('#weather-icon').src = `./icons/${data.icon}.svg`
    document.querySelector('#weather-icon-caption').textContent = data.conditions
    const tempRange =
    `${data.minTemp} ${tempUnit.symbol} / ${data.maxTemp} ${tempUnit.symbol}`
    document.querySelector('#temp-range-display').textContent = tempRange
    document.querySelector('#location-display').textContent = data.address
    document.querySelector('#temp-display').textContent = `${data.temp} ${tempUnit.symbol}`
    document.querySelector('#weather-forecast').style.display = 'block'
}