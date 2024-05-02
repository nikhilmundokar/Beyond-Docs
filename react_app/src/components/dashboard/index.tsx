import React from "react";
import { useState } from "react";
import "./style.scss";
import DocumentPreview from "./document-preview";
import qrCode from "../../images/qr_code.jpg";
import { MdOutlineClose } from "react-icons/md";
import { FaLockOpen, FaUnlock } from "react-icons/fa";
import { Link } from "react-router-dom";

function Dashboard() {
  const [unlockDocument, setUnlockDocument] = useState(false);

  const handleDocumentPreview = () => {
    setUnlockDocument(true);
  };

  const handleCloseManualField = () => {
    setUnlockDocument(false);
  };

  const [unlockSuccess, setUnlockSuccess] = useState(false);

  const handleUnlockSuccess = () => {
    setUnlockSuccess(true);
  };

  return (
    <div className="main-content">
      {unlockDocument && (
        <div
          className="opac-layer"
          onClick={() => setUnlockDocument(false)}
        ></div>
      )}
      <div className="title">Dashboard</div>
      <div className="documents">
        <DocumentPreview onClick={handleDocumentPreview} />
        <DocumentPreview onClick={handleDocumentPreview} />
        <DocumentPreview onClick={handleDocumentPreview} />
        <DocumentPreview onClick={handleDocumentPreview} />
        <DocumentPreview onClick={handleDocumentPreview} />
      </div>
      {unlockDocument && (
        <div className="unlock-document">
          <div className="unlock-overlay">
            <div className="close-button" onClick={handleCloseManualField}>
              <MdOutlineClose />
            </div>

            <img src={qrCode} alt="" />

            <p>
              Scan the qr with your phone or enter the ipfs hash below to access
            </p>

            <div className="unlock-options">
              <input type="text" placeholder="Enter hash code" />

              <Link to="/unlockeddocument" className="cta-link">
                <div className="unlock-button">
                  Unlock <FaLockOpen />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
