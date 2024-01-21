import { Message, MessageRs } from "../../../../domain/Message/Message";
import { MessageRepositoryI } from "../../../../domain/Message/MessageRepository";
import { log } from "../../../config/logger";
import { supabase } from "../../supabase";

const create = async (request: Message): Promise<MessageRs> => {
    const { error } = await supabase
        .from("message")
        .insert([
            {
                content: request.content,
                receiver_id: request.receiver.id,
                sender_id: request.sender.id,
            },
        ])
        .select();

    if (error) {
        log.error(error.message);
        log.error(error.hint);

        return { code: 400, message: error.message, data: null };
    }

    log.success(`User could create message =>`);
    return { code: 200, message: "", data: [] };
};

const find = async (senderId: string, receiverId: string): Promise<MessageRs> => {
    let { data: chats, error } = await supabase
        .from("message")
        .select("*")
        .or(`sender_id.in.(${senderId},${receiverId})`)
        .or(`receiver_id.in.(${senderId},${receiverId})`)
        .order("id", { ascending: false });
    if (error) {
        log.error(error.message);
        return { code: 400, message: error.message, data: null };
    }
    log.info(`User fetching chat messages`);
    return { code: 200, message: "", data: chats as unknown as Message[] };
};

export const MessageRepository: MessageRepositoryI = {
    create,
    find,
};
