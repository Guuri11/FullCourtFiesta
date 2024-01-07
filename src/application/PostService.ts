import { Post, PostCreateRq, PostRs } from "../domain/Post/Post";
import { PostRepositoryI } from "../domain/Post/PostRepository";

export type PostServiceType = {
    create: (repository: PostRepositoryI, request: PostCreateRq) => Promise<PostRs>;
    remove: (repository: PostRepositoryI, id: number) => Promise<PostRs>;
    find: (repository: PostRepositoryI) => Promise<Post[]>;
    update: (repository: PostRepositoryI, request: Partial<Post>) => Promise<PostRs>;
};

export const PostService: PostServiceType = {
    create: (repository: PostRepositoryI, request: PostCreateRq) => repository.create(request),
    remove: (repository: PostRepositoryI, id: number) => repository.remove(id),
    find: (repository: PostRepositoryI) => repository.find(),
    update: (repository: PostRepositoryI, request: Partial<Post>) => repository.update(request),
};
