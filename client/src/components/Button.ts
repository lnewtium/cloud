import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: #414141; /* Dark primary color */
    padding: 8px 16px;
    margin: 4px;
    font-size: 16px;
    border-radius: 4px;
    border: none;
    color: white; /* White text for contrast */
    cursor: pointer;
    text-transform: uppercase;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

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