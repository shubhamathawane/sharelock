import React, { useEffect } from "react";
import "../Styles/RightComponent.css";

const RightComponent = ({ account, provider, contract }) => {
  useEffect(() => {
    const accessList = async () => {
      const addressLists = await contract.shareAccess();
      let select = document.querySelector("#selectNumbers");
      const option = addressLists;

      for (let i = 0; i < option.length; i++) {
        let opt = option[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, []);

  return (
    <div className="container">
      <h4 className="label">Your Account 👀</h4>
      <div className="key-div">
        <p className="key">{account ? account : "Not Connected"}</p>
      </div>

      <div className="keyUsers">
        <h3 className="heading">Users with Access 🔑</h3>

        <div className="users">
          <div className="list">
            <form action="" id="myForm">
              <select name="" id="selectNumbers">
                <option value="" className="right-address">
                  People with Access
                </option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightComponent;
