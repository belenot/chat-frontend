import {Message} from '../Message';
import styled from 'styled-components';

export const StyledMessage = styled(Message)`
    display: flex;
    width:90%;
    padding: 5px;
    margin: 10px 10px;
    border: 1px solid black;
    .info{
        width: 20%; 
        border-left: 1px solid black;
    }
    .text{

    }

`