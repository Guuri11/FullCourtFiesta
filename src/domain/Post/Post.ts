import { Player } from "../Player/Player";

export type PostRs = {
    id: string;
    player: Player;
    photo: string;
    likes: number;
    event: Event;
    createdAt: string;
};
