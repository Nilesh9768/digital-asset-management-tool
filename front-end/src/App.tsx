import { useState, ChangeEvent, useEffect } from 'react';
import Editor from './components/Editor/Editor';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom'
import { storage } from './firebase';
import './App.css';

function App() {

  const [image, setImage] = useState<string>('')
  const [updatedImage, setUpdatedImage] = useState<string>(image)
  const [file, setFile] = useState<File>()
  const [blob, setBlob] = useState<Blob>()
  const history = useHistory()
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
        if(history !== undefined) history.push('/editor')
      });
    }
  }


  const uploadImage = () => {

    const uploadTask = storage.ref(`/images/${file?.name}-${Date.now()}`).put(blob as Blob);

    uploadTask.on('state_changed', fn1, fn2, fn3);
    function fn1(snapshot: { bytesTransferred: number; totalBytes: number; }) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} done.`)
    }
    function fn2(error: any) {
      console.log('error', error)
    }
    function fn3() {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);
      })
    }

  }

  return (
    <Router>
      <div className="App">
        {/* {
        typeof image === 'string' ?
          <img src={updatedImage} alt="" width={200} height={200} />
          : null
      } */}


        <Switch>
          <Route path='/' exact>
            <input type="file" accept="image/*" onChange={(event) => onSelectFile(event)} />
            {
              image !== '' ? <Redirect to='/editor' /> : null
            }
          </Route>
          <Route path='/editor'>
            <Editor
              image={image}
              updatedImage={updatedImage}
              setUpdatedImage={setUpdatedImage}
              setBlob={setBlob}
              uploadImage={uploadImage}
            />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
