import { useRef, useEffect, useState, CSSProperties } from 'react'
import { createColorPicker, createSlider, getColor, init, templateColors, handleClick, getTopVal, drag } from './utils'
import './ColorPicker.css'
import { getHexVal } from '../../commonFunctions/commonFunction'

type ColorPickerProp = {

    setColor: (hex: string) => void,
    hideColorPicker: () => void,
    color: string
}
export default function ColorPicker({ setColor, hideColorPicker, color }: ColorPickerProp) {

    const [moveCircle, setmoveCircle] = useState(false)
    const [moveSliderCircle, setmoveSliderCircle] = useState(false)
    const [circlePosition, setCirclePosition] = useState({ x: 90, y: 20 })
    const [sliderCirclePosition, setSliderCirclePosition] = useState({ x: 0, y: 40.933 })
    const [sliderColor, setSliderColor] = useState('rgb(0,103,255)')
    const [selectedColor, setSelectedColor] = useState('rgb(0,103,255)')
    const [circleStyle, setCircleStyle] = useState<CSSProperties>(init(90, 20))
    const [sliderCircleStyle, setSliderCircleStyle] = useState<CSSProperties>(init(0, 40.933))
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sliderRef = useRef<HTMLCanvasElement>(null)
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const tempFun = () => {
            createColorPicker(canvasRef.current as HTMLCanvasElement, sliderColor)
            createSlider(sliderRef.current as HTMLCanvasElement)
            const div = divRef.current as HTMLDivElement
            div.style.backgroundColor = selectedColor
        }
        tempFun()
    }, [])

    useEffect(() => {
        const tempFun = ()=>{
            if (sliderColor !== selectedColor)
            createColorPicker(canvasRef.current as HTMLCanvasElement, sliderColor)
        setSelectedColor(getColor(canvasRef.current as HTMLCanvasElement, circlePosition.x, circlePosition.y) as string)
        const div = divRef.current as HTMLDivElement
        div.style.backgroundColor = sliderColor
        }
        tempFun()
    }, [sliderColor])

    useEffect(() => {
        const div = divRef.current as HTMLDivElement
        div.style.backgroundColor = selectedColor
    }, [selectedColor])

    useEffect(() => {
        setCircleStyle((prevState) => ({
            ...prevState,
            left: circlePosition.x - 5,
            top: circlePosition.y - 5
        }))

    }, [circlePosition.x, circlePosition.y])

    useEffect(() => {
        setSliderCircleStyle((prevState) => ({
            ...prevState,
            left: 0,
            top: sliderCirclePosition.y
        }))

    }, [sliderCirclePosition.x, sliderCirclePosition.y])

    const onCanvasDrag = (e: React.MouseEvent<Element, MouseEvent>) => {

        if (moveCircle) {
            const pos = drag(e, canvasRef.current as HTMLCanvasElement)
            setCirclePosition({ x: pos.x, y: pos.y })
            const color = getColor(canvasRef.current as HTMLCanvasElement, pos.x, pos.y) as string
            setSelectedColor(color)
            const div = divRef.current as HTMLDivElement
            div.style.backgroundColor = color
        }
    }

    const onSliderDrag = (e: React.MouseEvent<Element, MouseEvent>) => {

        if (moveSliderCircle) {
            const pos = handleClick(e, sliderRef.current as HTMLCanvasElement)

            setSliderCirclePosition({ x: pos.x, y: pos.y - 4 })
            let topVal = getTopVal(pos.y)
            setSliderColor(getColor(sliderRef.current as HTMLCanvasElement, pos.x, topVal))
        }

    }

    const onCanvasClick = (e: React.MouseEvent<Element, MouseEvent>) => {

        const pos = handleClick(e, canvasRef.current as HTMLCanvasElement)

        setCirclePosition(pos)
        setSelectedColor(getColor(canvasRef.current as HTMLCanvasElement, pos.x, pos.y))
    }

    const onSliderClick = (e: React.MouseEvent<Element, MouseEvent>) => {

        const pos = handleClick(e, sliderRef.current as HTMLCanvasElement)

        setSliderCirclePosition({ x: pos.x, y: pos.y - 4 })
        let topVal = getTopVal(pos.y)
        console.log(getColor(sliderRef.current as HTMLCanvasElement, pos.x, topVal))
        setSliderColor(getColor(sliderRef.current as HTMLCanvasElement, pos.x, topVal))
    }

    return (
        <div className='color-picker-main-container'>
            {/* {console.log(sliderColor)} */}
            <p>Select From Template</p>
            <div className='color-template-container'>
                {
                    templateColors.map((color,idx) => {
                        return (
                            <div key={idx}
                                className='color-template'
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                            ></div>
                        )
                    })
                }

            </div>
            <p>Select Custom</p>
            <div className='color-picker-container'>
                <div className='picker-container'>
                    <canvas
                        className='canvas'
                        width={110}
                        height={120}
                        ref={canvasRef}
                        onClick={(e) => onCanvasClick(e)}
                        onMouseMove={(e) => onCanvasDrag(e)}
                    >
                    </canvas>
                    <div
                        className='circle'
                        style={circleStyle}
                        onMouseDown={() => setmoveCircle(true)}
                        onMouseUp={() => setmoveCircle(false)}

                    ></div>
                </div>

                <div className='color-slider-container'>
                    <canvas
                        className='color-slider-canvas'
                        ref={sliderRef}
                        onClick={(e) => onSliderClick(e)}
                        onMouseMove={(e) => onSliderDrag(e)}
                    >
                    </canvas>
                    <div
                        className='circle'
                        style={sliderCircleStyle}
                        onMouseDown={() => setmoveSliderCircle(true)}
                        onMouseUp={() => setmoveSliderCircle(false)}
                    ></div>
                </div>

                <div className='selected-color-container'>
                    <div className='selected-color' ref={divRef}></div>
                    <div className='selected-color-value' >
                        {
                            selectedColor.charAt(0) === '#' ?
                                selectedColor :
                                '#' + getHexVal(selectedColor)
                        }
                    </div>
                </div>

            </div>
            <div className='color-btn-container'>
                <button
                    className='color-cancel-btn'
                    onClick={() => hideColorPicker()}
                >
                    Cancel
                </button>

                <button
                    className='choose-color-btn'
                    onClick={() => {
                        setColor(selectedColor)
                        hideColorPicker()
                    }}
                >
                    Choose
                </button>
            </div>

        </div>
    )
}