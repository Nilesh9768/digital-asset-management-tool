import { useState, useEffect } from 'react'
import ColorPicker from '../ColorPicker/ColorPicker'
import { IoIosSave } from 'react-icons/io'
import Jimp from 'jimp'
import { ToolProp } from '../types'
import './Frame.css'
import { getHexVal } from '../../commonFunctions/commonFunction'

export default function Frame({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {

    const [padding, setPadding] = useState<number>(30)
    const [framedImage, setFramedImage] = useState<string>(updatedImage)
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
    const [hex, setHex] = useState<string>('rgb(0,103,255)')
    const [localImage,setLocalImage] = useState(updatedImage)
   

    const setColor = (hex: string) => {
        setHex(hex)
    }

    const hideColorPicker = () => {
        setShowColorPicker(false)
    }
    const addFrame = async () => {


        const img = await Jimp.read(updatedImage)
        const horizontalFrame = new Jimp(img.getWidth(), padding, hex)
        const verticalFrame = new Jimp(padding, img.getHeight(), hex)


        const options = {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacityDest: 1,
            opacitySource: 1
        }
        img.composite(horizontalFrame, 0, 0, options)
        img.composite(horizontalFrame, 0, img.getHeight() - padding, options)

        img.composite(verticalFrame, 0, 0, options)
        img.composite(verticalFrame, img.getWidth() - padding, 0, options)

        const MIME = img.getMIME()
        const buffer = await img.getBufferAsync(MIME)
        const blob = new Blob([buffer as BlobPart], { type: MIME })
        return new Promise((resolve) => {
            resolve(blob)
        })
    }

    useEffect(() => {
       const tempFun = async () => {
            const blob = await addFrame()
            setFramedImage(URL.createObjectURL(blob))
        }
        tempFun()
    }, [padding, hex])

    useEffect(()=>{
        const tempFun = () =>{
            setFramedImage(updatedImage)
        }
        tempFun()
    },[])

    
    useEffect(() => {
        setLocalImage(updatedImage)
    }, [])
    
    const onSave = async () => {

        const blob = await addFrame()
        setUpdatedImage(URL.createObjectURL(blob))
        setFramedImage(URL.createObjectURL(blob))
        setBlob(blob as Blob)
    }
    return (
        <div className='editor-body' >
            {/* {console.log(addFrame())} */}
            <div className='editor-body-sidebar'>
                <p className='tool-name'>Frames</p>
                <div>
                    <p className='padding-label frame-label'>Padding</p>
                    <input
                        className='padding-input'
                        type="number"
                        value={padding}
                        onChange={(e) => setPadding(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <p className='section-label'>BACKGROUND</p>
                    <p className='color-label frame-label'>Color</p>
                    <div
                        className='color-input'
                        onClick={() => setShowColorPicker(true)}
                    >
                        <div
                            style={{ width: 12, height: 12, backgroundColor: hex }}
                        ></div>
                        <div>
                            {
                                hex.charAt(0) === '#' ?
                                    hex
                                    : getHexVal(hex)
                            }
                        </div>

                    </div>
                </div>
                {
                    showColorPicker ?
                        <ColorPicker
                            setColor={setColor}
                            hideColorPicker={hideColorPicker}
                            color={hex}
                        /> :
                        null
                }

                <input
                    type="button"
                    value='Reset'
                    className='reset-button'
                    onClick={() => {
                        setUpdatedImage(localImage)
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
                <img src={framedImage} alt="" />
            </div>
        </div>
    )
}