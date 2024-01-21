import { Player } from "../Player/Player";

export type Message = {
    id: number;
    content: string;
    sender: Player;
    receiver: Player;
};

export type MessageRs = {
    code: number;
    message: string;
    data: Message[];
};
