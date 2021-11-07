
import {useState} from 'react'
import { AiOutlineFileImage } from "react-icons/ai";
import { createImageFromUrl } from '../../commonFunctions/commonFunction';
import { ToolProp } from '../types';
import Sharp from 'sharp';
import './ImageFormat.css'
export default function ImageFormat({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {

    const [activeFormat,setActiveFormat] = useState<number>(0)
    const formats = ['PNG','JPG','TIFF','BMP','GIF','EPS']

    const getFormatClassName = (idx:number) : string =>{

        let cl_name = idx % 2 == 0 ? 'right' : 'left'
        cl_name += idx === activeFormat ? ' activeFormat' : ''
        return cl_name
    }

    const setFormat = async (idx:number) =>{
        console.log(formats[idx])
        setActiveFormat(idx)

        // const img = await createImageFromUrl(updatedImage) as HTMLImageElement
        // const canvas = document.createElement('canvas')
        // canvas.width = img.naturalWidth
        // canvas.height= img.naturalHeight

        // const context  = canvas.getContext('2d')
        // context?.drawImage(img,0,0)

        // // canvas.toBlob((blob)=>{
        // //     console.log(blob)
        // // },'image/gif')

        // const url = canvas.toDataURL()
        // console.log(url)

        // const img  = Sharp('react-context-png')
        // console.log(img)
        
    }
    return (
        <div className='editor-body'>
            <div className='editor-body-sidebar'>
                <p className='tool-name'>Formats</p>
                <div>Common</div>
                <div className='format-sidebar'>
                        {
                            formats.map((format,idx)=>{
                                return (
                                    <div 
                                    className={getFormatClassName(idx)}
                                    onClick = {()=>setFormat(idx)}
                                    >
                                        <AiOutlineFileImage/>
                                        <p>{format}</p>
                                    </div>
                                )
                            })
                        }
                </div>
            </div>
        </div>
    )
}
