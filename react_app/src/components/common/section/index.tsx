import { ReactNode } from "react";
import classNames from "classnames";
import "./style.scss";

interface SectionProps {
  children?: ReactNode;
  id?: string;
  className?: string;
  title?: string;
  background?: string;
}

function Section({ children, id, className, title, background }: SectionProps) {
  const sectionClasses = classNames("section", className, {
    [background]: background,
  });

  return (
    <div id={id || ""} className={sectionClasses}>
      <div className="content">
        {title && (
          <div className="section-title">
            <h2>{title}</h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default Section;
