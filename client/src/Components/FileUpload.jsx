import React, { useState } from "react";
import axios from "axios";
import "../Components/FileUpload.css";
import uploadIcon from "../Image/upload.png";

const FileUpload = ({ contract, account, setOpenFile }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file Selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `63e86c405a2b0bd88b8c`,
            pinata_secret_api_key: `6d35d45d306b8a22a6548aab5eb32c9865d38a4eb4b61d0e4f337ac5b14926e9`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; // files array of files object
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form action="" className="forms" onSubmit={handleSubmit}>
        <label className="header" htmlFor="">
          Upload Your Files
        </label>
        <div className="drag-area">
          <label htmlFor="file-upload" className="choose">
            <img className="icon btn" src={uploadIcon} alt="Upload file " />
            <div className="form-inside">
              <input
                disabled={!account}
                type="file"
                id="file-upload"
                name="data"
                hidden
                onChange={retrieveFile}
              />
            </div>
            <br />
            <div>
              <span className="textArea"> <strong className="head"  style={{color:"#7b7fda"}}>Image</strong>  : {fileName}</span>
              <br />
              <span className="support">Supports: JPEG, JPG, PNG</span>
              <br />
              <button type="submit" className="upload btn" disabled={!file}>
                Upload
              </button>
              <button className="btn cancel" onClick={() => setOpenFile(false)}>
                Cancel
              </button>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
