import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: #c3c3c3; /* Primary color */
    padding: 8px 16px;
    margin: 4px;
    font-size: 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    text-transform: uppercase; /* Material UI buttons are typically uppercase */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background-color: #adadad; /* Darker shade on hover */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adding subtle shadow on hover */
    }

    &:disabled {
        background-color: #e0e0e0; /* Light gray when disabled */
        color: #9e9e9e;
        cursor: not-allowed;
    }
`