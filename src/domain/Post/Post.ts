import { Player } from "../Player/Player";

export type Post = {
    id: number;
    player: Player;
    content: string;
    photo: string;
    likes: number;
    event: Event;
    createdAt: string;
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
