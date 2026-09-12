const hoursSlider = document.querySelector('#hours-slider')

function formatHour(hour) {
    if(hour<12) {
        return `${hour}AM`
    }
    else if(hour===12) {
        return `${hour}PM`
    }
    else if(hour===24) {
        return `12AM`
    }
    else {
        return `${hour-12}PM`
    }
}

export function populateHoursSlider(hoursArray) {
    console.log(hoursArray)
    hoursSlider.replaceChildren('')
    hoursArray.forEach(hour=>{
        const container = document.createElement('div')
        container.classList.add('hour-forecast')
        const icon = document.createElement('img')
        icon.src = `../icons/${hour.icon}.svg`
        icon.classList.add('hour-weather-icon')
        const timeSpan = document.createElement('p')
        timeSpan.textContent = formatHour((hoursArray.indexOf(hour)+1))
        const tempSpan = document.createElement('p')
        tempSpan.textContent = hour.formattedTemp
        container.appendChild(timeSpan)
        container.appendChild(icon)
        container.appendChild(tempSpan)
        hoursSlider.appendChild(container)
    })
}