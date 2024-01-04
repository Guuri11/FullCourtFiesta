import { Player } from "../Player/Player";

export type Post = {
    id: number;
    player: Player;
    photo: string;
    likes: number;
    event: Event;
    createdAt: string;
};

export type PostRs = {
    code: number;
    message: string;
    data: Post;
};
