import { CSSProperties } from "react";

type obj = {
    x: number,
    y: number
}

type FunType = {
    setPosition: ({ }) => void
}

export const templateColors = ['#ffd9b3', '#226dce', '#ffcc00', '#00ccff', '#006600', '#6666ff', '#003300']

export const createColorPicker = (canvas: HTMLCanvasElement, color: string) => {
    const context = canvas?.getContext('2d')

    if (context) {

        // let color = 'rgba(194, 134, 26, 255)'
        let horizontalGradient = context.createLinearGradient(0, 0, context.canvas.width, 0);
        horizontalGradient.addColorStop(0, '#fff');
        horizontalGradient.addColorStop(1, color);
        context.fillStyle = horizontalGradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);


        let verticalGradient = context.createLinearGradient(0, 0, 0, context.canvas.height)
        verticalGradient.addColorStop(0.1, 'rgba(0,0,0,0)')
        verticalGradient.addColorStop(1, 'rgb(0,0,0)')
        context.fillStyle = verticalGradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
}

export const createSlider = (canvas: HTMLCanvasElement) => {

    const context = canvas?.getContext('2d')

    if (context) {
        let verticalGradient = context.createLinearGradient(0, 0, 0, context.canvas.height)
        verticalGradient.addColorStop(0, "rgb(255, 0, 0)");
        verticalGradient.addColorStop(0.14, "rgb(255, 0, 255)");
        verticalGradient.addColorStop(0.28, "rgb(0, 0, 255)");
        verticalGradient.addColorStop(0.42, "rgb(0, 255, 255)");
        verticalGradient.addColorStop(0.60, "rgb(0, 255, 0)");
        verticalGradient.addColorStop(0.75, "rgb(255, 255, 0)");
        verticalGradient.addColorStop(1, "rgb(255, 0, 0)");
        context.fillStyle = verticalGradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
}

export const getColor = (canvas: HTMLCanvasElement, x: number, y: number) => {

    const context = canvas?.getContext('2d')
    const pixel = context?.getImageData(x, y, 1, 1).data;
    let rgb = ''
    // for (let i = 0; i < 3; i++) {
    //     if (pixel)
    //         hex += pixel[i].toString(16)
    // }
    if (pixel)
        rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    return rgb

}

export const init = (x: number, y: number): CSSProperties => {

    return {
        position: 'absolute',
        top: x,
        left: y,
        display: 'block',
        width: 10,
        height: 10,
        border: '2px solid #fff',
        borderRadius: '50%',
        boxSizing: 'border-box',
        cursor: 'pointer',
    }
}

export const drag = (e: React.MouseEvent<Element, MouseEvent>, canvas: HTMLCanvasElement) => {

    var rect = canvas?.getBoundingClientRect() as DOMRect;
    const { left, top } = rect

    let x = e.clientX - left;
    let y = e.clientY - top;

    console.log(x, y)

    return ({ x, y })

}

export const handleClick = (e: React.MouseEvent<Element, MouseEvent>, canvas: HTMLCanvasElement) => {

    // console.log(e,canvas)
    var rect = canvas?.getBoundingClientRect() as DOMRect;
    const { left, top } = rect
    let x = e.clientX - left
    let y = e.clientY - top
    console.log(x, y, left, top)
    return ({ x, y })
}

export const getTopVal = (y: number) => {

    let topVal = y
    if (y < 10) topVal = y
    else if (y <= 45) topVal = y + 9.5
    else if (y > 45 && y < 85) topVal = y + 19
    else topVal = y + 23

    return topVal
}