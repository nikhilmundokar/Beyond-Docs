import React from "react";
import document from "../../../images/digitaldocs.png";
import "./style.scss";

function DocumentPreview({ onClick }) {
  return (
    <>
      <div className="document" onClick={onClick}>
        <div className="document-image">
          <img src={document} alt="document" />
        </div>

        <div className="document-title">Document Title</div>
      </div>
    </>
  );
}

export default DocumentPreview;
