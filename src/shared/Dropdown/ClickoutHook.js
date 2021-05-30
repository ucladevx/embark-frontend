import React, { useEffect } from "react";

const useClickOut = (dropdownRef, isOpen, setIsOpen, onOpenClose) => {
  useEffect(() => {
    const clickOut = (e) => {
      if (isOpen) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          console.log("run");
          setIsOpen(false);
          if (onOpenClose) onOpenClose();
        }
      }
    };
    document.addEventListener("mousedown", clickOut);
    return () => {
      document.removeEventListener("mousedown", clickOut);
    };
  }, [isOpen, onOpenClose, setIsOpen, dropdownRef]);
};

export default useClickOut;
