import { Post, PostCreateRq, PostRs } from "./Post";

export interface PostRepositoryI {
    create: (post: PostCreateRq) => Promise<PostRs>;
    update: (post: Partial<Post>) => Promise<PostRs>;
    remove: (id: number) => Promise<PostRs>;
    find: () => Promise<Post[]>;
    findById: (playerId: string) => Promise<Post[]>;
}
