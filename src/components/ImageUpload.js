import React from "react";
import Image from "@material-ui/icons/Image";
import styled from "styled-components";
import LinkEffect from "../shared/LinkEffect";

const ImageIcon = styled(Image)`
  ${LinkEffect}
`;

const ImageUpload = ({ handleImageInput }) => {
  const InputWrapper = styled.div`
    display: none;
  `;

  return (
    <div className="App">
      <form id="myImgForm">
        <label htmlFor="my_image">
          <ImageIcon />
          <InputWrapper>
            <input
              type="file"
              id="my_image"
              onChange={(e) => handleImageInput(e)}
              accept=".png,.jpeg,.gif,.bmp"
            />
          </InputWrapper>
        </label>
      </form>
    </div>
  );
};

export default ImageUpload;
