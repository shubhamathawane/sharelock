import React, { useState } from "react";

const Display = ({ contract, account, setOpenData }) => {
  const [data, setData] = useState("");

  const style = {
    float: "left",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    padding: "10px",
  };

  const getData = async () => {
    let dataArray;
    const otherAddress = document.querySelector("#emails").value;
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      console.log("You don't have access!");
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              style={style}
              key={i}
              src={item}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to Display");
    }
  };
  return (
    <>
      <div className="image-list">
        <br />
        {/* <button onClick={() => setOpenData(false)}>X</button> */}
        <hr />
        <h2>
          Images <button onClick={() => setOpenData(false)}> Back </button>
        </h2>
        <hr />
        <div className="data">{data}</div>
        <input
          type="text"
          placeholder="Enter Address"
          id="emails"
          className="input-get"
        />
        <br />
        <button className="get-data btn" onClick={getData}>
          Get Data
        </button>
      </div>
    </>
  );
};

export default Display;
