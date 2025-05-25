import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";
import { opacity, background } from "./anim";
import Nav from "./nav/Nav";
import { cn } from "../../utils/utils";
import { config } from "../../data/config";
import ThemeToggle from "../theme/ThemeToggle";
import { useTheme } from "../theme/ThemeProvider";

const Header = ({ loader = false }) => {
  const [isActive, setIsActive] = useState(false);
  const { theme } = useTheme();

  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in font-sans"
      )}
      style={{
        background: isActive ? "hsl(var(--background) / .8)" : "transparent",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0, // 3.5 for loading, .5 can be added for delay
        duration: 0.8,
      }}
    >
      <div className={cn(styles.bar, "flex items-center justify-between")}>
        <a 
          href={process.env.NODE_ENV === 'production' ? `${process.env.PUBLIC_URL}/` : '/'}
          className="flex items-center justify-center"
        >
          <span className="text-md font-heading hover:text-primary transition-colors">
            {config.author}
          </span>
        </a>

        <div className="flex items-center">
          <ThemeToggle className="w-6 h-6 mr-4" />
          <button
            onClick={() => setIsActive(!isActive)}
            className={cn(
              styles.el,
              "m-0 p-0 h-6 bg-transparent flex items-center justify-center"
            )}
          >
            <div className="relative flex items-center">
              <motion.p
                variants={opacity}
                animate={!isActive ? "open" : "closed"}
                className="text-md font-heading hover:text-primary transition-colors"
              >
                Menu
              </motion.p>
              <motion.p
                variants={opacity}
                animate={isActive ? "open" : "closed"}
                className="font-medium"
              >
                Close
              </motion.p>
            </div>
            <div
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ""
              }`}
            ></div>
          </button>
        </div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
