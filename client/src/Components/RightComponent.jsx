import React, { useEffect, useState } from "react";
import "../Styles/RightComponent.css";

const RightComponent = ({ account, provider, contract }) => {
  const [copy, setCopy] = useState(false);

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
        <p className="key w-100">
          {account ? (
            <div className="d-flex justify-content-around">
              {account.substring(1, 15) +
                "...." +
                account.substring(32, account.length)}
              <button
                style={{ background: "darkcyan" }}
                className="mx-3 border-0 rounded text-white"
                onClick={() => {
                  navigator.clipboard.writeText(account);
                  setCopy(true);
                }}
              >
                {!copy ? "Copy" : "Copied"}
              </button>
            </div>
          ) : (
            "Not Connected"
          )}
        </p>
      </div>

      <div className="keyUsers">
        <h3 className="heading">Users with Access 🔑</h3>
        <div className="users">
          <div className="list">
            <form action="" className="text-start" id="myForm">
              <select
                className="w-100 rounded mt-2 text-dark"
                name=""
                id="selectNumbers"
              >
                <option value="" className="text-dark">
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
