import React, { useState } from "react";
import "../Styles/LeftComponent.css";
import {} from "react-router-dom";
import FileUpload from "./FileUpload";
import Display from "./Display";
import Modal from "./Modal";
const LeftComponent = ({ contract, account, provider }) => {
  const [openFile, setOpenFile] = useState(false);
  const [openData, setOpenData] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  return (
    <div className="left-container">
      <div className="main">
        <div className="buttons">
          <div className="upperButtons">
            {!openFile && !openData && !openShare && (
              <button className="share btn btn-share" onClick={() => setOpenShare(true)}>
                Share
              </button>
            )}

            {openShare && (
              <Modal contract={contract} setOpenShare={setOpenShare} />
            )}

            {!openFile && !openData && !openShare && (
              <button className="getData btn btns" onClick={() => setOpenData(true)}>
                Get Data
              </button>
            )}

            {openData && (
              <Display
                account={account}
                contract={contract}
                setOpenData={setOpenData}
              />
            )}
          </div>

          {!openFile && !openData && !openShare && (
            <button
              onClick={() => setOpenFile(true)}
              className="upload-file btn btns"
            >
              Upload File
            </button>
          )}
          {openFile && (
            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
              setOpenFile={setOpenFile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftComponent;
