import styled from "styled-components";

export const EmptyContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5rem;
    gap: 2rem;

    p{
        font-size: 1.5rem;
        font-family: Roboto, sans-serif;
        color: ${props => props.theme['gray-400']};
    }
`
