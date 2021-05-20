import React, { useState, useEffect, useRef } from "react";

export const useClickOutState = (isOpen) => {
  const [open, setOpen] = useState(isOpen);
  const ref = useRef();

  useEffect(() => {
    const clickOut = (e) => {
      if (open) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log(ref.current);
          setOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", clickOut);
    return () => {
      document.removeEventListener("mousedown", clickOut);
    };
  }, [open]);

  return [open, setOpen, ref];
};
