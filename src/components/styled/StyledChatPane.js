import styled from 'styled-components';
import {ChatPane} from '../ChatPane';

export const StyledChatPane = styled(ChatPane)`
    margin: auto;
    .message-list {
        overflow-y: scroll;
        height: 90%;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid white;
    }

`