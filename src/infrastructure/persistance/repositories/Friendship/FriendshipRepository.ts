import { Friendship, FriendshipRq, FriendshipRs } from "../../../../domain/Friendship/Friendship";
import { FriendshipRepositoryI } from "../../../../domain/Friendship/FriendshipRepository";
import { log } from "../../../config/logger";
import { supabase } from "../../supabase";

const create = async (request: FriendshipRq): Promise<FriendshipRs> => {
    const { data, error } = await supabase
        .from("friendship")
        .insert([{ player_id: request.player, follower_id: request.follower }])
        .select();

    if (error) {
        log.error(error.message);
        log.error(error.hint);
        console.log(JSON.stringify(error));

        return { code: 400, message: error.message, data: null };
    }

    log.success(`User could follow a user => ${JSON.stringify(data)}`);
    return { code: 200, message: "", data: data[0] as Friendship };
};

const remove = async (playerId: string, followerId: string): Promise<FriendshipRs> => {
    const { error } = await supabase
        .from("friendship")
        .delete()
        .eq("player_id", playerId)
        .eq("follower_id", followerId);
    if (error) {
        log.error(error.message);
        log.error(error.hint);
        return { code: 400, message: error.message, data: null };
    }
    log.success("User could remove the friendship");
    return { code: 200, message: "", data: null };
};

const findByPlayerId = async (playerId: string, asAFollower: boolean): Promise<Friendship[]> => {
    let { data: posts, error } = await supabase
        .from("friendship")
        .select(
            `${
                asAFollower
                    ? "player!friendship_follower_id_fkey"
                    : "player!friendship_player_id_fkey"
            }(username, avatar_url, id)`,
        )
        .eq(asAFollower ? "player_id" : "follower_id", playerId);
    if (error) {
        log.error(error.message);
        log.error(error.hint);
        return [];
    }
    log.info(`User fetching friendships 👥 => ${JSON.stringify(posts)}`);
    return posts as unknown as Friendship[];
};

const findByPlayerIdAndFollowerId = async (
    playerId: string,
    followerId: string,
): Promise<boolean> => {
    let { count, error } = await supabase
        .from("friendship")
        .select("*", { count: "exact", head: true })
        .eq("follower_id", followerId)
        .eq("player_id", playerId);

    if (error) {
        log.error(error.message || "Not following");
        log.error(error.hint);
        return false;
    }
    log.info(`User is following 👥 => ${JSON.stringify(count)}`);
    return count > 0;
};

export const FriendshipRepository: FriendshipRepositoryI = {
    create,
    remove,
    findByPlayerId,
    findByPlayerIdAndFollowerId,
};
