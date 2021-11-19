
export const createImageFromUrl = (url: string) => {

    return new Promise((resolve, reject) => {

        const image = new Image()
        // console.log(image, 'image type ')
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))
        // image.setAttribute('crossOrigin', 'Anonymous')
        image.crossOrigin = "Anonymous";
        image.src = url
    })
}

export const getHexVal = (rgb : string) =>{

    const substr = rgb.substr(4)
    const rgbArr = substr.split(')')[0].split(',')
    let hex = ''
    for(let i = 0 ; i < rgbArr.length ;i++){
        hex += parseInt(rgbArr[i]).toString(16)
    }
    return hex.toUpperCase()
}

export const getClickPosition = (e: React.MouseEvent<Element, MouseEvent>, canvas: HTMLCanvasElement) => {

    // console.log(e,canvas)
    var rect = canvas?.getBoundingClientRect() as DOMRect;
    const { left, top } = rect
    let x = e.clientX - left
    let y = e.clientY - top
    console.log(x, y, left, top)
    return ({ x, y })
}