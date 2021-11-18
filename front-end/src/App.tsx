import { useState, ChangeEvent, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home/Home';
import Editor from './components/Editor/Editor';
import ImageDetails from './components/ImageDetails/ImageDetails';
import { fetchedImageType, presetType } from '../src/components/types'
import './App.css';
function App() {

    const [image, setImage] = useState<string>('')
    const [updatedImage, setUpdatedImage] = useState<string>(image)
    const [file, setFile] = useState<File>()
    const [blob, setBlob] = useState<Blob>()
    const [fetchedImages, setFetchedImages] = useState([])
    const [showFileError,setShowFileError] = useState(false)
    const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {

        console.log(event.target.files)

        if (event.target.files && event.target.files.length > 0) {
            const formats = ['PNG', 'JPG', 'TIFF', 'BMP', 'GIF', 'EPS', 'JPEG']
            const file = event?.target.files[0]
            const extension: string = file.name.split('.').pop() as string
            if (formats.indexOf(extension.toUpperCase()) >= 0) {
                setFile(file)
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.addEventListener("load", () => {
                    setImage(reader.result as string);
                    setUpdatedImage(reader.result as string)
                });
            }else{
                console.log('Only png/jpeg/jpg/tiff/bmp/gif/eps types of image is allowed!')
                setShowFileError(true)
            }
        }
    }


    const uploadImage = async (presetName: string) => {

        const data = new FormData()
        data.append('file', blob as Blob)
        data.append('upload_preset', 'codex_blog_thumbnail')

        const res = await fetch('https://api.cloudinary.com/v1_1/codex-cloud/image/upload', {
            method: "post",
            body: data
        })

        const img = await res.json()
        console.log(img.secure_url)
        const url = img.secure_url

        try {


            const newPreset = JSON.stringify({
                url,
                metadata: {
                    size: blob?.size,
                    format: blob?.type
                },
                presetName
            })
            const img = await fetch('https://digital-asset-management-tool.herokuapp.com/images', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: newPreset
            })
            console.log(await img.json(), 'imggg')
        } catch (err) {

        }


    }

    const getImages = async () => {

        const response = await fetch('https://digital-asset-management-tool.herokuapp.com/images')
        const receivedImages = await response.json()

        console.log(receivedImages)
        setFetchedImages(receivedImages)
    }
    useEffect(() => {
        getImages()
    }, [])

    useEffect(() => {
        setBlob(file)
    }, [file])

    return (
        <Router>
            <div className="App">

                <Switch>
                    <Route path='/' exact>
                        {
                            image !== '' ?
                                <Redirect to={{
                                    pathname: '/editor',
                                    state: { presetName: `${file?.name.split('.')[0]}_${Date.now()}` } as presetType
                                }} /> :
                                <Home
                                    fetchedImages={fetchedImages}
                                    onSelectFile={onSelectFile}
                                    showFileError = {showFileError}
                                    setShowFileError = {setShowFileError}
                                />
                        }
                    </Route>
                    <Route path='/editor'>
                        {
                            image === '' ?
                                <Redirect to='/' /> :
                                <Editor
                                    image={image}
                                    setImage={setImage}
                                    updatedImage={updatedImage}
                                    setUpdatedImage={setUpdatedImage}
                                    setBlob={setBlob}
                                    uploadImage={uploadImage}
                                />
                        }

                    </Route>
                    {
                        fetchedImages.map((image: fetchedImageType) => {
                            return (
                                <Route path={`/images/${image._id}/${image.preset_name}`} key={image._id}>
                                    <ImageDetails
                                        image={image}
                                        setImage={setImage}
                                        setUpdatedImage={setUpdatedImage}
                                    />
                                </Route>
                            )
                        })
                    }
                </Switch>

            </div>
        </Router>
    );
}

export default App;
