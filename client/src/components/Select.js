import styled from "styled-components";

export const StyledSelect = styled.select`
  background-color: #c3c3c3;  /* Primary color */
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  text-transform: uppercase; /* Material UI selects are typically uppercase */
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  width: 200px; /* Set a width for the select box */
  
  &:hover {
    background-color: #adadad; /* Darker shade on hover */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adding subtle shadow on hover */
  }

  &:focus {
    outline: none;
    background-color: #9e9e9e; /* Slightly darker background when focused */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Focus shadow */
  }

  &:disabled {
    background-color: #e0e0e0; /* Light gray when disabled */
    color: #9e9e9e;
    cursor: not-allowed;
  }

  option {
    background-color: #c3c3c3;
  }

  /* Add some padding for the options */
  option:disabled {
    background-color: #e0e0e0; /* Disabled options */
    //color: #9e9e9e;
  }
`;