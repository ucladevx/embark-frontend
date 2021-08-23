import { useState, useEffect, useRef } from "react";

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

export const useIndustry = () => {
  const [industries, setIndustries] = useState([]);
  const [openInd, setOpenInd] = useState(false);

  const handleIndustries = (name) => {
    if (industries && industries.includes(name)) {
      const newIndustries = industries.filter((ind) => ind !== name);
      setIndustries(newIndustries);
    } else {
      const newIndustries = [...industries, name];
      setIndustries(newIndustries);
    }
  };

  const handleOpenInd = () => {
    setOpenInd(!openInd);
  };

  return [industries, openInd, handleIndustries, handleOpenInd];
};
