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
import { useLocation } from "react-router";
import {presetType} from '../types'
type EditorProp = {
    image: string,
    setImage:(img: string)=>void,
    updatedImage: string,
    setUpdatedImage: (img: string) => void,
    setBlob: (blob: Blob) => void,
    uploadImage: (presetName:string) => void
}
function Editor({ image, setImage,updatedImage, setUpdatedImage, setBlob, uploadImage }: EditorProp) {

    const [activeTool, setActiveTool] = useState(0)
    const toggleActiveTool = (index: number) => {
        console.log(index)
        setActiveTool(index)
    }
    const location = useLocation()
    const state = location.state as presetType
    console.log(state.presetName,'location')
    // const {presetName} = location.state

    // useEffect(()=>{

    //     if(state.image){
    //         setUpdatedImage(state.image.url)
    //         setImage(state.image.url)
    //     }
    // },[])
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
                <input className='done-button' type="button" value='Done' onClick={() => uploadImage(state.presetName)} />
            </div>
        </div>

    )
}

export default Editor;
