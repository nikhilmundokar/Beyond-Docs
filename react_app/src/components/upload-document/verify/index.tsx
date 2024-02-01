import React, { useState, ChangeEvent } from 'react';
import CryptoJS from 'crypto-js';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react';

interface VerifySignatureProps {
  onSignatureValidation: (isValid: boolean) => void;
}

const VerifySignature: React.FC<VerifySignatureProps> = ({ onSignatureValidation }) => {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const handleDocumentFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setDocumentFile(selectedFile);
  };

  const handleSignatureFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setSignatureFile(selectedFile);
  };

  const verifySignature = async () => {
    if (documentFile && signatureFile) {
      try {
        const documentContent = await readFileContent(documentFile);
        const signatureContent = await readFileContent(signatureFile);

        // Assuming signature file content is a hash, you may need to adapt this based on your use case
        const calculatedSignature = CryptoJS.SHA256(documentContent).toString();

        // Compare the calculated signature with the provided signature
        const isValid = calculatedSignature === signatureContent;

        // Notify the parent component about the validation status
        onSignatureValidation(isValid);
      } catch (error) {
        console.error('Error reading or validating files:', error);
      }
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        resolve(content);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <CContainer className="verify-signature-container">
      <CRow className="justify-content-center">
        <CCol md="6">
          <CCard>
            <CCardBody>
              <h1 className="text-center mb-4">Verify Digital Signature</h1>
              <div className="mb-2">
                <label className="form-label">Upload Document or File</label>
                <input
                  type="file"
                  onChange={handleDocumentFileChange}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Select .dat File for Signature Validation</label>
                <input
                  type="file"
                  onChange={handleSignatureFileChange}
                  accept=".dat"
                  className="form-control"
                />
              </div>
              <CButton color="primary" onClick={verifySignature}>
                Verify Signature
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default VerifySignature;
