import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SKILLS_BY_CATEGORY,
  SKILL_CATEGORIES,
  CATEGORY_COLORS,
} from "../data/skills";
import { useTheme } from "./theme/ThemeProvider";
import { cn } from "../utils/utils";
import { usePreloader } from "../hooks/usePreloader";

const SkillOrbit = () => {
  const { theme } = useTheme();
  const { isLoading } = usePreloader();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showSectionTooltip, setShowSectionTooltip] = useState(false);
  const containerRef = useRef(null);
  const sectionRefs = useRef({});
  const [currentRowIndex, setCurrentRowIndex] = useState(null);

  const [tooltipPosition, setTooltipPosition] = useState("bottom-right");

  const checkPosition = (e, rowIndex) => {
    const viewportWidth = window.innerWidth;
    const x = e.clientX;
    setCurrentRowIndex(rowIndex);
    if (x > viewportWidth * 0.7) {
      setTooltipPosition("bottom-left");
    } else {
      setTooltipPosition("bottom-right");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleCategoryClick = (category) => {
    const target = sectionRefs.current[category];
    if (target && containerRef.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const scrollOffset =
        targetTop - containerTop + containerRef.current.scrollTop - 10;
      containerRef.current.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }
  };

  const chunkSkills = (skills) => {
    const chunks = [];
    for (let i = 0; i < skills.length; i += 10) {
      chunks.push(skills.slice(i, i + 10));
    }
    return chunks;
  };

  return (
    <motion.div
      className="absolute top-[360px] right-10 w-[calc(100%-20px)] md:right-10 md:w-[calc(100%-250px)] xl:right-20 xl:w-[600px] h-[300px] z-10 flex"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onMouseEnter={() => setShowSectionTooltip(true)}
      onMouseLeave={() => setShowSectionTooltip(false)}
    >
      <AnimatePresence>
        {showSectionTooltip && (
          <motion.div
            className="absolute top-[-40px] left-10 bg-background/80 backdrop-blur-md rounded px-3 py-2 border border-foreground/15 z-20 shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm font-medium text-foreground">My Tech Stack</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-6 flex flex-col items-center justify-center gap-4 pt-2">
        {Object.entries(SKILL_CATEGORIES).map(([key, category]) => (
          <div
            key={key}
            className="relative"
            onMouseEnter={() => setSelectedSkill(category)}
            onMouseLeave={() => setSelectedSkill(null)}
          >
            <motion.button
              className="w-3 h-3 rounded-full border border-white/20"
              style={{ backgroundColor: CATEGORY_COLORS[category] }}
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
            <AnimatePresence>
              {selectedSkill === category && (
                <motion.div
                  className="absolute left-5 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-md text-xs rounded px-2 py-1 whitespace-nowrap z-10"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  {category}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        className="scroll-thumb-only flex-1 h-full overflow-y-auto px-4 py-2"
      >
        <div className="flex flex-col gap-6">
          {Object.entries(SKILLS_BY_CATEGORY).map(([category, skills], idx) => {
            const skillRows = chunkSkills(skills);

            return (
              <div
                key={category}
                ref={(el) => (sectionRefs.current[category] = el)}
                className="flex flex-col gap-2"
              >
                {skillRows.map((row, rowIndex) => (
                  <div
                    key={`${category}-row-${rowIndex}`}
                    className="flex flex-wrap gap-2"
                  >
                    {row.map((skill, skillIdx) => (
                      <motion.div
                        key={skill.name}
                        onMouseEnter={(e) => {
                          checkPosition(e, rowIndex);
                          setHoveredSkill(skill);
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <motion.div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            "cursor-pointer transition-all duration-150",
                            "bg-background/5"
                          )}
                          style={{ boxShadow: `0 0 8px ${skill.color}20` }}
                          whileHover={{
                            scale: 1.25,
                            y: -5,
                            backgroundColor: `${skill.color}20`,
                            boxShadow: `0 0 12px ${skill.color}40`,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                        >
                          {skill.icon ? (
                            <img
                              src={skill.icon}
                              alt={skill.label}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <div
                              className="w-6 h-6 flex items-center justify-center font-bold text-lg"
                              style={{ color: skill.color }}
                            >
                              {skill.label.substring(0, 1)}
                            </div>
                          )}
                        </motion.div>

                        <AnimatePresence>
                          {hoveredSkill?.name === skill.name && (
                            <motion.div
                              className={cn(
                                "absolute bg-background/80 backdrop-blur-md rounded px-3 py-2 border border-foreground/15 z-20 shadow-lg",
                                "top-0 left-full ml-2"
                              )}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div
                                className="text-sm font-bold mb-1"
                                style={{ color: hoveredSkill.color }}
                              >
                                {hoveredSkill.label}
                              </div>
                              <div className="text-foreground/80 text-xs max-w-[200px] break-words">
                                {hoveredSkill.shortDescription}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                ))}
                {idx < Object.entries(SKILLS_BY_CATEGORY).length - 1 && (
                  <div className="h-px w-full bg-foreground/10 mt-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillOrbit;
