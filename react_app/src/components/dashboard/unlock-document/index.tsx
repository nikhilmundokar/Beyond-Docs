import React from "react";
import "./style.scss";
import preview from "../../../images/document_preview.png";
import CallToAction from "../../common/calltoaction";
function UnlockedDocument() {
  return (
    <>
      <div className="main-content">
        <div className="header">
          <div className="title">Document Name</div>
          <div className="options">
            <CallToAction text="Download" />
            <CallToAction text="Share" />
            <CallToAction text="Print" />
          </div>
        </div>

        <div className="document-preview">
          <div className="document-img">
            <img src={preview} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default UnlockedDocument;
