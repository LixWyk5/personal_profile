import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORK_EXPERIENCE } from "../data/work";
import { useTheme } from "./theme/ThemeProvider";
import { cn } from "../utils/utils";
import { usePreloader } from "../hooks/usePreloader";

const WorkExperience = ({ inMobileHero = false }) => {
  const { theme } = useTheme();
  const { isLoading } = usePreloader();
  const [selectedWork, setSelectedWork] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const dockerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

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

  // 检测移动端和描述展开状态
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    // 监听名字点击事件，检测描述是否展开
    const handleDescriptionToggle = (event) => {
      if (event.detail && event.detail.type === 'description_toggle') {
        setDescriptionExpanded(event.detail.expanded);
      }
    };
    
    window.addEventListener('custom_event', handleDescriptionToggle);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('custom_event', handleDescriptionToggle);
    };
  }, []);

  const handleWheel = (e) => {
    if (dockerRef.current) {
      e.preventDefault();
      dockerRef.current.scrollLeft += e.deltaY;
    }
  };

  // 计算组件在移动端的位置
  const getTopPosition = () => {
    if (isMobile) {
      // 如果是移动端且描述展开，增加顶部距离避免被覆盖
      return descriptionExpanded 
        ? "top-[640px] sm:top-[560px] md:top-[250px]" 
        : "top-[500px] sm:top-[400px] md:top-[250px]";
    }
    return "top-[500px] sm:top-[400px] md:top-[250px]";
  };

  // 如果是在移动端Hero组件中，使用非绝对定位的样式
  if (inMobileHero) {
    return (
      <motion.div
        className="w-full h-[60px] flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
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
                  onClick={() => setSelectedWork(selectedWork?.name === item.name ? null : item)}
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
  }

  // 原始的绝对定位版本（PC端）
  return (
    <motion.div
      className={`absolute right-10 ${getTopPosition()} w-[calc(100%-20px)] md:right-10 md:w-[calc(100%-250px)] xl:right-20 xl:w-[600px] h-[60px] z-10 flex`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <h3 className="absolute top-[-40px] left-10 text-lg font-medium text-foreground">
        Work Experience
      </h3>

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
                onClick={() => setSelectedWork(selectedWork?.name === item.name ? null : item)}
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
