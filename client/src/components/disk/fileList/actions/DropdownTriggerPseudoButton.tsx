import styled from "styled-components";
import { EllipsisVertical } from "lucide-react";

export const StyledPseudoButton = styled.div`
  background: linear-gradient(
    90deg,
    rgba(65, 65, 65, 0.8197479675463936) 0%,
    rgba(97, 97, 97, 0.3127451664259454) 53%,
    rgba(79, 79, 79, 0.5984594521402311) 100%
  );
  padding: 8px;
  margin: 4px 4px 4px 0;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  color: white; /* White text for contrast */
  cursor: pointer;
  text-transform: uppercase;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none 0;

  &:hover {
    background-color: #575757; /* Lighter dark shade on hover */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow on hover */
  }

  &:disabled {
    background-color: #444444; /* Dark gray when disabled */
    color: #888888; /* Lighter gray text when disabled */
    cursor: not-allowed;
  }
`;

const DropdownTriggerPseudoButton = () => {
  return (
    <StyledPseudoButton className="group/btn ml-auto">
      <EllipsisVertical
        color="#de6e57"
        className="group-hover/btn:scale-125 transition-all duration-75"
      />
    </StyledPseudoButton>
  );
};

export default DropdownTriggerPseudoButton;
