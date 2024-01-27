import React, { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { useAuth } from "../../utils/context";

interface CallToActionProps {
  text: string;
  to?: string;
  type?: string;
  action?: MouseEventHandler<HTMLDivElement>;
}

const CallToAction: React.FC<CallToActionProps> = ({
  text,
  to,
  type,
  action,
}) => {
  const { login } = useAuth();

  if (to) {
    return (
      <Link to={to} className={`call-to-action ${type ? type : `border`}`}>
        <span className="text">{text}</span>
      </Link>
    );
  }

  return (
    <div
      className={`call-to-action ${type ? type : `border`}`}
      onClick={(event) => {
        login();
        if (action) {
          action(event);
        }
      }}
    >
      <span className="text">{text}</span>
    </div>
  );
};

export default CallToAction;
