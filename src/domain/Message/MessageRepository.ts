import { Message, MessageRs } from "./Message";

export interface MessageRepositoryI {
    find: (senderId: string, receiverId: string) => Promise<MessageRs>;
    create: (message: Message) => Promise<MessageRs>;
}
