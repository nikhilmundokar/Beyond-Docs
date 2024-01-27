import React, { useRef, useState } from "react";
import "./style.scss";
import CallToAction from "../common/calltoaction";
import { FaDownload } from "react-icons/fa";

function UploadDocument() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Simulating file upload:", selectedFile.name);
      // You can add logic here to simulate an actual file upload process
      // For example, you can make an API call to a mock server
      // and handle the file upload on the server side
    } else {
      console.log("No file selected for upload.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <>
      <div className="main-content">
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
        <div className="ctas">
          <CallToAction text="Browse" type="fill" action={handleBrowseClick} />
          <CallToAction
            text="Upload"
            type="border"
            to="dashboard"
            action={handleUpload}
          />
        </div>
      </div>
    </>
  );
}

export default UploadDocument;
