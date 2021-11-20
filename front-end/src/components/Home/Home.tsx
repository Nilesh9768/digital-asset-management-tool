
import { Link } from 'react-router-dom'
import { HomeProp, fetchedImageType } from '../types'
import './Home.css'
export default function Home({ onSelectFile, fetchedImages, showFileError,setShowFileError }: HomeProp) {

    return (
        <div>

            <div className='image-input-container'>
                <label htmlFor="image" className='image-label'>Upload an Image</label>
                <input
                    className='image-input'
                    type="file"
                    id='image'
                    accept="image/*"
                    onChange={(event) => onSelectFile(event)}
                />

                {
                    showFileError ?
                        <div className='error'>
                            Only png, jpeg/jpg, tiff, bmp, gif, eps types of image is allowed!
                            
                        </div> :
                        null
                }
            </div>

            <div className='image-index-container'>
                {
                    fetchedImages.map((image: fetchedImageType) => {
                        return (
                            <div key={image._id}>
                                <Link to={`/images/${image._id}/${image.preset_name}`}>
                                    <img className='fetched-image' src={image.url} alt="" />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
