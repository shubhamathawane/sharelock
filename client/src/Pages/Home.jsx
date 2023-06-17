import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import LeftCompnent from "../Components/LeftComponent";
import RightComponent from "../Components/RightComponent";
import { ethers } from "ethers";
import upload from "../artifacts/contracts/Upload.sol/Upload.json";

// {account, contract, provider}

const Home = () => {

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
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
    <div className="container">
      <div className="wrapper">
        <div className="w-left">
          <LeftCompnent
            account={account}
            provider={provider}
            contract={contract}
          />
        </div>
        <div className="vline"> </div>
        <div className="w-right">
          <RightComponent
            account={account}
            provider={provider}
            contract={contract}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
