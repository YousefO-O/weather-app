import { fetchWeatherData, processWeatherData } from "./data.js"
import { tempUnits, estimateNumber } from "./temp-units.js"
import { validateLocationInput } from "./components/location-input.js"
import {startLoadingComponent, stopLoadingComponent, showFetchingFailed} from './components/loading.js'
import { populateHoursSlider } from "./components/hours-slider.js"
import testObject from "./test-object.js"
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
    if(!data) return
    stopLoadingComponent()
    const processedData = processWeatherData(data)
    console.log(processedData)
    weatherData = processedData
    updateDisplayData()
    displayWeatherData(displayData)
})

const isTesting = false

let tempUnit = tempUnits.farenheit

function updateDisplayData() { 
    console.log(tempUnit.name)
    for(const value in weatherData) {
        displayData[value] = weatherData[value]
    }
    if(tempUnit.name==='farenheit') {
        displayData.temp = estimateNumber(weatherData.temp)
        displayData.minTemp = estimateNumber(weatherData.minTemp)
        displayData.maxTemp = estimateNumber(weatherData.maxTemp)
        displayData.hours.forEach(hour=>{
            const estimatedTemp = estimateNumber(hour.temp)
            hour.formattedTemp = `${estimatedTemp} ${tempUnit.symbol}`
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
    document.querySelector('#conditions').textContent = data.conditions
    const tempRange =
    `${data.minTemp} ${tempUnit.symbol} / ${data.maxTemp} ${tempUnit.symbol}`
    document.querySelector('#temp-range-display').textContent = tempRange
    document.querySelector('#location-display').textContent = data.address
    document.querySelector('#temp-display').textContent = `${data.temp} ${tempUnit.symbol}`
    populateHoursSlider(data.hours)
    document.querySelector('#weather-forecast').style.display = 'grid'
}