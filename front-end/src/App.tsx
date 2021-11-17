import { useState, ChangeEvent, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { storage } from './firebase';
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
    const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {

        console.log(event.target.files)

        if (event.target.files && event.target.files.length > 0) {
            setFile(event?.target.files[0])
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result as string);
                setUpdatedImage(reader.result as string)
                console.log(typeof reader.result)
                // if(history !== undefined) history.push('/editor')
            });
        }
    }


    const uploadImage = (presetName: string) => {

        const uploadTask = storage.ref(`/images/${file?.name.split('.')[0]}_${Date.now()}.${blob?.type.split('/')[1]}`).put(blob as Blob);

        uploadTask.on('state_changed', fn1, fn2, fn3);
        function fn1(snapshot: { bytesTransferred: number; totalBytes: number; }) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress} done.`)
        }
        function fn2(error: any) {
            console.log('error', error)
        }
        async function fn3() {
            try {
                var url = await uploadTask.snapshot.ref.getDownloadURL()
                console.log(url)

                const newPreset = JSON.stringify({
                    url,
                    metadata: {
                        size: blob?.size,
                        format: blob?.type
                    },
                    presetName
                })
                const img = await fetch('http://localhost:5000/images', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: newPreset
                })
                console.log(await img.json(), 'imggg')
            } catch (err) {
                console.log('backend error', err)
            }
        }

    }

    const getImages = async () => {

        const response = await fetch('http://localhost:5000/images')
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
