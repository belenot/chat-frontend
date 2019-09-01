import styled from 'styled-components';
import {ChatPane} from '../ChatPane';

export const StyledChatPane = styled(ChatPane)`
    margin: auto;
    .message-list {
        max-height: 50vh;
        overflow-y: scroll;
    }

`