import { fetchWeatherData, processWeatherData } from "./data.js"
import { tempUnits } from "./temp-units.js"
import { validateLocationInput } from "./components/location-input.js"
import {startLoadingComponent, stopLoadingComponent} from './components/loading.js'
import { populateHoursSlider } from "./components/hours-slider.js"
const getWeatherForm = document.querySelector('form')
getWeatherForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const location = document.querySelector('#location-input')
    const validity = validateLocationInput()
    if(!validity) return
    if(isTesting) {
        weatherData = testObject
        updateDisplayData()
        displayWeatherData(displayData)
        return
    }
    startLoadingComponent()
    const data = await fetchWeatherData(location.value)
    stopLoadingComponent()
    const processedData = processWeatherData(data)
    console.log(processedData)
    weatherData = processedData
    updateDisplayData()
    displayWeatherData(displayData)
})

const isTesting = true

const testObject = {
    address: "Saudi Arabia",
    minTemp: 92,
    maxTemp: 105,
    temp: 97,
    conditions: "weather is pretty nice yo!",
    icon: "partly-cloudy-day",
    hours: [
        {
            "datetime": "00:00:00",
            "temp": 96.7,
            "icon": "clear-night",
        },
        {
            "datetime": "01:00:00",
            "temp": 93.1,
            "icon": "clear-night",
        },
        {
            "datetime": "02:00:00",
            "temp": 93.1,
            "icon": "clear-night",
        },
        {
            "datetime": "03:00:00",
            "temp": 91.3,
            "icon": "clear-night",
        },
        {
            "datetime": "04:00:00",
            "temp": 87.7,
            "icon": "clear-night",
        },
        {
            "datetime": "05:00:00",
            "temp": 87.7,
            "icon": "clear-night",
        },
        {
            "datetime": "06:00:00",
            "temp": 87.7,
            "icon": "clear-day",
        },
        {
            "datetime": "07:00:00",
            "temp": 91.3,
            "icon": "clear-day",
        },
        {
            "datetime": "08:00:00",
            "temp": 98.5,
            "icon": "clear-day",
        },
        {
            "datetime": "09:00:00",
            "temp": 107.5,
            "icon": "clear-day",
        },
        {
            "datetime": "10:00:00",
            "temp": 109.3,
            "icon": "clear-day",
        },
        {
            "datetime": "11:00:00",
            "temp": 112.9,
            "icon": "partly-cloudy-day",
        },
        {
            "datetime": "12:00:00",
            "temp": 112.9,
            "icon": "partly-cloudy-day",
        },
        {
            "datetime": "13:00:00",
            "temp": 111.1,
            "icon": "partly-cloudy-day",
        },
        {
            "datetime": "14:00:00",
            "temp": 111.1,
            "icon": "partly-cloudy-day",
        },
        {
            "datetime": "15:00:00",
            "temp": 109.3,
            "icon": "partly-cloudy-day",
        },
        {
            "datetime": "16:00:00",
            "temp": 111.1,
            "icon": "partly-cloudy-day",
        },
        {
            "datetime": "17:00:00",
            "temp": 109.3,
            "icon": "partly-cloudy-day",
        },
        {
            "datetime": "18:00:00",
            "temp": 107.5,
            "icon": "partly-cloudy-day",
        },
        {
            "datetime": "19:00:00",
            "temp": 105.7,
            "icon": "partly-cloudy-night",
        },
        {
            "datetime": "20:00:00",
            "temp": 105.7,
            "icon": "partly-cloudy-night",
        },
        {
            "datetime": "21:00:00",
            "temp": 100.3,
            "icon": "partly-cloudy-night",
        },
        {
            "datetime": "22:00:00",
            "temp": 100.3,
            "icon": "partly-cloudy-night",
        },
        {
            "datetime": "23:00:00",
            "temp": 98.5,
            "icon": "partly-cloudy-night",
        }
    ]
}

let tempUnit = tempUnits.farenheit

function updateDisplayData() { 
    console.log(tempUnit.name)
    for(const value in weatherData) {
        displayData[value] = weatherData[value]
    }
    if(tempUnit.name==='farenheit') {
        displayData.hours.forEach(hour=>{
            hour.formattedTemp = `${hour.temp} ${tempUnit.symbol}`
        })
        return
    }
    const conversionMethod = 'to' + tempUnit.name[0].toUpperCase() + 
    tempUnit.name.slice(1, tempUnit.name.length)
    console.log(conversionMethod)
    if(!tempUnits.farenheit[conversionMethod]) return
    displayData.temp = tempUnits.farenheit[conversionMethod](weatherData.temp)
    displayData.minTemp = tempUnits.farenheit[conversionMethod](weatherData.minTemp)
    displayData.maxTemp = tempUnits.farenheit[conversionMethod](weatherData.maxTemp)
    displayData.hours.forEach(hour=>{
        const convertedTemp = tempUnits.farenheit[conversionMethod](hour.temp)
        hour.formattedTemp = `${convertedTemp} ${tempUnit.symbol}`
    })
}

const tempUnitInputs = document.querySelectorAll('input[name="temp-unit"]')
tempUnitInputs.forEach(input=>{
    input.addEventListener('input', ()=>{
        tempUnit = tempUnits[input.value]
        if(!weatherData) return
        updateDisplayData()
        if(tempUnit.givenByApi) {
            console.log('yo')
            // updateDisplayData()
            displayWeatherData(displayData)
            return
        }
        // updateDisplayData()
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
    populateHoursSlider(data.hours)
    document.querySelector('#weather-forecast').style.display = 'block'
}