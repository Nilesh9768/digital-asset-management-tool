import { ChangeEvent, CSSProperties, useState } from 'react'
import { fabric } from 'fabric'
import { IoIosSave } from 'react-icons/io'
import { createImageFromUrl } from '../../commonFunctions/commonFunction'
import { ToolProp } from '../types'

export default function Frame({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {

    const [padding, setPadding] = useState<number>(10)
    const [url, setUrl] = useState<string>('')
    const setFrame = (): CSSProperties => {

        return {
            boxSizing: 'border-box',
            border: `${padding}px solid red`
        }
    }

    const addFrame = async () => {

        const img = await createImageFromUrl(updatedImage) as HTMLImageElement
        const canvas = document.createElement('canvas')
                                                                                // const canvas = new fabric.Canvas(c, {
                                                                                //     width: img.naturalWidth,
                                                                                //     height: img.naturalHeight,

                                                                                // })
                                                                                // fabric.Image.fromURL(updatedImage, (receievedImg) => {
                                                                                //     canvas.backgroundImage = receievedImg
                                                                                // })
                                                                                // const border = new fabric.Rect({
                                                                                //     stroke: 'grey',
                                                                                //     strokeWidth: 20
                                                                                // })
                                                                                // canvas.add(border)
                                                                                // let url = ''
                                                                                
                                                                                // console.log(url)
                                                                                // canvas.loadFromJSON(JSON,()=>{
                                                                                //     url = canvas.toDataURL()
                                                                                //     setUrl(url)
                                                                                // })
                                                                                // const d1 = JSON.stringify(canvas.toJSON())
                                                                                // const d2 = canvas.toDataURL
                                                                                // return new Promise((resolve) => {
                                                                                //     canvas.getElement().toBlob((blob)=>{
                                                                                //         resolve(blob)
                                                                                //     })
                                                                                    
                                                                                // })
                                                                                //    console.log(url)
                                                                                //    setUpdatedImage(url)
        canvas.width = img.naturalWidth
        canvas.height = img .naturalHeight

        const context = canvas.getContext('2d')

        if(context){
            // context.globalCompositeOperation = 'source-over'
            context?.strokeRect(0,0,canvas.width,canvas.height)
            context.lineWidth = 10
            context.strokeStyle = 'red'

        }
        canvas.style.border = '10px solid red'
        context?.drawImage(img,0,0)
        // let d = context?.getImageData(0,0,canvas.width,canvas.height)
        // console.log(d)
        return new Promise((resolve)=>{
            canvas.toBlob((blob) => resolve(blob))
        })
    }
    const onSave = async () => {

        const blob = await addFrame()
        console.log(URL.createObjectURL(blob))
        setUrl(URL.createObjectURL(blob))
        // console.log(blob)
        // setBlob(blob as Blob)
        // setUpdatedImage(URL.createObjectURL(blob))
    }
    return (
        <div className='editor-body' >
            {console.log(url,'urllll')}
            <div className='editor-body-sidebar'>
                <p className='tool-name'>Frames</p>
                <div>
                    <p>Padding</p>
                    <input
                        type="number"
                        value={padding}
                        onChange={(e) => setPadding(parseInt(e.target.value))}
                    />
                </div>
                <img src={url} width={100} height={100} alt="" />
                <input
                    type="button"
                    value='Reset'
                    className='reset-button'
                    onClick={() => {
                        setUpdatedImage(image)
                        // setFlippedImage(image)
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
                <img src={updatedImage} style={setFrame()} alt="" />
            </div>
        </div>
    )
}
