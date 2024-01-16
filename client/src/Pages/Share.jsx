import React from "react";

const Share = () => {
  return (
    <div className="container">
      <div className="align-items-center d-flex justify-content-around ">
        <div className="mt-5">
          <label className="mx-3 fw-300 " htmlFor="">
            Enter your{" "}
          </label>
          <input type="text" placeholder="Enter your details" />
        </div>
      </div>
    </div>
  );
};

export default Share;
