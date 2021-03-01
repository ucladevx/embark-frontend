import React from "react";
import Link from "@material-ui/icons/Link";
import styled from "styled-components";
import LinkEffect from "../shared/LinkEffect";

const LinkIcon = styled(Link)`
  ${LinkEffect}
`;

const FileUpload = ({ handleFileInput }) => {
  const InputWrapper = styled.div`
    display: none;
  `;

  return (
    <div className="App">
      <form id="myForm">
        <label htmlFor="my_file">
          <LinkIcon />
          <InputWrapper>
            <input
              type="file"
              id="my_file"
              onChange={(e) => handleFileInput(e)}
              accept=".pdf,.docx,.svg,.xls"
            />
          </InputWrapper>
        </label>
      </form>
    </div>
  );
};

export default FileUpload;
