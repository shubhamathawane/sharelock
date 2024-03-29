import React, { useEffect } from "react";

const Modal = ({ contract, setOpenShare }) => {
  const Sharing = async () => {
    const address = document.querySelector(".inputAddr").value;
    await contract.allow(address);
    console.log("Shared");
  };

  useEffect(() => {
    const accessList = async () => {
      const addressLists = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
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
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title"> Share with ✔</div>
          <div className="body">
            <input
              type="text"
              className="inputAddr"
              placeholder="Enter Address"
            />
            <button
              className="sharing btn btn-outline-success"
              onClick={() => Sharing()}
            >
              Share
            </button>
            <form action="" id="myForm">
              <select name="" id="selectNumber">
                <option value="" className="address">
                  Peoples with Access
                </option>
              </select>
            </form>
            <div className="footer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
