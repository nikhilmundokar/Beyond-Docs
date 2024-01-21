import React, { ReactNode } from "react";
import "./style.scss";
import { IconType } from "react-icons";

interface SocialIconProps {
  icon: IconType;
  color: string;
  link: string;
}

function SocialIcon({ icon: Icon, color, link }: SocialIconProps) {
  return (
    <div
      className="social-icon"
      style={{ backgroundColor: color }}
      onClick={() => window.open(link, "_blank")}
    >
      <Icon />
    </div>
  );
}

export default SocialIcon;
