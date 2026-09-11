const locationInput = document.querySelector('#location-input')
export function validateLocationInput() {
    if(locationInput.value.trim()==='') {
        locationInput.setCustomValidity('Enter some none whitespace chars.')
    }
    else {
        locationInput.setCustomValidity('')
    }
    locationInput.reportValidity()
    return locationInput.validity.valid
}
locationInput.addEventListener('input', validateLocationInput)