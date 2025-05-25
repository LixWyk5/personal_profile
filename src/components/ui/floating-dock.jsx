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
  const [clickedIndex, setClickedIndex] = useState(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测是否为移动设备
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    items.forEach((item) => {
      const key = item.toLowerCase();
      if (!iconColors[key]) {
        iconColors[key] = generateVibrantColor();
      }
    });

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [items]);

  const handleItemClick = (index) => {
    // 在移动设备上，点击切换显示/隐藏工具提示
    if (isMobile) {
      if (clickedIndex === index) {
        setClickedIndex(null);
      } else {
        setClickedIndex(index);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex gap-2 md:gap-4 mx-auto h-16 items-end rounded-2xl px-4 pb-3 ${className}`}
    >
      {items.map((item, index) => {
        const key = item.toLowerCase();
        const iconInfo = ICON_MAP[key] || { icon: BsCodeSlash, label: item };
        const Icon = iconInfo.icon;
        const color = iconColors[key] || generateVibrantColor();
        
        // 显示工具提示的条件：PC上悬停或移动端点击
        const showTooltip = hoveredIndex === index || clickedIndex === index;

        return (
          <div
            key={item}
            className="relative aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center"
            style={{
              width: "40px",
              height: "40px",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleItemClick(index)}
          >
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 text-xs whitespace-nowrap z-10">
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
