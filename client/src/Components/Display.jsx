import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Display = ({ contract, account, setOpenData }) => {
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");

  const getFileFormatIcon = (fileExtension) => {
    const iconMappings = {
      pdf: "file-pdf",
      doc: "file-word",
      docx: "file-word",
      txt: "file-alt",
      // Add more mappings as needed
    };

    const defaultIcon = "file";
    const lowerCaseExtension = fileExtension ? fileExtension.toLowerCase() : ""; // Ensure fileExtension is defined

    return iconMappings[lowerCaseExtension] || defaultIcon;
  };

  const getFileExtension = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    return lastDotIndex !== -1
      ? fileName.substring(lastDotIndex + 1).toLowerCase()
      : "";
  };

  const isImageFile = (fileExtension) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "jfif"]; // Add more image extensions as needed
    return imageExtensions.includes(fileExtension);
  };

  const getData = async () => {
    try {
      let dataArray;
      if (email) {
        dataArray = await contract.display(email);
      } else {
        dataArray = await contract.display(account);
      }

      if (dataArray.length > 0) {
        const files = dataArray.map((item) => {
          const fileExtension = getFileExtension(item.name);

          return (
            <div className="col-md-3 mb-4" key={item.url}>
              <div className="card">
                <Link
                  to={`/file/${item.url.substring(
                    item.url.lastIndexOf("/") + 1
                  )}`}
                >
                  {isImageFile(fileExtension) ? (
                    <img
                      className="card-img-top "
                      src={item.url}
                      alt={item.name}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  ) : (
                    <i
                      style={{ objectFit: "cover" }}
                      className={`fas fa-${getFileFormatIcon(
                        fileExtension
                      )} fa-5x mt-3 text-muted d-flex justify-content-around`}
                    ></i>
                  )}
                </Link>
                <div className="card-body">
                  <p className="card-text">{item.name}</p>
                </div>
              </div>
            </div>
          );
        });
        setData(files);
      } else {
        setData(<p>No file to display</p>);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // Empty dependency array to run the effect only once

  return (
    <div className="container mt-4">
      <div className="d-flex">
        <input
          type="text"
          placeholder="Enter Address"
          id="emails"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control "
        />
        <button className="btn btn-outline-primary ml-2 ms-3" onClick={getData}>
          Fetch Data
        </button>
      </div>
      <div className="row mt-3">{data}</div>
    </div>
  );
};

export default Display;
