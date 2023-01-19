import { toggleSidebar } from "../api_utils/geditor_utils";
import { useState } from "react";
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import {v4} from 'uuid';

function TopNav() {
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if(imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("image uploaded");
    });
  };


  const handleClick = () => {
    toggleSidebar(false);
  };
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container ">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleClick}
        >
          <i className="fa fa-compress"></i>
        </button>
        
        <div>
        <input 
        type='file' 
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          }} 
          style={{color:'rgb(7, 255, 234)', fontSize:'10px'}}/>
          <button onClick={uploadImage} 
            style={{fontSize:'10px'}}
            >
            Upload Image
            </button>
        </div>
        
        <div className="panel__devices"></div>
        <div className="panel__editor"></div>
        <div className="panel__basic-actions"></div>
      </div>
    </nav>
  );
}

export default TopNav;
