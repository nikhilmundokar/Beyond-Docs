import "./style.scss";
import Filters from "./filters";
import React, { useState } from "react";
import Section from "../common/section";
import Showcase from "./showcase";
import blockchainThumbnail from "../../images/441.jpg";

interface Project {
  id: number;
  name: string;
  tags: string[];
  media: {
    thumbnail: string;
  };
}

const projectsData: Project[] = [
  {
    id: 1,
    name: "Block Chain",
    tags: ["technologies"],
    media: {
      thumbnail: blockchainThumbnail,
    },
  },
  {
    id: 2,
    name: "React JS",
    tags: ["technologies"],
    media: {
      thumbnail: blockchainThumbnail,
    },
  },
  {
    id: 3,
    name: "Document Storage",
    tags: ["services"],
    media: {
      thumbnail: blockchainThumbnail,
    },
  },
  {
    id: 4,
    name: "Security",
    tags: ["security"],
    media: {
      thumbnail: blockchainThumbnail,
    },
  },
  {
    id: 5,
    name: "How to upload documents?",
    tags: ["web-app", "web-page"],
    media: {
      thumbnail: blockchainThumbnail,
    },
  },
  {
    id: 6,
    name: "Dashboard",
    tags: ["web-app", "mobile-app"],
    media: {
      thumbnail: blockchainThumbnail,
    },
  },
  {
    id: 7,
    name: "Dashboard",
    tags: ["technologies", "mobile-app"],
    media: {
      thumbnail: blockchainThumbnail,
    },
  },
  {
    id: 8,
    name: "Dashboard",
    tags: ["technologies", "mobile-app"],
    media: {
      thumbnail: blockchainThumbnail,
    },
  },
];

const About: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [transition, setTransition] = useState<boolean | string>(false);

  const filterProjects = (tag: string) => {
    setTransition("zoomout");

    setTimeout(() => {
      if (tag !== "all") {
        const filteredProjects = projectsData.filter((f) =>
          f.tags.includes(tag)
        );
        setProjects(filteredProjects);
      } else {
        setProjects(projectsData);
      }
      setTransition("zoomin");
    }, 200);

    setTimeout(() => {
      setTransition(false);
    }, 600);
  };

  return (
    <Section id="about" title="About Beyond Docs" background="white">
      <div className="About-content-wrapper">
        <Filters filterProjects={(tag: string) => filterProjects(tag)} />
        <Showcase data={projects} transition={transition} />
      </div>
    </Section>
  );
};

export default About;
