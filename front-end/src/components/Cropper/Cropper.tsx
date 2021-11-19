import { useState, CSSProperties, useEffect } from 'react'
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
    const [localImage, setLocalImage] = useState(updatedImage)
    const [isCustom, setIsCustom] = useState(false)
    const [cropDimension, setcropDimension] = useState({
        width: 200,
        height: 100
    })

    const containerStyle: CSSProperties = {
        width: '90%',
        margin: 'auto',
        marginTop: 30
    }

    const CropperStyle = {
        containerStyle,
        // mediaStyle,
        // cropAreaStyle
    }

    useEffect(() => {
        setLocalImage(updatedImage)
    }, [])
    const setShape = (aspect: number, shape: 'rect' | 'round' | undefined, activeAspect: number,showDimensionInput:boolean) => {
        setAspect(aspect)
        setCropShape(shape)
        setActiveAspect(activeAspect)
        setIsCustom(showDimensionInput)
    }
    const onCropComplete = async (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
        console.log(croppedAreaPixels)
        setCroppedArea(croppedAreaPixels)
    }

    const onSave = async () => {
        const blob = await getCroppedImage(localImage as string, croppedArea)
        console.log('blob', blob)
        setBlob(blob as Blob)
        console.log('purl', URL.createObjectURL(blob))
        setUpdatedImage(URL.createObjectURL(blob))

    }


    const getCroppedImage = async (currentImageUrl: string, croppedArea?: Area) => {

        const img = await createImageFromUrl(currentImageUrl) as any
        console.log('img t', img)
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')


        if (croppedArea !== undefined) {
            canvas.width = croppedArea.width;
            canvas.height = croppedArea.height;
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
            })
        })

    }

    useEffect(()=>{

        if(isCustom){
            if (cropDimension.width > 0 && cropDimension.height > 0){
                setAspect(cropDimension.width / cropDimension.height)
            }
        }
        
    },[cropDimension.width , cropDimension.height])

    const handleCustomCrop = () =>{

        setShape(cropDimension.width / cropDimension.height, 'rect', 0,true)
    }

    const onDimensionChange = (width: number, height: number) => {
        setcropDimension((prevState) => ({
            ...prevState,
            width: width,
            height: height
        })
        )
    }
    return (
        <div className='editor-body'>
            <div className='editor-body-sidebar'>
                <p className='tool-name'>Crop</p>
                {
                    isCustom?
                    <DimensionInput
                        onDimensionChange={onDimensionChange}
                        widthVal={cropDimension.width}
                        heightVal={cropDimension.height}

                    />:
                    null
                }
                <div className='dimension-label'>Common aspect ratios</div>

                <div className='cropper-sidebar'>
                    <div
                        className={activeAspect === 0 ? 'right active-aspect' : 'right'}
                        onClick={() => handleCustomCrop()}
                    >
                        <MdCropFree />
                        <p>Custom</p>
                    </div>
                    <div
                        className={activeAspect === 1 ? 'left active-aspect' : 'left'}
                        onClick={() => setShape(1, 'rect', 1,false)}
                    >
                        <IoMdSquareOutline />
                        <p>Square</p>
                    </div>
                    <div
                        className={activeAspect === 2 ? 'right active-aspect' : 'right'}
                        onClick={() => setShape(16 / 9, 'rect', 2,false)}
                    >
                        <MdCrop169 />
                        <p>16:9</p>
                    </div>
                    <div
                        className={activeAspect === 3 ? 'left active-aspect' : 'left'}
                        onClick={() => setShape(9 / 16, 'rect', 3,false)}
                    >
                        <MdCropPortrait />
                        <p>9:16</p>
                    </div>
                    <div
                        className={activeAspect === 4 ? 'right active-aspect' : 'right'}
                        onClick={() => setShape(4 / 3, 'rect', 4,false)}
                    >
                        <MdCropLandscape />
                        <p>4:3</p>
                    </div>
                    <div
                        className={activeAspect === 5 ? 'left active-aspect' : 'left'}
                        onClick={() => setShape(3 / 4, 'rect', 5,false)}
                    >
                        <MdOutlineCropDin />
                        <p>3:4</p>
                    </div>
                    <div
                        className={activeAspect === 6 ? 'right active-aspect' : 'right'}
                        onClick={() => setShape(1, 'round', 6,false)}
                    >
                        <MdOutlineCircle />
                        <p>Circle</p>
                    </div>
                </div>
                <input
                    type="button"
                    value='Reset'
                    className='reset-button'
                    onClick={() => setUpdatedImage(localImage)}
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
