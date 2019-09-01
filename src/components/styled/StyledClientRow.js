import styled from 'styled-components';
import {ClientRow} from '../ClientRow';

export const StyledClientRow = styled(ClientRow)`
    color: ${props => props.client.online?'black':'gray'};
    background-color: ${props => props.client.online?'rgba(0,255,0,0.1)':'rgba(255,0,0,0.1)'};
    padding-left: 1rem;
`