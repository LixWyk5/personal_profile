import React, { useEffect, useRef, useState } from "react";
import {
  DiPython,
  DiJavascript,
  DiJava,
  DiReact,
  DiMongodb,
  DiMysql,
  DiGit,
  DiLinux,
  DiDocker,
} from "react-icons/di";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGraphql,
  SiExpress,
} from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import { BsCodeSlash } from "react-icons/bs";

const generateVibrantColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 90%, 55%)`;
};

const ICON_MAP = {
  python: { icon: DiPython, label: "Python" },
  javascript: { icon: DiJavascript, label: "JavaScript" },
  typescript: { icon: SiTypescript, label: "TypeScript" },
  java: { icon: DiJava, label: "Java" },
  cpp: { icon: TbBrandCpp, label: "C++" },

  react: { icon: DiReact, label: "React" },
  next: { icon: SiNextdotjs, label: "Next.js" },
  tailwind: { icon: SiTailwindcss, label: "Tailwind" },

  node: { icon: DiJavascript, label: "Node.js" },
  express: { icon: SiExpress, label: "Express" },
  graphql: { icon: SiGraphql, label: "GraphQL" },
  mongodb: { icon: DiMongodb, label: "MongoDB" },
  mysql: { icon: DiMysql, label: "MySQL" },

  git: { icon: DiGit, label: "Git" },
  linux: { icon: DiLinux, label: "Linux" },
  docker: { icon: DiDocker, label: "Docker" },
};

const iconColors = {};

export const FloatingDock = ({ items = [], className = "" }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mouseX, setMouseX] = useState(null);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    items.forEach((item) => {
      const key = item.toLowerCase();
      if (!iconColors[key]) {
        iconColors[key] = generateVibrantColor();
      }
    });

    const handleMouseMove = (e) => {
      if (containerRef.current) {
        setMouseX(e.clientX);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [items]);

  const getItemScale = (index) => {
    if (!mouseX || !itemRefs.current[index]) return 1;

    const item = itemRefs.current[index];
    const rect = item.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - itemCenterX);

    if (distance < 100) {
      return 1 + (1 - distance / 100) * 0.5; // Max scale 1.5x
    }
    return 1;
  };

  return (
    <div
      ref={containerRef}
      className={`flex gap-2 md:gap-4 mx-auto h-16 items-end rounded-2xl px-4 pb-3 ${className}`}
      onMouseLeave={() => setMouseX(null)}
    >
      {items.map((item, index) => {
        const key = item.toLowerCase();
        const iconInfo = ICON_MAP[key] || { icon: BsCodeSlash, label: item };
        const Icon = iconInfo.icon;
        const scale = getItemScale(index);
        const color = iconColors[key] || generateVibrantColor();

        return (
          <div
            key={item}
            ref={(el) => (itemRefs.current[index] = el)}
            className="relative aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center transition-transform duration-200"
            style={{
              transform: `scale(${scale})`,
              width: "40px",
              height: "40px",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            {hoveredIndex === index && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 text-xs whitespace-nowrap">
                {iconInfo.label}
              </div>
            )}

            {/* Icon */}
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon style={{ color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
