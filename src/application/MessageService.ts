import { Message, MessageRs } from "../domain/Message/Message";
import { MessageRepositoryI } from "../domain/Message/MessageRepository";

export type MessageServiceType = {
    create: (repository: MessageRepositoryI, request: Message) => Promise<MessageRs>;
    find: (
        repository: MessageRepositoryI,
        senderId: string,
        receiverId: string,
    ) => Promise<MessageRs>;
};

export const MessageService: MessageServiceType = {
    create: (repository: MessageRepositoryI, request: Message) => repository.create(request),
    find: (repository: MessageRepositoryI, senderId: string, receiverId: string) =>
        repository.find(senderId, receiverId),
};
