import React, { useState } from "react";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getData = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access!");
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
            <img key={i} src={item} alt="new" className="image-list"></img>
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
        <hr />
        <h2>Images</h2>
        <hr />
        {data}
        <hr />
        <input type="text" placeholder="Enter Address" className="address" />
        <br />
        <button className="center button" onClick={getData}>
          Get Data
        </button>
      </div>
    </>
  );
};

export default Display;
