const loadingComponent = document.querySelector('#loading-component')
const loadingSpan = document.querySelector('#loading-span')
let loadingInterval;
export function startLoadingComponent() {
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
    loadingSpan.textContent = ''
    clearInterval(loadingInterval)
}