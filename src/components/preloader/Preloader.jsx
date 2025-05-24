import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PreloaderProvider, usePreloader } from "../../hooks/usePreloader";
import Loader from "./Loader";

const PreloaderContent = ({ children }) => {
  const { isLoading } = usePreloader();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </div>
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
    </>
  );
};

const Preloader = ({ children }) => {
  return (
    <PreloaderProvider>
      <PreloaderContent>{children}</PreloaderContent>
    </PreloaderProvider>
  );
};

export default Preloader;
