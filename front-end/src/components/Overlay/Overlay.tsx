import { ChangeEvent, useState, useEffect } from 'react'
import Jimp from 'jimp';
import DimensionInput from '../DimensionInput/DimensionInput';
import { ToolProp } from '../types';
import { IoIosSave } from 'react-icons/io';
import './Overlay.css'

type positionObjType = {
    'Left': number,
    'H_Center': number,
    'Right': number,
    'Top': number,
    'V_Center': number,
    'Bottom': number
}
export default function Overlay({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {

    const [overLayImage, setOverLayImage] = useState<string>()
    const [overLayedImage, setOverLayedImage] = useState<string>(updatedImage)
    const [h_postion, setH_Position] = useState<string>('Left')
    const [v_postion, setV_Position] = useState<string>('Top')
    const [repeat, setRepeat] = useState<string>('false')
    const [localImage,setLocalImage] = useState(updatedImage)
   
    const [positionObj, setPositionObj] = useState<positionObjType>({
        'Left': 0,
        'H_Center': 0,
        'Right': 0,
        'Top': 0,
        'V_Center': 0,
        'Bottom': 0
    })

    const [overlayDimension, setOverlayDimension] = useState({
        width: 200,
        height: 100
    })
 
    const onSelect = async (event: ChangeEvent<HTMLInputElement>) => {

        let files = event.target.files
        if (files) {
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.addEventListener('load', async () => {
                setOverLayImage(reader.result as string)
            })
        }
    }

    useEffect(() => {
        (async () => {

            const img = await Jimp.read(updatedImage)
            setPositionObj({
                'Left': 0,
                'H_Center': img.getWidth() / 2 - overlayDimension.width / 2,
                'Right': img.getWidth() - overlayDimension.width,
                'Top': 0,
                'V_Center': img.getHeight() / 2 - overlayDimension.height / 2,
                'Bottom': img.getHeight() - overlayDimension.height
            })
        })()
    }, [])
    useEffect(() => {
        if (overlayDimension.width > 0 && overlayDimension.height > 0) {

            const x = async () => {
                setOverLayedImage(URL.createObjectURL(await overLay()))
            }
            if (overLayImage !== undefined) x()
        }

    }, [overLayImage,
        overlayDimension.width,
        overlayDimension.height,
        h_postion,
        v_postion,
        repeat
    ])

    
    useEffect(() => {
        setLocalImage(updatedImage)
    }, [])
    const overLay = async () => {
        let watermark = await Jimp.read(overLayImage as string);
        watermark = watermark.resize(overlayDimension.width, overlayDimension.height)

        const img = await Jimp.read(updatedImage)

        const times: number = repeat === 'true' ? (Math.floor(img.getWidth() / overlayDimension.width)) : 0;

        for (let i = 0; i <= times; i++) {

            img.composite(watermark, (positionObj as any)[h_postion] + overlayDimension.width * i, (positionObj as any)[v_postion], {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
        }


        const MIME = img.getMIME()
        const buffer = await img.getBufferAsync(MIME)
        const blob = new Blob([buffer as BlobPart], { type: MIME })
        return new Promise((resolve) => {
            resolve(blob)
        })

    }

    const onSave = async () => {

        const blob = await overLay()
        setUpdatedImage(URL.createObjectURL(blob))
        setBlob(blob as Blob)
    }

    const onDimensionChange = (width: number, height: number) => {
        setOverlayDimension((prevState) => ({
            ...prevState,
            width: width,
            height: height
        })
        )
    }

    return (
        <div className='editor-body'>
            <div className='editor-body-sidebar'>
                <div className='overlay-sidebar'>
                    <p className='tool-name'>Overlay</p>
                    <div className='overlay-container'>
                        <img src={overLayImage} alt="" className='preview-image' />
                    </div>
                    <div className='overlay-input-container'>
                        <label htmlFor="overlay" className='overlay-label'>Choose file</label>
                        <input
                            className='overlay-input'
                            type="file"
                            id='overlay'
                            onChange={(e) => onSelect(e)}
                        />
                    </div>

                    <p className='section-label'>OVERLAY SIZE</p>
                    <DimensionInput
                        onDimensionChange={onDimensionChange}
                        widthVal={overlayDimension.width}
                        heightVal={overlayDimension.height}
                    />

                    <p className='section-label'>OVERLAY ALLIGNTMENT</p>
                    <div className='position-input-container'>
                        <select
                            name="horizontal"
                            className='position-input'
                            onChange={(e) => setH_Position(e.target.value)}
                        >
                            <option value="Right">Right</option>
                            <option value="H_Center">Centre</option>
                            <option value="Left">Left</option>
                        </select>
                        <select
                            name="vertical"
                            className='position-input'
                            onChange={(e) => setV_Position(e.target.value)}
                        >
                            <option value="Top">Top</option>
                            <option value="V_Center">Centre</option>
                            <option value="Bottom">Bottom</option>
                        </select>
                    </div>

                    <p className='section-label'>OVERLAY REPEAT</p>
                    <select
                        name="repeat"
                        className='repeat-input'
                        onChange={(e) => setRepeat(e.target.value)}
                    >
                        <option value='false'>No-Repeat</option>
                        <option value='true'>Repeat</option>
                    </select>
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
            <div className='flip-img-container'>
                <img src={overLayedImage} alt="" />
            </div>
        </div >
    )
}
