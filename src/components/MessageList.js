import { OwnMessage } from "./OwnMessage";
import { Message } from "./Message";

export const MessageList = () => (
    <section className="message-list">
        <OwnMessage text="long text very very very very very very long text with cariege return" time="00:01:00"/>
        <Message username="user1" text="long text very very very very very very long text with cariege return long text very very very very very very long text with cariege return" time="00:01:00" />
        <Message username="user1" text="text" time="00:02:00" />
        <Message username="user2" text="text" time="00:03:00" />
    </section>
)