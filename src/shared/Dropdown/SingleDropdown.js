import React, { useState, useRef, useEffect } from "react";
import { DropDownBox, DropDownTitle, DropDownContent } from "./StyleDropdown";
import DropdownArrow from "../../images/DropdownArrow.png";
import { MenuItem, Typography } from "@material-ui/core";
import useClickOut from "./ClickoutHook";

const SingleDropdown = ({
  title,
  ttwd,
  cwd,
  chg,
  bwd,
  bhg,
  open,
  content,
  onSelect,
  onOpenClose,
  ...other
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const multiRef = useRef();
  useEffect(() => setIsOpen(open), [open]);
  useClickOut(multiRef, isOpen, setIsOpen, onOpenClose);

  return (
    <div ref={multiRef} style={{ width: ttwd }} {...other}>
      <DropDownTitle
        wd={ttwd}
        onClick={() => onOpenClose()}
        style={{ marginBottom: ".1em" }}
      >
        {title}
        <img src={DropdownArrow} style={{ float: "right" }} alt="arrow"></img>
      </DropDownTitle>
      {isOpen && (
        <DropDownBox wd={bwd} hg={bhg}>
          <DropDownContent wd={cwd} hg={chg}>
            {content.map((c) => (
              <MenuItem onClick={() => onSelect(c)} key={c}>
                <Typography
                  style={{
                    fontSize: "16px",
                    marginLeft: "3px",
                    padding: "0px",
                    align: "center",
                    display: "inline",
                  }}
                >
                  {c}
                </Typography>
              </MenuItem>
            ))}
          </DropDownContent>
        </DropDownBox>
      )}
    </div>
  );
};

export default SingleDropdown;
