import { Player } from "../Player/Player";

export type Friendship = {
    id: number;
    player: Player;
    follower: Player;
};

export type FriendshipRs = {
    code: number;
    message: string;
    data: Friendship;
};
