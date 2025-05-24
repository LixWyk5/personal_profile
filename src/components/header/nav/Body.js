import { motion } from "framer-motion";
import styles from "./Body.module.css";
import { blur, translate } from "../anim";
import { useEffect, useState } from "react";
import { cn } from "../../../utils/utils";

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}) {
  const [currentHref, setCurrentHref] = useState("/");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = links
      .map((link) => {
        if (link.href.includes("#")) {
          const id = link.href.includes("/#")
            ? link.href.split("/#")[1]
            : link.href.split("#")[1];
          return id;
        }
        return null;
      })
      .filter(Boolean);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
          setCurrentHref(`/#${section}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始检查

    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  const getChars = (word) => {
    let chars = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="pointer-events-none"
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={cn(styles.body, "flex flex-col items-end md:flex-row")}>
      {links.map((link, index) => {
        const { title, href, target } = link;
        const isActive = href === currentHref;

        return (
          <a
            key={`l_${index}`}
            href="javascript:void(0)"
            target={target}
            className="cursor-can-hover rounded-lg"
            onClick={(e) => {
              if (target === "_blank") {
                window.open(href, "_blank");
                return;
              }

              e.preventDefault();
              setIsActive(false);

              if (href && href.includes("#")) {
                let id = href.includes("/#")
                  ? href.split("/#")[1]
                  : href.split("#")[1];
                setTimeout(() => {
                  window.scrollToSection(id);
                  setCurrentHref(href);
                }, 300);
              }
            }}
          >
            <motion.p
              className={cn(
                "rounded-lg",
                isActive ? "underline" : "text-muted-foreground"
              )}
              onClick={() => setIsActive(false)}
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </a>
        );
      })}
    </div>
  );
}
