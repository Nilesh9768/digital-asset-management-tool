import { CSSProperties, useState } from 'react'
import { handleStyle, railStyle, trackStyle, effectsProperties } from '../CustomeSliders/CustomSliders'
import { ToolProp } from '../types'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { IoIosSave } from 'react-icons/io'
import { createImageFromUrl } from '../../commonFunctions/commonFunction'
import './Effects.css'
export default function Effects({ image, updatedImage, setUpdatedImage, setBlob }: ToolProp) {


    const [effects, setEffects] = useState({
        'brightness': 100,
        'contrast': 100,
        'saturate': 100,
        'amount': 0,
        'radius': 0,
        'threshold': 0
    })

    const props = [
        'brightness',
        'contrast',
        'saturate',
        // 'amount',
        // 'radius',
        // 'threshold'
    ]

    const handleChange = (value: number, prop: string) => {

        setEffects(prevState => ({
            ...prevState,
            [prop]: value
        }))
    }

    const imgStyle = (): CSSProperties => {

        const filters = props.map(prop => {
            return `${prop}(${(effects as any)[prop]}%)`
        })
        console.log(filters)
        return {
            filter: filters.join(' ')
        }
    }

    const filterImage = async () => {
        const img = await createImageFromUrl(updatedImage) as HTMLImageElement
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const filters = props.map(prop => {
            return `${prop}(${(effects as any)[prop]}%)`
        })
        if (context) {
            context.filter = `${filters.join(' ')}`
            console.log(effects)
        }

        context?.drawImage(img, 0, 0)
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            })
        })
    }
    const onSave = async () => {
        const blob = await filterImage()
        setBlob(blob as Blob)
        setUpdatedImage(URL.createObjectURL(blob))
    }
    return (
        <div className='editor-body'>
            <div className='editor-body-sidebar'>
                <p className='tool-name'>Effects</p>
                {
                    effectsProperties.map((property, index) => {
                        return (
                            <div className='effects-slider' key={index}>
                                <div className='effects-label'>
                                    {property.prop.charAt(0).toUpperCase() + property.prop.slice(1)}
                                </div>
                                <Slider
                                    min={property.min}
                                    max={property.max}
                                    startPoint={property.startPoint}
                                    step={1}
                                    handleStyle={handleStyle}
                                    railStyle={railStyle}
                                    trackStyle={trackStyle}
                                    value={(effects as any)[property.prop]}
                                    onChange={(val) => handleChange(val, property.prop)}
                                />
                                {
                                    index <= 2 ?

                                        <p>{((effects as any)[property.prop] - 100)}</p> :
                                        <p>{(effects as any)[property.prop]}</p>
                                }
                            </div>
                        )
                    })
                }
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
                <img src={updatedImage} style={imgStyle()} alt="" />
            </div>
        </div>
    )
}
