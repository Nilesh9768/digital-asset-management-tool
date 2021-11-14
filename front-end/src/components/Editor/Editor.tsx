import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Cropper from "../Cropper/Cropper";
import Effects from "../Effects/Effects";
import FocalPointer from "../FocalPointer/FocalPointer";
import Frame from "../Frame/Frame";
import ImageFormat from "../ImageFormat/ImageFormat";
import ImageQuality from "../ImageQuality/ImageQuality";
import Overlay from "../Overlay/Overlay";
import Transform from "../Transform/Transform";
import './Editor.css'

type EditorProp = {
    image: string,
    updatedImage: string,
    setUpdatedImage: (img: string) => void,
    setBlob: (blob: Blob) => void,
    uploadImage: () => void
}
function Editor({ image, updatedImage, setUpdatedImage, setBlob, uploadImage }: EditorProp) {

    const [activeTool, setActiveTool] = useState(0)
    const toggleActiveTool = (index: number) => {
        console.log(index)
        setActiveTool(index)
    }

    const renderActiveTool = () => {
        switch (activeTool) {

            case 0:
                return <Cropper
                    image={image}
                    updatedImage={updatedImage}
                    setUpdatedImage={setUpdatedImage}
                    setBlob={setBlob}
                />
            case 1:
                return <Transform
                    image={image}
                    updatedImage={updatedImage}
                    setUpdatedImage={setUpdatedImage}
                    setBlob={setBlob}
                />
            case 2:
                return <FocalPointer />
            case 3:
                return <Effects
                    image={image}
                    updatedImage={updatedImage}
                    setUpdatedImage={setUpdatedImage}
                    setBlob={setBlob}
                />
            case 4:
                return <Overlay
                image={image}
                updatedImage={updatedImage}
                setUpdatedImage={setUpdatedImage}
                setBlob={setBlob}
             />
            case 5:
                return <Frame
                    image={image}
                    updatedImage={updatedImage}
                    setUpdatedImage={setUpdatedImage}
                    setBlob={setBlob}
                />
            case 6:
                return <ImageQuality
                image={image}
                updatedImage={updatedImage}
                setUpdatedImage={setUpdatedImage}
                setBlob={setBlob}
             />

            case 7:
                return <ImageFormat
                    image={image}
                    updatedImage={updatedImage}
                    setUpdatedImage={setUpdatedImage}
                    setBlob={setBlob}
                />
            default:
                return null

        }
    }
    return (
        <div className='editor-done-container'>
            <div className='editor-container'>
                <Sidebar toggleActiveTool={toggleActiveTool} activeTool={activeTool} />
                <div>
                    {renderActiveTool()}
                </div>
            </div>
            <div className='done-container'>
                <input className='done-button' type="button" value='Done' onClick={() => uploadImage()} />
            </div>
        </div>
    )
}

export default Editor;
