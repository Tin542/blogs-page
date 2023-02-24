import { useState } from "react";
import { storage } from "../../../firebase/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {Input, Image} from 'antd';

const UploadImageContainer = (props) => {
  const {file, setFile} = props;
  const [percent, setPercent] = useState(0);

  const handleUpload = (event) => {
    console.log('file 1 ', event);
    if (!event) {
      // check if file is not empty
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/${event.name}`); //pass in the storage service and file path as an argument
    const uploadTask = uploadBytesResumable(storageRef, event); //accepts the storage reference and the file to upload

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFile(url);
        });
      }
    );
  }

  return (
    <div>
      <Input type="file" onChange={(e)=>handleUpload(e.target.files[0])} accept="" />
      <p>{percent} "% done"</p>
      {file ? <Image src={file} alt="" width={50} height={50}/> : ''}
      
    </div>
  )
}
export default UploadImageContainer;