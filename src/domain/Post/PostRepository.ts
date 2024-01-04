import { PostRs } from "./Post";

export interface PostRepository {
    create: () => Promise<PostRs>;
    update: (id: number) => Promise<PostRs>;
    delete: (id: number) => Promise<null>;
    find: () => Promise<PostRs[]>;
}
