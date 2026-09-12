const loadingComponent = document.querySelector('#loading-component')
const loadingSpan = document.querySelector('#loading-span')
const loadingStatus = document.querySelector('#fetching-status')
let loadingInterval;
export function startLoadingComponent() {
    loadingStatus.textContent = 'Fetching data'
    loadingComponent.style.display = 'flex'
    const string = '...'
    let index = 0
    loadingInterval = setInterval(() => {
        if(index>=string.length) {
            index = 0
            loadingSpan.textContent = ''
            return
        }
        loadingSpan.textContent += string[index]
        index++
    }, 500);
}
export function stopLoadingComponent() {
    loadingComponent.style.display = 'none'
    loadingStatus.textContent = ''
    clearInterval(loadingInterval)
    loadingSpan.textContent = ''
}

export function showFetchingFailed() {
    loadingStatus.textContent = 'Failed to fetch data'
    loadingComponent.style.display = 'flex'
}