import { Post, PostCreateRq, PostRs } from "../../../../domain/Post/Post";
import { PostRepositoryI } from "../../../../domain/Post/PostRepository";
import { log } from "../../../config/logger";
import { supabase } from "../../supabase";

const create = async (request: PostCreateRq): Promise<PostRs> => {
    const { data, error } = await supabase
        .from("post")
        .insert([{ content: request.content, player_id: request.playerId }])
        .select();

    if (error) {
        log.error(error.message);
        console.log(JSON.stringify(error));

        return { code: error.code, message: error.message, data: null };
    }

    log.success(`User could create a post => ${JSON.stringify(data)}`);
    return { code: 200, message: "", data: data[0] as Post };
};

const update = async (request: Post): Promise<PostRs> => {
    const { data, error } = await supabase
        .from("post")
        .update(request)
        .eq("id", request.id)
        .select();

    if (error) {
        log.error(error.message);
        return { code: error.code, message: error.message, data: null };
    }

    log.success(`User could create a post => ${data}`);
    return { code: 200, message: "", data: data as unknown as Post };
};

const remove = async (id: number): Promise<PostRs> => {
    const { error } = await supabase.from("post").delete().eq("id", id);
    if (error) {
        log.error(error.message);
        return { code: error.code, message: error.message, data: null };
    }
    log.success("User could remove post");
    return { code: 200, message: "", data: null };
};

const find = async (): Promise<Post[]> => {
    let { data: post, error } = await supabase.from("post").select("*");
    if (error) {
        log.error(error.message);
        return [];
    }
    log.info(`User fetching posts 📷 => ${JSON.stringify(post)}`);
    return post;
};

export const PostRepository: PostRepositoryI = {
    create,
    update,
    remove,
    find,
};
