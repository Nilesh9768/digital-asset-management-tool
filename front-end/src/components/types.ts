import { ChangeEvent } from "react"

export type ToolProp = {
    image: string,
    updatedImage: string,
    setUpdatedImage: (img: string) => void,
    setBlob: (blob: Blob) => void
}

export type HomeProp = {
    fetchedImages: fetchedImageType[],
    onSelectFile: (event: ChangeEvent<HTMLInputElement>) => void,
    showFileError : boolean,
    setShowFileError : (val : boolean) => void
}

export type fetchedImageType = {
    url: string,
    metadata: {
        size: number,
        format: string,
        uploadDate: Date
    },
    _id: string,
    preset_name: string
}

export type ImageDetailsProp = {
    image: fetchedImageType,
    setImage:(img: string)=>void,
    setUpdatedImage: (img: string) => void,
}

export type presetType = {
    presetName: string,
    image?: fetchedImageType,
    path:string
}