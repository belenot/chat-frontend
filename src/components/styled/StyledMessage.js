import {Message} from '../Message';
import styled from 'styled-components';

export const StyledMessage = styled(Message)`
    display: flex;

    padding: 5px;
    margin: 10px 10px;
    .info{
        align-self: center;
        label:nth-child(1) {
            background: black;
            font-size: 14pt;
            font-family: 'Courier New', Courier, monospace;
            font-style: italic;
            font-weight: bold;
            color: white;
            padding: 5px;
            border-radius: 10px;
        }
    }
    .text{
        flex: 1;
        margin-left: 2rem;
        padding-left: 2rem;
        border-bottom: 2px solid black;
    }

`