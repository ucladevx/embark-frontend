import React from "react";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import styled from "styled-components";

const FileUpload = ({handleFileInput}) => {
  const InputWrapper = styled.div`
    display: none;
  `;

  const activate = () =>{

  }

    return (
      <div className="App">
        <form id = "myForm">
               <label htmlFor="my_file">
                 <LinkIcon
                    onClick = {activate}
                 />
                 <InputWrapper>
                    <input
                      type="file"
                      id="my_file"
                      onChange={e => handleFileInput(e)}
                      accept=".pdf,.docx,.svg,.xls"
                    />
                  </InputWrapper>
              </label>
        </form>

      </div>
    );
};

export default FileUpload;