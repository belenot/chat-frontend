import styled from 'styled-components';
import {OwnedMessage} from '../OwnedMessage';

export const StyledOwnedMessage = styled(OwnedMessage)`
    display: flex;
    flex-direction: row-reverse;
    align-self: flex-end;
    margin: 5px 10px;    
    .text{
        word-break: break-word;
        margin-left: 5px;
        padding: 0 10px;
        min-width: 5em;
        font-family: ${props=>props.theme.text.fontFamily1};
        border: ${props=> '2px solid' + props.theme.border.color} ;
        border-radius: 10px;
        justify-self: center;
        box-shadow: inset 0 0 20px black;
    }
    max-width: 70%;
`