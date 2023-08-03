import styled from "styled-components";

export default function Button({ content }) {
  return <StyledButton>{content}</StyledButton>;
}

const StyledButton = styled.button`
  background: linear-gradient(to right, #A6D1E6 10%, #9e67a3 80%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 250px;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  align-items: center;
  cursor: pointer;
`;