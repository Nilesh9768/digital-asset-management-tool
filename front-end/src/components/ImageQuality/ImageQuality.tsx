import Jimp from 'jimp'
import { useState, useEffect } from 'react'
import { IoIosSave } from 'react-icons/io'
import { createImageFromUrl } from '../../commonFunctions/commonFunction'

import { ToolProp } from '../types'
import './ImageQuality.css'
export default function ImageQuality({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {


    const [activeQuality, setActiveQuality] = useState<number>(5)
    const [imageUrl, setImageUrl] = useState<string[]>([])
    const [originalSize, setOriginalSize] = useState<number>(0)
    const [newSize, setNewSize] = useState<number>(originalSize)
    const qualities = ['Very Low', 'Low', 'Medium', 'High', 'Very High', 'Original']
    const qualityValue = [5, 20, 40, 100, 100, 100]
    const getQualityClassName = (idx: number): string => {

        let cl_name = idx % 2 === 0 ? 'right' : 'left'
        cl_name += idx === activeQuality ? ' activeQuality' : ''
        return cl_name
    }

    const getImage = async (quality: number) => {

        const img = await createImageFromUrl(updatedImage) as HTMLImageElement;
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

      
        const context = canvas.getContext("2d");
        context?.drawImage(img, 0, 0)
        // console.log(context?.getImageData(10,10,1,1))
        const b = await new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            }, 'image/jpeg', quality / 100)
        })

        console.log(b, 'xyz')
        const z = await Jimp.read(image)
        const MIME = z.getMIME()
        const jimpImage = await Jimp.read(URL.createObjectURL(b))
        const buffer = await jimpImage.getBufferAsync(MIME)
        const blob = new Blob([buffer as BlobPart], { type: MIME })
        return new Promise((resolve) => {
            resolve(blob)
        })

    }

    const setQuality = async (idx: number) => {
        setActiveQuality(idx)
        const blob = await getImage(qualityValue[idx]) as Blob
        setNewSize(blob.size)
        console.log(blob)
    }
    const onSave = async () => {
        const blob = await getImage(qualityValue[activeQuality])
        console.log(blob)
        setUpdatedImage(URL.createObjectURL(blob))
        setBlob(blob as Blob)
    }
    useEffect(() => {

        const z = async () => {
            let urlPromises = qualityValue.map(async (val) => {

                const blob = await getImage(val)
                return URL.createObjectURL(blob)
            })
            const urls = await Promise.all(urlPromises)
            setImageUrl(urls)
            const originalBlob = await getImage(100) as Blob
            setOriginalSize(originalBlob.size)
            setNewSize(originalBlob.size)
            setActiveQuality(5)
        }
        z()
    }, [image])
    return (
        <div className='editor-body' >

            <div className='editor-body-sidebar'>
                {/* {console.log(imageUrl)} */}
                <p className='tool-name'>Image Quality</p>
                <div className='quality-sidebar'>
                    {
                        qualities.map((Quality, idx) => {
                            return (
                                <div
                                    className={getQualityClassName(idx)}
                                    onClick={() => setQuality(idx)}
                                    key={idx}
                                >
                                    <div className='quality-preview'>
                                        <img src={imageUrl[idx]} width={'70%'} height={'80%'} alt="" />
                                    </div>
                                    <p>{Quality}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='size-container'>
                    <div>
                        <p className='size-label'>Original Size</p>
                        <p className='size'>{Math.round(originalSize / 1024)} KB</p>
                    </div>
                    <div>
                        <p className='size-label'>New Size</p>
                        <p className='size'>{Math.round(newSize / 1024)} KB</p>
                    </div>
                </div>
                <input
                    type="button"
                    value='Reset'
                    className='reset-button'
                    onClick={() => {
                        setUpdatedImage(image)
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
                <img src={imageUrl[activeQuality]} alt="" />
            </div>
        </div>
    )
}
