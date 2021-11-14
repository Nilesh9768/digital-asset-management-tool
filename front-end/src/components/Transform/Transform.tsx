import { useState, useRef, CSSProperties, useEffect } from 'react'
import DimensionInput from '../DimensionInput/DimensionInput'
import { BsSymmetryHorizontal, BsSymmetryVertical } from 'react-icons/bs'
import { createImageFromUrl } from '../../commonFunctions/commonFunction'
import { ToolProp } from '../types'
import { IoIosSave } from 'react-icons/io'
import { BiRotateLeft, BiRotateRight } from 'react-icons/bi'
import Jimp from 'jimp'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './Transform.css'
export default function Transform({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {

    const [flippedImage, setFlippedImage] = useState(updatedImage)
    const [receivedBlob, setReceivedBlob] = useState<Blob>()
    const [sliderVal, setSliderVal] = useState<number>(0)
    const flipImage = async (direction: string) => {

        const img = await createImageFromUrl(flippedImage) as HTMLImageElement;
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const context = canvas.getContext("2d");

        if (direction === 'x') {
            context?.scale(-1, 1);
            context?.drawImage(img, -canvas.width, 0);
        } else {
            context?.scale(1, -1);
            context?.drawImage(img, 0, -canvas.height);
        }

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            })
        })


    }

    const rotateImage = async (angle: number) => {
        console.log(angle,'rotate')
        const img = await createImageFromUrl(updatedImage) as HTMLImageElement;
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const context = canvas.getContext("2d");

        context?.translate(canvas.width * 0.5, canvas.height * 0.5)

        context?.rotate(angle)
        context?.translate(-canvas.width * 0.5, -canvas.height * 0.5)
        context?.drawImage(img, 0, 0)


        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            })
        })

    }

    const handleFlip = async (direction: string) => {
        const blob = await flipImage(direction) as Blob
        setReceivedBlob(blob)
        setFlippedImage(URL.createObjectURL(blob))
    }

    const handleRotate = async (angle: number) => {
        const blob = await rotateImage(angle) as Blob
        // console.log(angle,'handle')
        setReceivedBlob(blob)
        setFlippedImage(URL.createObjectURL(blob))
    }
    const onSave = async () => {
        setBlob(receivedBlob as Blob)
        setUpdatedImage(URL.createObjectURL(receivedBlob))
    }

    const onSliderChange = (val: number) => {
        console.log(val,'val')
        setSliderVal(val)
       
    }

    useEffect(()=>{
        console.log(sliderVal,'eff')
        handleRotate(sliderVal * Math.PI / 180)
    },[sliderVal])

    return (
        <div className='editor-body'>
            <div className='editor-body-sidebar'>
                <p className='tool-name'>Transform</p>
                <DimensionInput />
                <p className='section-label'>FLIP</p>
                <div className='flip-sidebar'>
                    <div className='right flip-icon' onClick={() => handleFlip('x')}>
                        <BsSymmetryHorizontal />
                        <p>Flip Horizontally</p>
                    </div>
                    <div className='left flip-icon' onClick={() => handleFlip('y')}>
                        <BsSymmetryVertical />
                        <p>Flip Vertically</p>
                    </div>
                </div>
                <p className='section-label'>PREVIEW</p>
                <img className='preview-image' src={flippedImage} width='100' height='100' alt="" />
                <input
                    type="button"
                    value='Reset'
                    className='reset-button'
                    onClick={() => {
                        setUpdatedImage(image)
                        setFlippedImage(image)
                        setSliderVal(0)
                    }}
                />
                <button
                    className='save'
                    onClick={() => onSave()}
                >
                    <IoIosSave className='save-icon' /> Save
                </button>
            </div>
            <div className='flip-img-container'>
                <img src={updatedImage} alt="" />
                <div className='slider-container'>
                    <span className='rotate-icon'>
                        <BiRotateLeft />
                    </span>
                    <div className='slider'>
                        <Slider
                            min={-180}
                            max={180}
                            startPoint={0}
                            value={sliderVal}
                            step={1}
                            onChange={onSliderChange}
                            handleStyle={{
                                backgroundColor: "rgba(101, 88, 218, 1)",
                                border: 'none',
                            }}
                            // railStyle={{
                            //     backgroundColor:'rgba(59, 58, 58,0.6)'
                            // }}
                            trackStyle={{
                                background: "rgba(101, 88, 218, 1)"
                            }}
                        />
                        <p className='slider-value'>{sliderVal}</p>
                    </div>
                    <span className='rotate-icon'>
                        <BiRotateRight />
                    </span>
                </div>
            </div>
        </div>
    )
}