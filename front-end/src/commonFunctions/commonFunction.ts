
export const createImageFromUrl = (url: string) => {

    return new Promise((resolve, reject) => {

        const image = new Image()
        console.log(typeof image, 'image type ')
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = typeof url === 'string' ? url : ''
    })
}