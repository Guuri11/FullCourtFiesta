import { FriendshipRs } from "./Friendship";

export interface FriendshipRepository {
    create: () => Promise<FriendshipRs>;
    update: (id: number) => Promise<FriendshipRs>;
    delete: (id: number) => Promise<null>;
    find: () => Promise<FriendshipRs[]>;
}
