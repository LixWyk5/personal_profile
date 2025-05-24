import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORK_EXPERIENCE } from "../data/work";
import { useTheme } from "./theme/ThemeProvider";
import { cn } from "../utils/utils";
import { usePreloader } from "../hooks/usePreloader";

const WorkExperience = () => {
  const { theme } = useTheme();
  const { isLoading } = usePreloader();
  const [selectedWork, setSelectedWork] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showSectionTooltip, setShowSectionTooltip] = useState(false);
  const dockerRef = useRef(null);

  const allWorkItems = Object.entries(WORK_EXPERIENCE).flatMap(
    ([category, items]) => items.map((item) => ({ ...item, category }))
  );

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (dockerRef.current) {
      dockerRef.current.scrollLeft = 0;
    }
  }, [isVisible]);

  const handleWheel = (e) => {
    if (dockerRef.current) {
      e.preventDefault();
      dockerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <motion.div
      className="absolute right-10 top-[250px] w-[calc(100%-20px)] md:right-10 md:w-[calc(100%-250px)] xl:right-20 xl:w-[600px] h-[60px] z-10 flex"
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
            <p className="text-sm font-medium text-foreground">
              My Work Experience
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-6" />

      <div className="relative flex-1 w-full h-full scroll-thumb-only">
        <div
          ref={dockerRef}
          className="h-full w-full flex items-center overflow-x-auto overflow-y-hidden scroll-smooth"
          onWheel={handleWheel}
        >
          <div className="flex items-center gap-2 w-full justify-center">
            {allWorkItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative flex-shrink-0"
                onMouseEnter={() => setSelectedWork(item)}
                onMouseLeave={() => setSelectedWork(null)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    "cursor-pointer transition-all duration-150 mx-1",
                    "bg-background/5"
                  )}
                  style={{
                    boxShadow: `0 0 8px ${item.color}20`,
                  }}
                  whileHover={{
                    scale: 1.25,
                    y: -5,
                    backgroundColor: `${item.color}20`,
                    boxShadow: `0 0 12px ${item.color}40`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                >
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <div
                      className="w-6 h-6 flex items-center justify-center font-bold text-lg"
                      style={{ color: item.color }}
                    >
                      {item.label?.substring(0, 1)}
                    </div>
                  )}
                </motion.div>

                {selectedWork?.name === item.name && (
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-foreground/60 absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    layoutId="indicator"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedWork && (
            <motion.div
              className={cn(
                "absolute -bottom-20 left-1/2 transform -translate-x-1/2",
                "bg-background/30 backdrop-blur-xl rounded-lg p-3 shadow-lg",
                "text-left border border-foreground/15 z-20"
              )}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1 items-start">
                {/* 图标 + 公司名 */}
                <div className="flex items-center gap-2">
                  {selectedWork.icon && (
                    <img
                      src={selectedWork.icon}
                      alt={selectedWork.label}
                      className="w-4 h-4"
                    />
                  )}
                  <span className="text-sm font-bold text-foreground">
                    {selectedWork.company}
                  </span>
                </div>

                {/* Role */}
                <div className="text-xs text-foreground/80 flex items-center gap-1">
                  <span>👨‍💻</span>
                  <span>{selectedWork.role}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WorkExperience;
