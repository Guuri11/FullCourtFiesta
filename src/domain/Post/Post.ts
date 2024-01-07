import { Player } from "../Player/Player";

export type Post = {
    id: number;
    player: Player;
    content: string;
    photo: string;
    event: Event;
    created_at: string;
};

export type PostCreateRq = {
    playerId: string;
    content: string;
};

export type PostRs = {
    code: number | string;
    message: string;
    data: Post;
};
