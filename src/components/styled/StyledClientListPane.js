import styled from 'styled-components';
import {ClientListPane} from '../ClientListPane';

export const StyledClientListPane = styled(ClientListPane)`
    max-height: 20vh;
    overflow-y: scroll;
    button {
        font-family: 'Courier New', Courier, monospace;
        font-size: 12pt;
        color: gray;
        background: none;

    }
`