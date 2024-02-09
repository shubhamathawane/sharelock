import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SingleComponent = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const path = location.pathname.split("/")[2];

  const getFile = async () => {
    try {
      const res = await axios.get("https://gateway.pinata.cloud/ipfs/" + path, {
        responseType: "arraybuffer", // Ensure we get binary data
      });

      if (res && res.data) {
        // Check if the file is an image or a PDF
        const arr = new Uint8Array(res.data).subarray(0, 8);
        const header = Array.from(arr).map((byte) => String.fromCharCode(byte)).join("");

        // Common image magic bytes
        const isImageMagic =
          header.startsWith("\x89PNG") || // PNG
          header.startsWith("\xFF\xD8\xFF") || // JPEG
          header.startsWith("GIF87a") || // GIF
          header.startsWith("GIF89a"); // GIF

        // PDF magic bytes
        const isPDFMagic = header.startsWith("%PDF-");

        if (isImageMagic) {
          // If it's an image, set the data state
          setData(res.data);
          setIsImage(true);
        } else if (isPDFMagic) {
          // If it's a PDF, set the data state
          setData(res.data);
          setIsImage(false);
        } else {
          console.log("File is not an image or PDF");
          setData(null);
        }
      }
    } catch (err) {
      console.error("Error fetching file:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="mt-3">
      <div className="container h-100">
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          isImage ? (
            <img src={`data:image/jpeg;base64,${arrayBufferToBase64(data)}`} alt="" style={{ width: "100%", height: "auto" }} />
          ) : (
            <iframe src={`data:application/pdf;base64,${arrayBufferToBase64(data)}`} title="PDF Viewer" style={{ width: "100%", height: "500px" }} />
          )
        ) : (
          <p>File is not an image or PDF</p>
        )}
      </div>
    </div>
  );
};

// Function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (arrayBuffer) => {
  const binary = new Uint8Array(arrayBuffer);
  return btoa(String.fromCharCode.apply(null, binary));
};

export default SingleComponent;
