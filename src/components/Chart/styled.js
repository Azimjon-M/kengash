import styled from "styled-components";

export const ChartBox = styled.div `
    width: ${props => props.width}%;
    height: auto;
    background-color: ${props => props.color};
    color: black;
    text-shadow: 0 0 10px white;
    text-align: center;
    font-weight: 600;
`