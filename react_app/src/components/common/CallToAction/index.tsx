import React, { MouseEventHandler, ReactNode } from "react";
import "./style.scss";
import Arrow from "../Arrow";

interface CallToActionProps {
  text: string;
  icon?: ReactNode;
  action?: MouseEventHandler<HTMLDivElement>;
}

const CallToAction: React.FC<CallToActionProps> = ({ text, icon, action }) => {
  return (
    <div className="call-to-action" onClick={action}>
      <span className="text">{text}</span>
      {icon ? <div className="icon">{icon}</div> : <Arrow />}
    </div>
  );
};

export default CallToAction;
