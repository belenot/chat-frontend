import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { SendForm } from "./SendForm"

export const Chat = () => (
    <section className="chat">
        <ChatHeader />
        <MessageList />
        <SendForm />
    </section>
)