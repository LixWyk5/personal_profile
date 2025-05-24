import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePreloader } from "../hooks/usePreloader";
import { scrollToElement } from "../utils/scrollUtils";

const SmoothScroll = ({ children, isInsideModal = false }) => {
  const { isLoading } = usePreloader();
  const scrollRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");

      if (href && (href.startsWith("#") || href.startsWith("/#"))) {
        e.preventDefault();
        const id = href.includes("#") ? href.split("#")[1] : href.substring(1);
        if (id) {
          scrollToElement(id);
        }
      }
    };

    const handleInitialHash = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        setTimeout(() => {
          scrollToElement(id);
        }, 100);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    handleInitialHash();

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, [isLoading, isInsideModal]);

  return (
    <div
      ref={scrollRef}
      className={`${isInsideModal ? "" : "h-screen"} scroll-smooth`}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
