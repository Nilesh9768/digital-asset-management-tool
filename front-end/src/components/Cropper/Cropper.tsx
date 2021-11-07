import { useState, CSSProperties } from 'react'
import ReactCropper from 'react-easy-crop';
import DimensionInput from '../DimensionInput/DimensionInput';
import { createImageFromUrl } from '../../commonFunctions/commonFunction';
import { ToolProp } from '../types';
// import 'react-easy-crop/react-easy-crop.css'
import {
    MdOutlineCircle,
    MdCrop169,
    MdCropFree,
    MdCropPortrait,
    MdCropLandscape,
    MdOutlineCropDin
} from "react-icons/md";
import { IoMdSquareOutline, IoIosSave } from "react-icons/io";
import './Cropper.css'
import { Area } from 'react-easy-crop/types';

export default function Cropper({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [aspect, setAspect] = useState(1)
    const [croppedArea, setCroppedArea] = useState<Area>()
    const [cropShape, setCropShape] = useState<'rect' | 'round' | undefined>('rect')
    const [activeAspect, setActiveAspect] = useState<number>(1)
    const containerStyle: CSSProperties = {
        width: '90%',
        // height:'81%',
        margin: 'auto',
        marginTop: 30
    }

    const cropAreaStyle: CSSProperties = {
        // color:'white',
        // backdropFilter:'revert',
        height: '100%'
    }
    const mediaStyle: CSSProperties = {
        height: "100%"
    }
    const CropperStyle = {
        containerStyle,
        // mediaStyle,
        // cropAreaStyle
    }
    const setShape = (aspect: number, shape: 'rect' | 'round' | undefined, activeAspect: number) => {
        setAspect(aspect)
        setCropShape(shape)
        setActiveAspect(activeAspect)
    }
    const onCropComplete = async (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
        console.log(croppedAreaPixels)
        setCroppedArea(croppedAreaPixels)
    }

    const onSave = async () => {
        const blob = await getCroppedImage(updatedImage as string, croppedArea)
        console.log('blob', blob)
        setBlob(blob as Blob)
        console.log('purl', URL.createObjectURL(blob))
        setUpdatedImage(URL.createObjectURL(blob))

    }

    // const createImageFromUrl = (url: string) => {

    //     return new Promise((resolve, reject) => {

    //         const image = new Image()
    //         console.log(typeof image, 'image type ')
    //         image.addEventListener('load', () => resolve(image))
    //         image.addEventListener('error', error => reject(error))
    //         image.setAttribute('crossOrigin', 'anonymous')
    //         image.src = typeof url === 'string' ? url : ''
    //     })
    // }
    const getCroppedImage = async (currentImageUrl: string, croppedArea?: Area) => {

        const img = await createImageFromUrl(currentImageUrl)
        console.log('img t', typeof img)
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        canvas.width = 100;
        canvas.height = 100;
        if (croppedArea !== undefined) {
            context?.drawImage(
                img as HTMLOrSVGImageElement,
                croppedArea.x,
                croppedArea.y,
                croppedArea.width,
                croppedArea.height,
                0,
                0,
                canvas.width,
                canvas.height
            )
        }

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            }, 'image/jpeg')
        })

    }
    return (
        <div className='editor-body'>
            <div className='editor-body-sidebar'>
                <p className='tool-name'>Crop</p>

                <DimensionInput/>
                <div className='dimension-label'>Common aspect ratios</div>

                <div className='cropper-sidebar'>
                    <div
                        className={activeAspect === 0 ? 'right active-aspect' : 'right'}
                    >
                        <MdCropFree />
                        <p>Custom</p>
                    </div>
                    <div
                        className={activeAspect === 1 ? 'left active-aspect' : 'left'}
                        onClick={() => setShape(1, 'rect', 1)}
                    >
                        <IoMdSquareOutline />
                        <p>Square</p>
                    </div>
                    <div
                        className={activeAspect === 2 ? 'right active-aspect' : 'right'}
                        onClick={() => setShape(16 / 9, 'rect', 2)}
                    >
                        <MdCrop169 />
                        <p>16:9</p>
                    </div>
                    <div
                        className={activeAspect === 3 ? 'left active-aspect' : 'left'}
                        onClick={() => setShape(9 / 16, 'rect', 3)}
                    >
                        <MdCropPortrait />
                        <p>9:16</p>
                    </div>
                    <div
                        className={activeAspect === 4 ? 'right active-aspect' : 'right'}
                        onClick={() => setShape(4 / 3, 'rect', 4)}
                    >
                        <MdCropLandscape />
                        <p>4:3</p>
                    </div>
                    <div
                        className={activeAspect === 5 ? 'left active-aspect' : 'left'}
                        onClick={() => setShape(3 / 4, 'rect', 5)}
                    >
                        <MdOutlineCropDin />
                        <p>3:4</p>
                    </div>
                    <div
                        className={activeAspect === 6 ? 'right active-aspect' : 'right'}
                        onClick={() => setShape(1, 'round', 6)}
                    >
                        <MdOutlineCircle />
                        <p>Circle</p>
                    </div>
                </div>
                <input
                    type="button"
                    value='Reset'
                    className='reset-button'
                    onClick={() => setUpdatedImage(image)}
                />
                <button
                    className='save'
                    onClick={() => onSave()}
                >
                    <IoIosSave className='save-icon' /> Save
                </button>
            </div>
            {
                typeof updatedImage === 'string' ?
                    <div className='img-container'>
                        <ReactCropper
                            image={updatedImage}
                            crop={crop}
                            aspect={aspect}
                            style={CropperStyle}
                            onCropChange={setCrop}
                            cropShape={cropShape}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    : null

            }

        </div>
    )
}
