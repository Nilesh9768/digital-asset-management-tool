import React from 'react'
import { MdCrop, MdCenterFocusStrong } from "react-icons/md";
import { BsCircleHalf, BsBoundingBoxCircles, BsSquare } from "react-icons/bs";
import { BiImages, BiImage } from "react-icons/bi";
import { AiOutlineFileImage } from "react-icons/ai";
import './Sidebar.css'

type sidebarProp = {

    toggleActiveTool: (index: number) => void,
    activeTool: number
}
export default function Sidebar({ toggleActiveTool, activeTool }: sidebarProp) {
    return (
        <div className='sidebar'>

            <div
                className={activeTool === 0 ? 'sidebar-icons active-tool' : 'sidebar-icons'}
                onClick={() => toggleActiveTool(0)}
            >
                <MdCrop />
            </div>

            <div
                className={activeTool === 1 ? 'sidebar-icons active-tool' : 'sidebar-icons'}
                onClick={() => toggleActiveTool(1)}
            >
                <BsBoundingBoxCircles />
            </div>

            <div
                className={activeTool === 2 ? 'sidebar-icons active-tool' : 'sidebar-icons'}
                onClick={() => toggleActiveTool(2)}
            >
                <MdCenterFocusStrong />
            </div>

            <div
                className={activeTool === 3 ? 'sidebar-icons active-tool' : 'sidebar-icons'}
                onClick={() => toggleActiveTool(3)}
            >
                <BsCircleHalf />
            </div>

            <div
                className={activeTool === 4 ? 'sidebar-icons active-tool' : 'sidebar-icons'}
                onClick={() => toggleActiveTool(4)}
            >
                <BiImages />
            </div>

            <div
                className={activeTool === 5 ? 'sidebar-icons active-tool' : 'sidebar-icons'}
                onClick={() => toggleActiveTool(5)}
            >
                <BsSquare />
            </div>

            <div
                className={activeTool === 6 ? 'sidebar-icons active-tool' : 'sidebar-icons'}
                onClick={() => toggleActiveTool(6)}
            >
                <BiImage />
            </div>

            <div
                className={activeTool === 7 ? 'sidebar-icons active-tool' : 'sidebar-icons'}
                onClick={() => toggleActiveTool(7)}
            >
                <AiOutlineFileImage />
            </div>

        </div>
    )
}
