import "./App.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Display from "./Components/Display";
import Modal from "./Components/Modal";
import upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import FileUpload from "./Components/FileUpload";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import NavBar from "./Pages/NavBar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import DataPage from "./Components/DataPage";
import Share from "./Pages/Share";
import Conversion from "./Pages/Conversion";
import SingleComponent from "./Components/SingleComponent";

function App() {
  // const [account, setAccount] = useState("");
  // const [contract, setContract] = useState(null);
  // const [provider, setProvider] = useState(null);
  // const [modalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);

  //   const loadProvider = async () => {
  //     if (provider) {
  //       window.ethereum.on("chainChanged", () => {
  //         window.location.reload();
  //       });

  //       window.ethereum.on("accountsChanged", () => {
  //         window.location.reload();
  //       });

  //       await provider.send("eth_requestAccounts", []);
  //       const signer = provider.getSigner();
  //       const address = await signer.getAddress();
  //       setAccount(address);
  //       let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  //       const contract = new ethers.Contract(
  //         contractAddress,
  //         upload.abi,
  //         signer
  //       );
  //       console.log(contract);
  //       setContract(contract);
  //       setProvider(provider);
  //     } else {
  //       console.log("Metamask is not install");
  //     }
  //   };

  //   provider && loadProvider();
  // }, []);

  return (
    <>
      {/* {!modalOpen && (
        <button
          className="share"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Share
        </button>
      )}{" "}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
      <div className="App">
        <h1>File System Blockchain</h1>
        <p style={{ color: "black" }}>
          {" "}
          Account : {account ? account : "Not Connected"}
        </p>

        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>

        <Display account={account} contract={contract}></Display>
      </div> */}
      <Router>
        <NavBar />
        <Routes>
          {/* account={account} contract={contract} */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/code" element={<Share />} />
          <Route path="/chat" element={<Conversion />} />
          <Route path="/file/:url" element={<SingleComponent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
