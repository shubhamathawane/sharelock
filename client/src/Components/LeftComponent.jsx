import React, { useState } from "react";
import "../Styles/LeftComponent.css";
import { Link, Route, Router, Routes } from "react-router-dom";
import FileUpload from "./FileUpload";
import Display from "./Display";
import Modal from "./Modal";
import Home from "../Pages/Home";
import About from "../Pages/About";
import DataPage from "./DataPage";

const LeftComponent = ({ contract, account, provider }) => {
  const [openFile, setOpenFile] = useState(false);
  const [openData, setOpenData] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  return (
    <div className="left-container">
      <div className="main">
        {/* <div className="buttons">
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
        </div> */}
        <div className="container">
          <div className="text-left">
            {/* <div className="border-bottom d-flex gap-4 mt-3 p-1">
              <Link to="/data">
                <p>Share</p>
              </Link>
              <p>Upload</p>
              <p>Get Data</p>
            </div> */}
            <div className="mt-3">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Home
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Upload
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact"
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    Share
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div>
                    <Display
                      account={account}
                      contract={contract}
                      setOpenData={setOpenData}
                    />
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <FileUpload
                    account={account}
                    provider={provider}
                    contract={contract}
                    setOpenFile={setOpenFile}
                  />
                </div>
                <div
                  class="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <div className="mt-3">
                    <Modal contract={contract} setOpenShare={setOpenShare} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftComponent;
