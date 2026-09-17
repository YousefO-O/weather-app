export function estimateNumber(number) {
    const decimalPart = number.toString().split('.')[1]
    if(!decimalPart) return number
    if(decimalPart >= 5) {
        return Math.ceil(number)
    }
    else {
        return Math.floor(number)
    }
}

export const tempUnits = {
    farenheit: {
        givenByApi: true,
        name: 'farenheit',
        symbol: '°F',
        toCelsius(temp) {
            const tempCelsius = Number(((temp-32)*(5/9)))
            return estimateNumber(tempCelsius)
        },
        toKelvin(temp) {
            const tempCelsius = this.toCelsius(temp)
            const tempKelvin = tempCelsius+273.15
            return estimateNumber(tempKelvin)
        },
    },
    celsius: {
        name: 'celsius',
        symbol: '°C',
    },
    kelvin: {
        name: 'kelvin',
        symbol: 'K',
    }
}