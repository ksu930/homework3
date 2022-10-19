import styled, { css } from "styled-components";

const Button = (props) => {
    return (
      <StButton {...props} >
        {props.children}
      </StButton>
    );
  };
  
  export default Button;

  const StButton = styled.button`
  border: 1px solid gray;
  background-color: #fff;
  height: 46px;
  font-size: 15px;
  border-radius: 8px;
  background-color: ${({ bgColor }) => bgColor};
  margin: ${({margin}) => margin};
  cursor: pointer;

  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 100px;
        `;
      case "medium":
        return css`
          width: 80px;
        `;
      case "small":
        return css`
          width: 100px;
          height: 30px !important;
        `;
      default:
        return css`
          width: 120px;
        `;
    }
  }}
`;