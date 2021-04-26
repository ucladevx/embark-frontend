import React, { useState, useEffect, useRef } from "react";
import {
  DropDownBox,
  DropDownTitle,
  DropDownContent,
  DropDownCheckBox,
  Finished,
} from "./StyleDropdown";
import DropdownArrow from "../../images/DropdownArrow.png";
import { Typography } from "@material-ui/core";
import useClickOut from "./ClickoutHook";
import checked from "../../images/checked_24px.png";
import unchecked from "../../images/unchecked_24px.png";

const MultiDropDown = ({
  title,
  ttwd,
  cwd,
  chg,
  bwd,
  bhg,
  fwd,
  fhg,
  open,
  options,
  onSelect,
  onOpenClose,
  selectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef();

  useEffect(() => setIsOpen(open), [open]);
  useEffect(() => setSelected(selectedOptions), [selectedOptions]);

  useClickOut(dropdownRef, isOpen, setIsOpen, onOpenClose);

  return (
    <div style={{ width: ttwd }} ref={dropdownRef}>
      <DropDownTitle onClick={onOpenClose}>
        <Typography style={{ display: "inline" }}>{title}</Typography>
        <img src={DropdownArrow} style={{ float: "right" }} alt="arrow"></img>
      </DropDownTitle>
      {isOpen && (
        <DropDownBox wd={bwd} hg={bhg}>
          <DropDownContent wd={cwd} hg={chg} overflow={"scroll"}>
            {options.map((c) => (
              <div
                key={c}
                style={{
                  paddingLeft: "19px",
                  height: "25px",
                  marginTop: "14px",
                  marginBottom: "14px",
                }}
              >
                <DropDownCheckBox
                  onClick={() => onSelect(c)}
                  src={selected && selected.includes(c) ? checked : unchecked}
                ></DropDownCheckBox>
                <Typography
                  style={{
                    fontSize: "18px",
                    marginLeft: "3px",
                    padding: "0px",
                    display: "inline",
                  }}
                >
                  {c}
                </Typography>
              </div>
            ))}
          </DropDownContent>
          <Finished wd={fwd} hg={fhg} onClick={onOpenClose}>
            Finished
          </Finished>
        </DropDownBox>
      )}
    </div>
  );
};

export default MultiDropDown;
