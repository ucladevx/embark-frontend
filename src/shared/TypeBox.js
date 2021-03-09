import styled from "styled-components";

export default styled.input`
  background: #f0f3f6;
  border-radius: 8px;
  padding-left: 10px;
  color: #9e9ea6;
  height: 38px;
  border: ${(props) => (props.error ? "1px solid #FFADAD" : 0)};
  &:focus {
    border: 1px solid #5473bb;
    box-sizing: border-box;
  }
`;
