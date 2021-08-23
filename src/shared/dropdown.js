import styled from "styled-components";
import { colors } from "../shared/config";

export const IndustryFilters = [
  "Medical",
  "Dentistry",
  "Pharmacy",
  "Nursing",
  "Health",
  "Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Tech",
  "Product",
  "Computer Science",
  "Software Development",
  "Product Management",
  "Product Design",
  "UX/UI Design",
  "Design",
  "Consulting",
  "Strategy Operations",
  "Investment Banking",
  "Marketing",
  "Real Estate",
  "Accounting",
  "Corporate Finance",
  "Financial Technology",
  "Commercial Banking",
  "Financial Planning",
  "Private Equity/Venture Capital",
  "Insurance",
  "Hedge Funds",
];

export const DropDownTitle = styled.div`
  align-items: center;
  padding: 7px 15px;
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  border-radius: 10px;
  background-color: #e1dfdf;
  color: ${colors.gray3};
`;

export const DropDownBox = styled.div`
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  top: ${(props) => props.top};
  background: #ffffff;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  z-index: 10;
  position: absolute;
`;

export const DropDownContent = styled.div`
  background-color: ${colors.white};
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  max-height: 202px;
  overflow-y: ${(props) => props.overflow};
  border-radius: 3px;
  ::-webkit-scrollbar {
    width: 7px;
    height: 76px;
    margin-right: 100px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background: ${colors.silver};
  }
`;

export const DropDownCheckBox = styled.img`
  display: inline;
  border: 1px solid #adafb0;
  border-radius: 2px;
  margin-right: 11px;
`;
export const Finished = styled.div`
  display: flex;
  justify-content: "center";
  align-items: center;
  padding-top: 10px;
  padding-left: 122px;
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  background-color: #e1dfdf;
  color: ${colors.gray3};
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.25);
`;
