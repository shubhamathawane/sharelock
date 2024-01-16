import React, { useEffect, useState } from "react";
import { keyframes } from "styled-components";

const Conversion = () => {
  const user = ["shubham", "Sandeep", "kunal", "Varun", "Vaibhav"];

  //   const [users, setUsers] = useState([]);
  //   useEffect(() => {
  //     const userList = async () => {
  //       const addressLists = await contract.shareAccess();
  //       if (addressLists) {
  //         setUsers(addressLists);
  //       }
  //     };
  //     userList();
  //   }, [users]);

  return (
    <div className="mt-5 container">
      <div className="bg-success rounded border-none p-3">
        <h3>Choose User to chat </h3>
        {user?.map((item, key) => (
          <div className="" key={key}>
            <p className="text-white fw-5 fs-5">
              {" "}
              <a className="text-white" href="{item}">
                {item}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversion;
