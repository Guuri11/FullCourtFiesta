import { Friendship, FriendshipRq, FriendshipRs } from "./Friendship";

export interface FriendshipRepositoryI {
    create: (request: FriendshipRq) => Promise<FriendshipRs>;
    remove: (playerId: string, followerId: string) => Promise<FriendshipRs>;
    findByPlayerId: (playerId: string, asAFollower: boolean) => Promise<Friendship[]>;
    findByPlayerIdAndFollowerId: (playerId: string, followerId: string) => Promise<boolean>;
}
