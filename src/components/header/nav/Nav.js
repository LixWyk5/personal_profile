import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Nav.module.css";
import { height } from "../anim";
import Body from "./Body";
import { links } from "../config";
import { cn } from "../../../utils/utils";

export default function Nav({ setIsActive }) {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
    >
      <div className={cn(styles.wrapper, "flex justify-end sm:justify-start")}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setIsActive={setIsActive}
          />
        </div>
      </div>
    </motion.div>
  );
}
