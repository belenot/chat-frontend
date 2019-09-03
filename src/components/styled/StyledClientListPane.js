import styled from 'styled-components';
import {ClientListPane} from '../ClientListPane';

export const StyledClientListPane = styled(ClientListPane)`
    padding: 10px;
    height: 20vh;
    overflow-y: scroll;
    button {
        margin: 0 auto;
        font-family: 'Courier New', Courier, monospace;
        font-size: 12pt;
        color: white;
        background: none;
        border-bottom: 2px solid white;
        border-radius: 0;
        cursor: pointer;
    }
`