import styled from "styled-components";

export const StyledSelect = styled.select`
  background: linear-gradient(
    90deg,
    rgba(65, 65, 65, 0.8197479675463936) 0%,
    rgba(97, 97, 97, 0.3127451664259454) 53%,
    rgba(79, 79, 79, 0.5984594521402311) 100%
  );
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
  outline: none;
  user-select: none;

  &:hover {
    background-color: #575757; /* Darker shade on hover */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #666; /* Disabled state in dark mode */
    color: #999; /* Lighter text for disabled state */
    cursor: not-allowed;
  }

  option {
    background-color: #434343; /* Match the select box */
    color: #fff; /* Option text color */
  }

  /* Disabled options */

  option:disabled {
    background-color: #444; /* Darker background for disabled options */
    color: #999; /* Lighter color for disabled options */
  }
`;
