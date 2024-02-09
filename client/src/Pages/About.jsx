import React from "react";
import "../Styles/About.css";

const About = () => {
  const members = [
    {
      name: "Sandeep Pradhan",
      git: "www.google.com",
      Role: "Full Stack Developer",
    },
    {
      name: "Shubham Athawane",
      git: "www.google.com",
      Role: "Full Stack Developer",
    },
    {
      name: "Kunal Kalamkar",
      git: "www.go.com",
      Role: "Full Stack Developer",
    },
    {
      name: "Varun Mudhole",
      git: "www.go.com",
      Role: "Full Stack Developer",
    },
  ];

  return (
    <div>
      <div className="aboutContainer">
        <div className="aboutSection">
          <span className="head">About Us</span>
          <p>
            A pioneering decentralized legal doc system with ReactJS for the
            frontend and Solidity for smart contracts. By utilizing Pinata IPFS
            for secure data storage, our platform not only enables seamless
            sharing of data with others but also provides easy access to data
            shared by fellow users.
          </p>
          <p>
            This transformative solution is the outcome of our college project,
            redefining the way we store and share files on the blockchain.
          </p>
          <p>
            <b>Team Members</b>{" "}
            <div className="mt-3">
              {members.map((item, key) => (
                <div className="">
                  <label className="text-left">
                    {key + 1}) {item.name}
                  </label>
                </div>
              ))}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
