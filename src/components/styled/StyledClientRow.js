import styled from 'styled-components';
import {ClientRow} from '../ClientRow';

export const StyledClientRow = styled(ClientRow)`
    color: ${props => props.client.online?'black':'gray'};
    padding-top: 5px;
    color: white;
    .online-indicator{
        color: ${props => props.client.online?'rgba(0,255,0,0.8)':'rgba(255,0,0,0.8)'};
        border-radius: 20px;
    }
`