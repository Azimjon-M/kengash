import styled from "styled-components";

export const ChartBox = styled.div `
    width: ${props => props.width}%;
    height: auto;
    background-color: ${props => props.color};
    text-align: center;
    color: ${props => props.txtColor ? 'white' : 'black'};
    font-weight: 600;
`