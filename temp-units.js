export const tempUnits = {
    farenheit: {
        givenByApi: true,
        name: 'farenheit',
        symbol: '°F',
        toCelsius(temp) {
            return Number(((temp-32)*(5/9)).toFixed(2))
        },
        toKelvin(temp) {
            const celsius = this.toCelsius(temp)
            const kelvin = celsius+273.15
            return kelvin
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