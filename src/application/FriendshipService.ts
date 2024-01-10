import { Friendship, FriendshipRs, FriendshipRq } from "../domain/Friendship/Friendship";
import { FriendshipRepositoryI } from "../domain/Friendship/FriendshipRepository";

export type FriendshipServiceType = {
    create: (repository: FriendshipRepositoryI, request: FriendshipRq) => Promise<FriendshipRs>;
    remove: (repository: FriendshipRepositoryI, id: number) => Promise<FriendshipRs>;
    findByPlayerId: (
        repository: FriendshipRepositoryI,
        playerId: string,
        asAFollower: boolean,
    ) => Promise<Friendship[]>;
    findByPlayerIdAndFollowerId: (
        repository: FriendshipRepositoryI,
        playerId: string,
        followerId: string,
    ) => Promise<boolean>;
};

export const FriendshipService: FriendshipServiceType = {
    create: (repository: FriendshipRepositoryI, request: FriendshipRq) =>
        repository.create(request),
    remove: (repository: FriendshipRepositoryI, id: number) => repository.remove(id),
    findByPlayerId: (repository: FriendshipRepositoryI, playerId: string, asAFollower: boolean) =>
        repository.findByPlayerId(playerId, asAFollower),
    findByPlayerIdAndFollowerId: (
        repository: FriendshipRepositoryI,
        playerId: string,
        followerId: string,
    ) => repository.findByPlayerIdAndFollowerId(playerId, followerId),
};
