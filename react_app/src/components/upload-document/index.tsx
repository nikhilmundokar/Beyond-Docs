import React, { useRef, useState, ChangeEvent, DragEvent } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import Web3 from "web3";
import "./style.scss";

import CallToAction from "../common/calltoaction";
import { FaDownload } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";

function UploadDocument({
  isAuthenticated,
  userAddress,
}: {
  isAuthenticated: boolean;
  userAddress: string;
}) {
  const [isDragOver, setDragOver] = useState(false);

  const [fileInfo, setFileInfo] = useState<{
    name: string;
    type: string;
    size: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const pinataJWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlNWMzMDA1NC0zMDg5LTQ1ZGYtYmMzOS0yZGY2ZDJjYzc1NWIiLCJlbWFpbCI6InNzODQ2MTIxNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGU0NTAyZGY5MWE3MmQwMzYzZDIiLCJzY29wZWRLZXlTZWNyZXQiOiJjY2VkMzAzOWNjNjQ0MDg1MWMzYjVjM2JhMzA3YzgxYWFhYjVjNjM0MDE1OTFhZjVlMjFmM2Y1MzI3OGFlODI4IiwiaWF0IjoxNzA0OTkwODQ0fQ.dlUWzFIj7JQ1WXthSmBkBOhYbRA4e2Yl5DgWTzILG7g";

  const [fileSignature, setFileSignature] = useState<string | null>(null);

  const [uploadedFileInfo, setUploadedFileInfo] = useState<{
    hash: string;
    size: number;
  } | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setUploadedFileInfo(null);
    setFileSignature(null);
    setFileInfo(
      file ? { name: file.name, type: file.type, size: file.size } : null
    );
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setFileInfo(null);
  };

  const saveHashToFile = (hash: string) => {
    const fileContent = `${hash}`;
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "file.dat";
    link.click();
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const calculateFileSignature = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        const signature = CryptoJS.SHA256(fileContent).toString();
        setFileSignature(signature);
        saveHashToFile(signature);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleUpload = async () => {
    calculateFileSignature();
    if (!isAuthenticated) {
      console.error("User not authenticated. Please connect with MetaMask.");
      return;
    }

    if (selectedFile && fileSignature) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("signature", fileSignature);
      try {
        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              Authorization: `Bearer ${pinataJWT}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { IpfsHash, size } = response.data;
        setUploadedFileInfo({ hash: IpfsHash, size });
        saveHashToFile(IpfsHash);
        const contractAddress = "";
        const UserDataStorageABI: any[] = [];
        const contract = new Web3.eth.Contract(
          UserDataStorageABI,
          contractAddress
        );
        await contract.methods
          .setUserData(IpfsHash)
          .send({ from: userAddress });
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    setSelectedFile(file || null);
    setFileInfo(
      file ? { name: file.name, type: file.type, size: file.size } : null
    );
  };

  return (
    <>
      <div className="main-content">
        <div className="title"> Please Select A Document To Upload </div>
        <p className="text-center">Connected User: {userAddress}</p>
        <div
          className={`drag-document ${isDragOver ? "drag-over" : ""} ${
            fileInfo ? "add-file" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="file-info">
              <FaRegFilePdf />

              <p>{fileInfo ? fileInfo.name : "No file selected"}</p>
              <p>{fileInfo ? fileInfo.type : ""}</p>
              <p>{fileInfo ? (fileInfo.size / 1024).toFixed(2) + " KB" : ""}</p>

              <MdOutlineCancel className="cancel-icon" onClick={handleCancel} />
            </div>
          ) : (
            <div className="drag-info">
              <div className="icon">
                <FaDownload />
              </div>
              <p>Select a file or drag here</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {isAuthenticated ? (
          <>
            {fileSignature && (
              <div className="mt-2">
                <p>
                  <strong>File Signature:</strong> {fileSignature}
                </p>
              </div>
            )}
            {uploadedFileInfo && (
              <div className="mt-4">
                <h2>Uploaded File Information:</h2>
                <p>
                  <strong>IPFS Hash:</strong> {uploadedFileInfo.hash}
                </p>
                <p>
                  <strong>Size:</strong> {uploadedFileInfo.size} bytes
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-center">
            Please connect with MetaMask to upload files.
          </p>
        )}

        <div className="ctas">
          <CallToAction text="Browse" type="fill" action={handleBrowseClick} />
          <CallToAction
            text="Digital signature"
            type="fill"
            action={calculateFileSignature}
          />
          <CallToAction text="Upload File" type="fill" action={handleUpload} />
        </div>
      </div>
    </>
  );
}

export default UploadDocument;
