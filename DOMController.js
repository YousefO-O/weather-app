import { fetchWeatherData, processWeatherData } from "./data.js"
const getWeatherForm = document.querySelector('form')
getWeatherForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const location = document.querySelector('#location-input').value
    const data = await fetchWeatherData(location)
    const processedData = processWeatherData(data)
    console.log(processedData)
    weatherData = processedData
    displayWeatherData(processedData)
})

let tempUnit = 'farenheit'
function displayTemp(tempInFarenheit) {
    const tempDisplay = document.querySelector('#temp-display')
    if(tempUnit==='farenheit') {
        tempDisplay.textContent = tempInFarenheit + ' °F'
        return
    }
    const tempInCelsius = ((tempInFarenheit-32)*(5/9)).toFixed(1);
    tempDisplay.textContent = tempInCelsius + ' °C'
}
const tempUnitInputs = document.querySelectorAll('input[name="temp-unit"]')
tempUnitInputs.forEach(input=>{
    input.addEventListener('input', ()=>{
        tempUnit = input.value
        if(!weatherData) return
        displayTemp(weatherData.temperature)
    })
})
let weatherData = null
function displayWeatherData(data) {
    console.log(data.icon)
    document.querySelector('#weather-icon').src = `./icons/${data.icon}.svg`
    document.querySelector('#location-display').textContent = data.address
    if(tempUnit==='celsius') {
        const tempInCelsius = ((data.temperature-32)*(5/9)).toFixed(1);
        document.querySelector('#temp-display').textContent = tempInCelsius + ' °C'
    }
    else document.querySelector('#temp-display').textContent = data.temperature + ' °F'
    document.querySelector('#weather-forecast').style.display = 'block'
}