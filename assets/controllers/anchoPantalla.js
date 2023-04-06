export function resizeAncho() {
    document.addEventListener("DOMContentLoaded", (e) => {
        e.preventDefault()
        dimension()
    })
    
    const dimension = () => {
        if (window.innerWidth > 1024) {
            console.log('es mayor a 1024')
        } else if (window.innerWidth > 768) {
            console.log('es mayor a 768')
        } else {
            console.log('es mayor a 570')
        }
    }
}
