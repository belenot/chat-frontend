import {Message} from '../Message';
import styled from 'styled-components';

export const StyledMessage = styled(Message)`
    display: flex;
    margin: 5px 10px;
    .info{
        label:nth-child(1) {
            font-size: ${props=>props.theme.text.fontSize};
            font-family: ${props=>props.theme.text.fontFamily2};
            font-style: italic;
            font-weight: bold;
        }
    }
    .text{
        word-break: break-word;
        margin-left: 5px;
        padding: 0 10px;
        min-width: 5em;
        font-family: ${props=>props.theme.text.fontFamily1};
        border: ${props=> '2px solid' + props.theme.border.color} ;
        border-radius: 10px;
        justify-self: center;
        box-shadow: inset 0 0 20px darkslateblue;
    }

`