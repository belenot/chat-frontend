import {MessageForm} from '../MessageForm';
import styled from 'styled-components';

export const StyledMessageForm = styled(MessageForm)`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    input {
        background: none;
    }
    input[type='text'] {
        flex: 9;
        margin: 10px;
        padding: 5px;
        padding-left: 1em;
    }
`