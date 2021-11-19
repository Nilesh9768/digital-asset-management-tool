import { CSSProperties, useEffect, useRef, useState } from 'react'
import { createImageFromUrl } from '../../commonFunctions/commonFunction'
import { getClickPosition } from '../../commonFunctions/commonFunction'
import { ToolProp } from '../types'
import './FocalPointer.css'
import Jimp from 'jimp'
export default function FocalPointer({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {

    const [focalPoint, setFocalPoint] = useState({ x: 90, y: 170 })
    const originalCanvasRef = useRef<HTMLCanvasElement>(null)
    const panaromaCanvasRef = useRef<HTMLCanvasElement>(null)
    const portraitCanvasRef = useRef<HTMLCanvasElement>(null)
    const squareCanvasRef = useRef<HTMLCanvasElement>(null)
    const landscapeCanvasRef = useRef<HTMLCanvasElement>(null)
    const [pointerStyle, setPointerStyle] = useState<CSSProperties>({
        position: 'absolute',
        top: 400,
        left: 600,
        display: 'block',
        width: 30,
        height: 30,
        border: '1px solid cyan',
        boxShadow: '0 0 10px 4px cyan',
        background: '#00cccc',
        borderRadius: '50%',
        boxSizing: 'border-box',
        cursor: 'pointer',
    })

    useEffect(() => {
        console.log('this is useEff')
        drawOnCanvas(originalCanvasRef.current as HTMLCanvasElement, 0, 0)

    }, [])

    useEffect(() => {
        console.log('focal use')
        setPointerStyle((prevState) => ({
            ...prevState,
            left: focalPoint.x,
            top: focalPoint.y + 30
        }))
        // drawOnCanvas_2(panaromaCanvasRef.current as HTMLCanvasElement, 0, focalPoint.y)
        drawPanaroma()
        drawPortrait()
        drawSquare()
        drawLandscape()
        // drawOnCanvas_2(portraitCanvasRef.current as HTMLCanvasElement, focalPoint.x, 0)
        // drawOnCanvas_2(squareCanvasRef.current as HTMLCanvasElement, focalPoint.x, focalPoint.y)
        // drawOnCanvas_2(landscapeCanvasRef.current as HTMLCanvasElement, focalPoint.x - 100, focalPoint.y - 60)
    }, [focalPoint.x, focalPoint.y])

    const drawOnCanvas = async (canvas: HTMLCanvasElement, x: number, y: number) => {

        const ctx = canvas.getContext('2d')
        const img = await createImageFromUrl(updatedImage) as HTMLImageElement
        canvas.width = 560
        canvas.height = 350
        ctx?.drawImage(img, x, y, img.width, img.height, 0, 0, canvas.width, canvas.height)
    }

    const drawPanaroma = async() => {

        let y = focalPoint.y <= 50 || focalPoint.y >= 200 ? focalPoint.y : focalPoint.y - 50
        const img = await createImageFromUrl(updatedImage) as HTMLImageElement
        drawOnCanvas_2(panaromaCanvasRef.current as HTMLCanvasElement, 0, y,img.width,300)

    }

    const drawPortrait = async() =>{
        let x = focalPoint.x <= 100 || focalPoint.x >= 460 ? focalPoint.x : focalPoint.x + 100
        const img = await createImageFromUrl(updatedImage) as HTMLImageElement
        drawOnCanvas_2(portraitCanvasRef.current as HTMLCanvasElement, x, 0,350,img.height)
    }

    const drawLandscape = async() => {

        let y = focalPoint.y <= 55 || focalPoint.y >= 195 ? focalPoint.y : focalPoint.y - 55
        const img = await createImageFromUrl(updatedImage) as HTMLImageElement
        drawOnCanvas_2(landscapeCanvasRef.current as HTMLCanvasElement, 0, y,img.width,330)

    }

    const drawSquare = async()=>{
        const img = await createImageFromUrl(updatedImage) as HTMLImageElement
        drawOnCanvas_2(squareCanvasRef.current as HTMLCanvasElement, focalPoint.x, focalPoint.y,300,300)
    }

    const drawOnCanvas_2 = async (canvas: HTMLCanvasElement, x: number, y: number, w: number, h: number) => {

        const ctx = canvas.getContext('2d')
        const img = await createImageFromUrl(updatedImage) as HTMLImageElement
        ctx?.drawImage(img, x, y, w, h, 0, 0, canvas.width, canvas.height)
    }

    const onCanvasClick = (e: React.MouseEvent<Element, MouseEvent>) => {

        const pos = getClickPosition(e, originalCanvasRef.current as HTMLCanvasElement)
        setFocalPoint(pos)
    }

    return (
        <div className='focal-pointer-main-container'>
            <div className='focal-pointer-container'>
                <div className='focal-img-container'>
                    <p className='focal-tool-name'>Focal Point</p>
                    <canvas
                        className='original-image-canvas'
                        ref={originalCanvasRef}
                        onClick={(e) => onCanvasClick(e)}
                    >

                    </canvas>
                    <div
                        className='pointer'
                        style={pointerStyle}

                    ></div>
                </div>

                <div className="focal-preview-container">
                    <p className='focal-tool-name'>Preview</p>
                    <canvas
                        className='focal-preview-canvas'
                        id='panaroma'
                        ref={panaromaCanvasRef}
                    ></canvas>
                    <div className='focal-subgrid'>
                        <canvas
                            className='focal-preview-canvas'
                            id='portrait'
                            ref={portraitCanvasRef}
                        ></canvas>
                        <canvas
                            className='focal-preview-canvas'
                            id='square'
                            ref={squareCanvasRef}
                        ></canvas>
                    </div>
                    <canvas
                        className='focal-preview-canvas'
                        id='landscape'
                        ref={landscapeCanvasRef}
                    ></canvas>
                </div>
            </div>
        </div>
    )
}
