import { useState} from 'react'
import { format } from 'date-fns'
import { ImageDetailsProp } from '../types'
import './ImageDetails.css'
import { Link } from 'react-router-dom'
export default function ImageDetails({ image,setImage,setUpdatedImage }: ImageDetailsProp) {

    const [presetName, setPresetName] = useState<string>('')
    const [showInput, setShowInput] = useState(false)

    const handleClick = () => {
        setImage(image.url)
        setUpdatedImage(image.url)
        setShowInput(!showInput)
        setPresetName('')
    }
    return (
        <div className='image-details-container'>
            <div>
                <img src={image.url} alt="" />
            </div>
            <div className='metadata-preset-container'>
                <div className='metadata-container'>
                    <div>
                        <div className='metadata-label'>Type</div>

                        <div className='metadata'>{image.metadata.format}</div>
                    </div>
                    <div>
                        <div className='metadata-label'>Size</div>
                        <div className='metadata'>{(image.metadata.size / 1024).toFixed(2)} KB</div>
                    </div>
                    <div>
                        <div className='metadata-label'>Upload Date</div>
                        <div className='metadata'>{format(new Date(image.metadata.uploadDate), 'MMM dd, yyyy')}</div>
                    </div>
                </div>
                <div>
                    <div
                        className='toggle-preset-input'
                        onClick={() => handleClick()}
                    >
                        Create a new Preset
                    </div>
                    {
                        showInput ?
                            <div className='preset-input-container'>
                                {console.log(presetName)}
                                <input
                                    className='preset-input'
                                    type="text"
                                    autoFocus
                                    onChange={(e) => setPresetName(e.target.value)}
                                />
                            </div> :
                            null
                    }
                    {
                        presetName !== '' && showInput ?
                            <div>
                                <Link className='next-button' to={{
                                    pathname: '/editor',
                                    state: {
                                        presetName,
                                        image
                                    }
                                }}>Next</Link>
                            </div> :
                            null
                    }

                </div>
            </div>
        </div>
    )
}
