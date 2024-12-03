import styled from "styled-components";

export const StyledSelect = styled.select`
    background-color: #414141; /* Dark primary color */
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    color: #fff; /* Light text color for contrast */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
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