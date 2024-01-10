import { Player } from "../Player/Player";

export type Friendship = {
    player: Player;
    follower: Player;
};

export type FriendshipRq = {
    player: string;
    follower: string;
};

export type FriendshipRs = {
    code: number;
    message: string;
    data: Friendship;
};
