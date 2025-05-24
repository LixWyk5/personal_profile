import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const ModalContext = React.createContext(null);

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal component");
  }
  return context;
};

export const ModalTrigger = ({ children, className }) => {
  const { setIsOpen } = useModal();

  return (
    <div onClick={() => setIsOpen(true)} className={className}>
      {children}
    </div>
  );
};

export const ModalBody = ({ children, className = "" }) => {
  const { isOpen, setIsOpen } = useModal();
  const overlayRef = useRef();
  const modalRef = useRef();

  const handleClose = () => setIsOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl max-w-lg w-full ${className}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const ModalContent = ({ children }) => {
  return <div className="mb-6">{children}</div>;
};

export const ModalFooter = ({ children, className = "" }) => {
  const { setIsOpen } = useModal();

  // Inject close function into any child that's a button without an onClick
  const childrenWithClose = React.Children.map(children, (child) => {
    if (
      React.isValidElement(child) &&
      child.type === "button" &&
      !child.props.onClick
    ) {
      return React.cloneElement(child, {
        onClick: () => setIsOpen(false),
      });
    }
    return child;
  });

  return (
    <div className={`mt-4 flex justify-end space-x-2 ${className}`}>
      {childrenWithClose}
    </div>
  );
};
