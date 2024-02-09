import React, { useState } from "react";
import axios from "axios";
import "../Components/FileUpload.css";
import uploadIcon from "../Image/upload.png";

const FileUpload = ({ contract, account, setOpenFile }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file Selected");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `c2512e3d5afb0c534051`,
          pinata_secret_api_key: `584eba07980bfff09a11f7adec13c18a160fc98131036ef79a98fdde4b3f0662`,
          "Content-Type": "multipart/form-data",
        },
      });

      const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      const imgName = file.name;

      contract.add(account, imgName, imgHash);

      alert("Successfully Image Uploaded");
      setFileName("No image selected");
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Unable to upload image to Pinata. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="h-50">
      <form action="" className="" onSubmit={handleSubmit}>
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
              <span className="textArea">
                {" "}
                <strong className="head" style={{ color: "#7b7fda" }}>
                  Image
                </strong>{" "}
                : {fileName}
              </span>
              <br />
              <span className="support">Supports: JPEG/PNG/JPG, PDF, DOC</span>
              <br />
              <div className="d-flex justify-content-around mt-2 mt-3">
                <button
                  type="submit"
                  className="bg-success text-white btn"
                  disabled={!file || loading}
                >
                  {loading ? "Uploading.." : "Upload"}
                </button>
                <button
                  className="btn cancel btn-outline-secondary"
                  onClick={() => setOpenFile(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
