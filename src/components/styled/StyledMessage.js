import {Message} from '../Message';
import styled from 'styled-components';

export const StyledMessage = styled(Message)`
    display: flex;
    margin: 2px 10px;
    .info{
        label:nth-child(1) {
            font-size: 12pt;
            font-family: 'Courier New', Courier, monospace;
            font-style: italic;
            font-weight: bold;
        }
    }
    .text{
        margin-left: 5px;
        padding: 0 10px;
        min-width: 5em;
        font-family: sans-serif;
        border: 2px solid black;
        border-radius: 10px;
        justify-self: center;
        

    }

`