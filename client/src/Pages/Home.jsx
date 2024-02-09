import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import LeftComponent from "../Components/LeftComponent";
import RightComponent from "../Components/RightComponent";
import { ethers } from "ethers";
import upload from "../artifacts/contracts/Upload.sol/Upload.json";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Bot from "../Image/Bot.jpg";
// {account, contract, provider}

const chatbotSteps = [
  {
    id: "0",
    message: "Welcome to the Ministry of Justice e-Vault.",
    trigger: "1",
  },
  {
    id: "1",
    message: "Please authenticate yourself with your username and password.",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "Thank you, {previousValue}. How can I assist you today?",
    trigger: "4",
  },
  {
    id: "4",
    options: [
      { user: true, value: 1, label: "Upload a Document" },
      { user: true, value: 2, label: "Search for a Document", trigger: "5" },
      { user: true, value: 3, label: "View Document Categories" },
      { user: true, value: 4, label: "Retrieve Document by ID" },
      { user: true, value: 5, label: "Update Document Details" },
      { user: true, value: 6, label: "Delete a Document" },
      { user: true, value: 7, label: "Create Document Category" },
      { user: true, value: 8, label: "Delete Document Category" },
      { user: true, value: 9, label: "Assign Document to Category" },
      { user: true, value: 10, label: "List All Documents" },
      { user: true, value: 11, label: "List Document Categories" },
      { user: true, value: 12, label: "Generate Access Token" },
      { user: true, value: 13, label: "Revoke Access Token" },
      { user: true, value: 14, label: "Create User Account" },
      { user: true, value: 15, label: "Delete User Account" },
      { user: true, value: 16, label: "Grant Document Access to User" },
      { user: true, value: 17, label: "Revoke Document Access from User" },
      { user: true, value: 18, label: "Audit Document Access" },
      { user: true, value: 19, label: "Check Document Integrity" },
      { user: true, value: 20, label: "Help" },
    ],
  },
  {
    id: "5",
    message: "Please enter keywords to search for the document.",
    trigger: "6",
  },
  {
    id: "6",
    user: true,
    trigger: "7",
  },
  {
    id: "7",
    message: "Here are the search results for '{previousValue}'...",
    trigger: "8",
  },
  {
    id: "8",
    // Display search results as per the user's input or logic
    // For illustration purposes, let's say we're showing document links
    component: (
      <div>
        <p>Document 1: Link</p>
        <p>Document 2: Link</p>
        {/* Add more document links or results here */}
      </div>
    ),
    trigger: "9",
  },
  {
    id: "9",
    message: "Enter the ID of the document you want to retrieve:",
    trigger: "10",
  },
  {
    id: "10",
    user: true,
    trigger: "11",
  },
  {
    id: "11",
    message: "Retrieving document with ID {previousValue}...",
    trigger: "12",
  },
  {
    id: "12",
    // Display the retrieved document or information based on the ID entered
    component: (
      <div>
        <p>Document with ID : Link or Details</p>
        {/* Show document details or link here */}
      </div>
    ),
    trigger: "13",
  },
  {
    id: "13",
    message: "Do you want to update document details?",
    trigger: "14",
  },
  {
    id: "14",
    options: [
      { user: true, value: 1, label: "Yes", trigger: "15" },
      { user: true, value: 2, label: "No", trigger: "4" },
    ],
  },
  {
    id: "15",
    message: "Please provide the updated details for the document:",
    trigger: "16",
  },
  {
    id: "16",
    user: true,
    trigger: "17",
  },
  {
    id: "17",
    message: "Document details updated successfully!",
    trigger: "4",
  },
  {
    id: "18",
    message: "Enter the ID of the document you want to delete:",
    trigger: "19",
  },
  {
    id: "19",
    user: true,
    trigger: "20",
  },
  {
    id: "20",
    message: "Deleting document with ID {previousValue}...",
    trigger: "21",
  },
  {
    id: "21",
    message: "Document deleted successfully!",
    trigger: "4",
  },
];

const steps = [
  {
    id: "0",
    message: "Welcome to the Ministry of Justice e-Vault Help Assistant. Please enter your username:",
    trigger: "1",
  },
  {
    id: "1",
    user: true,
    trigger: "2",
  },
  {
    id: "2",
    message: "Hello, {previousValue}! How can I assist you today?",
    trigger: "3",
  },
  {
    id: "3",
    options: [
      { user: true, value: 1, label: "How to Upload a Document", trigger: "4" },
      { user: true, value: 2, label: "How to Search for a Document", trigger: "5" },
      { user: true, value: 3, label: "How to View Document Categories", trigger: "6" },
      { user: true, value: 4, label: "How to Retrieve Document by ID", trigger: "7" },
      { user: true, value: 5, label: "How to Update Document Details", trigger: "8" },
      // Add more help options for different functionalities
      { user: true, value: 6, label: "More Help", trigger: "9" },
    ],
  },
  {
    id: "4",
    message: "To upload a document, navigate to the 'Upload' section and follow the instructions provided.",
    trigger: "3",
  },
  {
    id: "5",
    message: "To search for a document, use the search bar and enter keywords related to the document you're looking for.",
    trigger: "3",
  },
  {
    id: "6",
    message: "To view document categories, go to the 'Categories' section where all categories are listed.",
    trigger: "3",
  },
  {
    id: "7",
    message: "To retrieve a document by ID, use the 'Retrieve by ID' feature and enter the document's ID.",
    trigger: "3",
  },
  {
    id: "8",
    message: "To update document details, select the document and choose the 'Update Details' option.",
    trigger: "3",
  },
  // More help options can be added similarly
  {
    id: "9",
    message: "For more assistance, please contact our support team at support@example.com.",
    end: true,
  },
];



const theme = {
  FontFace: "Fira code",
  background: "#F7F7F7",
  headerBgColor: "#0DAE86",
  headerFontSize: "16px",
  botBubbleColor: "#F0F8FB",
  headerFontColor: "white",
  // botFontColor: "#A1C0BE",
  userBubbleColor: "#48ADC9",
  userFontColor: "white",
};

const config = {
  botAvatar: Bot,
  floating: true,
};

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
        alert.log("Metamask is not install");
      }
    };

    provider && loadProvider();
  }, []);

  return (
    <div className="container d-flex justify-content-around mt-5">
      <div className="w-100">
        <ThemeProvider theme={theme}>
          <ChatBot headerTitle="Blockie" steps={steps} {...config} />
        </ThemeProvider>
        <div className="row d-flex">
          <div className="col-8 border rounded-3">
            <div className="">
              <LeftComponent
                account={account}
                provider={provider}
                contract={contract}
              />
            </div>
          </div>
          {/* <div className="vline position-absolute ms-5"></div> */}
          <div className="col-4">
            <div className="">
              <RightComponent
                account={account}
                provider={provider}
                contract={contract}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
