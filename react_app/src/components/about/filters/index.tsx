import React, { useState } from "react";

import "./style.scss";

const filtersData = [
  {
    name: "Technologies",
    id: "technologies",
  },
  {
    name: "Services",
    id: "services",
  },
  {
    name: "Security",
    id: "security",
  },
  {
    name: "Web Site",
    id: "web-app",
  },
  {
    name: "Mobile App",
    id: "mobile-app",
  },
];

interface FiltersProps {
  filterProjects: (id: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filterProjects }) => {
  const [active, setActive] = useState<string>("");

  const clickHandler = (id: string) => {
    setActive(id);
    filterProjects(id);
  };

  return (
    <ul className="filters-menu-items">
      {filtersData.map((item) => (
        <li
          key={item.id}
          className={`filter-menu-item ${active === item.id ? "active" : ""}`}
          onClick={() => clickHandler(item.id)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Filters;
