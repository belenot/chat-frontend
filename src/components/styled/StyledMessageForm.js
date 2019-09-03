import {MessageForm} from '../MessageForm';
import styled from 'styled-components';

export const StyledMessageForm = styled(MessageForm)`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    input[type='image'] {
        height: 32px;
        align-self: center;
    }
    input[type='text'] {
        background: none;
        box-shadow: inset 0 0 20px white;
        border: 3px solid white;
        border-radius: 5px;
        align-self: center;
        color: white;
        flex: 9;
        margin: 10px;
        padding: 5px;
        padding-left: 1em;
        :active, :hover, :focus {
            box-shadow: none;
            border-color: white;
            ::placeholder{
                color: gray;
            }
        };
        ::placeholder {
            color: black;
            font-weight: bold;
            font-family: 'Courier New', Courier, monospace;
            text-align: center;
        }
    }
`