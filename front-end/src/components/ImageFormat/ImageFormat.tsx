
import { useEffect, useState } from 'react'
import { AiOutlineFileImage } from "react-icons/ai";
import { ToolProp } from '../types';
import jimp from 'jimp'
import './ImageFormat.css'
import { IoIosSave } from 'react-icons/io';
export default function ImageFormat({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {

    const [activeFormat, setActiveFormat] = useState<number>()
    const formats = ['PNG', 'JPG', 'TIFF', 'BMP', 'GIF', 'EPS']
    const [newBlob, setNewBlob] = useState<Blob>()
    const [localImage,setLocalImage] = useState(updatedImage)
    
    const getFormatClassName = (idx: number): string => {

        let cl_name = idx % 2 === 0 ? 'right' : 'left'
        cl_name += idx === activeFormat ? ' activeFormat' : ''
        return cl_name
    }

    const setFormat = async (idx: number) => {
       
        setActiveFormat(idx)
        const img = await jimp.read(updatedImage)
        const buffer = await img.getBufferAsync(img.getMIME())
        const blob = new Blob([buffer as BlobPart], { type: `image/${formats[idx]}` })
        setNewBlob(blob)

    }

    const onSave = async() =>{
        setBlob(newBlob as Blob)
        setUpdatedImage(URL.createObjectURL(newBlob))
    }


    useEffect(() => {
        setLocalImage(updatedImage)
    }, [])

    return (
        <div className='editor-body'>
            <div className='editor-body-sidebar'>
                <p className='tool-name'>Formats</p>
                <div>Common</div>
                <div className='format-sidebar'>
                    {
                        formats.map((format, idx) => {
                            return (
                                <div
                                    className={getFormatClassName(idx)}
                                    onClick={() => setFormat(idx)}
                                    key={idx}
                                >
                                    <AiOutlineFileImage />
                                    <p>{format}</p>
                                </div>
                            )
                        })
                    }
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
            </div>
            <div className='flip-img-container'>
                <img src={updatedImage} alt="" />
            </div>
        </div>
    )
}
