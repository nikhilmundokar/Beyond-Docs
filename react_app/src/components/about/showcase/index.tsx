import React from "react";
import Arrow from "../../common/Arrow";
import "./style.scss";

interface Project {
  id: number;
  name: string;
  media: {
    thumbnail: string;
  };
}

interface ShowcaseProps {
  data: Project[];
  transition: string | boolean;
}

const Showcase: React.FC<ShowcaseProps> = ({ data, transition }) => {
  return (
    <div className="projects-showcase">
      {data.map((project) => (
        <div
          className={`showcase-item ${
            transition === "zoomout"
              ? "zoomOut"
              : transition === "zoomin"
              ? "zoomIn"
              : ""
          }`}
          key={project.id}
        >
          <div className="meta-content">
            <h3>{project.name}</h3>
            <div className="go-to-cta">
              <span className="text">Project Details</span>
              <Arrow />
            </div>
          </div>
          <img src={project.media.thumbnail} alt={project.name} />
        </div>
      ))}
    </div>
  );
};

export default Showcase;
