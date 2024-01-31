import React, { useRef, useState, ChangeEvent, DragEvent } from "react";
import "./style.scss";
import CallToAction from "../common/calltoaction";
import { FaDownload } from "react-icons/fa";
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Web3 from 'web3';
import { CButton } from "@coreui/react";
import { AiOutlineFile } from 'react-icons/ai';

function UploadDocument({ isAuthenticated, userAddress }: { isAuthenticated: boolean; userAddress: string }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlNWMzMDA1NC0zMDg5LTQ1ZGYtYmMzOS0yZGY2ZDJjYzc1NWIiLCJlbWFpbCI6InNzODQ2MTIxNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGU0NTAyZGY5MWE3MmQwMzYzZDIiLCJzY29wZWRLZXlTZWNyZXQiOiJjY2VkMzAzOWNjNjQ0MDg1MWMzYjVjM2JhMzA3YzgxYWFhYjVjNjM0MDE1OTFhZjVlMjFmM2Y1MzI3OGFlODI4IiwiaWF0IjoxNzA0OTkwODQ0fQ.dlUWzFIj7JQ1WXthSmBkBOhYbRA4e2Yl5DgWTzILG7g'; // Replace with your actual Pinata JWT
  const [fileSignature, setFileSignature] = useState<string | null>(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{ hash: string; size: number } | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setUploadedFileInfo(null); // Clear previous file information
    setFileSignature(null);
  };
  const saveHashToFile = (hash: string) => {
    const fileContent = `${hash}`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'file.dat'; // Provide a name for your file with the .dll extension
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
        saveHashToFile(signature)
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleUpload = async () => {
    calculateFileSignature();
    if (!isAuthenticated) {
      console.error('User not authenticated. Please connect with MetaMask.');
      return;
    }

    if (selectedFile && fileSignature) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('signature', fileSignature); // Include the signature in the form data

      try {
        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${JWT}`,
              'Content-Type': 'multipart/form-data', // Set content type for file upload
            },
          }
        );

        const { IpfsHash, size } = response.data;
        setUploadedFileInfo({ hash: IpfsHash, size });
        saveHashToFile(IpfsHash);
        const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
        const UserDataStorageABI: any[] = [
          // ... your ABI here
        ]; // Replace with your contract address
        const contract = new Web3.eth.Contract(UserDataStorageABI, contractAddress);
        await contract.methods.setUserData(IpfsHash).send({ from: userAddress });
        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <>
      <div className="main-content">
        <p className="text-center">Connected User: {userAddress}</p>
        <div className="title"> Please Select A Document To Upload </div>
        <div
          className="drag-document"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="icon">
            <FaDownload />
          </div>
          <p>Select a file or drag here</p>
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
          <p className="text-center">Please connect with MetaMask to upload files.</p>
        )}
        <div className="ctas">
          <CallToAction text="Browse" type="fill" action={handleBrowseClick} />
          <CallToAction text="Digital signature" type="fill" action={calculateFileSignature} />
          <CButton color="border" onClick={handleUpload}>
            <AiOutlineFile className="mr-2" />
            Upload File
          </CButton>
        </div>
      </div>
    </>
  );
}

export default UploadDocument;
