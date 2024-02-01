import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import VerifySignature from "../verify";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
  CAlert, // Import CAlert from CoreUI
} from "@coreui/react";

const RetrieveFileFromIPFS: React.FC = () => {
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const [isSignatureValid, setIsSignatureValid] = useState<boolean>(false);

  const handleHashChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIpfsHash(e.target.value);
    // Reset signature validation on IPFS hash change
    setIsSignatureValid(false);
  };

  const handleSignatureValidation = (isValid: boolean) => {
    setIsSignatureValid(isValid);
  };

  const downloadFile = async () => {
    if (isSignatureValid) {
      try {
        const response = await axios.get(
          `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
          {
            responseType: "arraybuffer", // Specify response type as arraybuffer
          }
        );

        const contentDisposition = response.headers["content-disposition"];
        const fileNameMatch =
          contentDisposition &&
          contentDisposition.match(/filename="(.+)"(?:;|$)/);
        const fileName = fileNameMatch ? fileNameMatch[1] : "downloadedFile";

        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    } else {
      console.error("Signature is not valid. File download aborted.");
    }
  };

  return (
    <div className="main-content">
      <CContainer className="retrieve-file-container">
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCard>
              <CCardBody>
                <h1 className="text-center mb-4">Retrieve File from IPFS</h1>
                <input
                  type="text"
                  placeholder="Enter IPFS Hash"
                  onChange={handleHashChange}
                  className="form-control mb-2"
                />
                <CButton color="primary" onClick={downloadFile}>
                  Download File
                </CButton>

                {/* Include the VerifySignature component and pass handleSignatureValidation */}
                <VerifySignature
                  onSignatureValidation={handleSignatureValidation}
                />

                {isSignatureValid && (
                  <CAlert color="success" className="mt-2">
                    Signature is valid! File download is allowed.
                  </CAlert>
                )}
                {!isSignatureValid && (
                  <CAlert color="danger" className="mt-2">
                    Signature is not valid. Please verify the signature before
                    downloading the file.
                  </CAlert>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default RetrieveFileFromIPFS;
