import "./App.css";
import Display from "./Components/Display";
import Modal from "./Components/Modal";
import upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import FileUpload from "./Components/FileUpload";
import { useEffect, useState } from "react";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

        const contract = new ethers.Contract(
          contractAddress,
          upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.log("Metamask is not install");
      }
    };

    provider && loadProvider();
  }, []);

  return (
    <>
      {!modalOpen && (
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
      </div>
    </>
  );
}

export default App;
