import React, { useEffect } from "react";

const Modal = ({ contract, setModalOpen }) => {
  const Sharing = async () => {
    const address = document.querySelector(".address").value;
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
          <div className="title"> share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            />
            <form action="" id="myForm">
              <select name="" id="selectNumber">
                <option value="" className="address">
                  Poeple with Access
                </option>
              </select>
            </form>
            <div className="footer">
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                id="cancelBtn"
              >
                Cancel
              </button>
              <button onClick={() => Sharing()}>Sharing</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
