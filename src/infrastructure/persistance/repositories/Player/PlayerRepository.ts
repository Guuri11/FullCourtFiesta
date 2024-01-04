import { Session } from "@supabase/supabase-js";
import {
    Player,
    PlayerCompleProfileRequest,
    PlayerCompleProfileResponse,
    Position,
} from "../../../../domain/Player/Player";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";
import { log } from "../../../config/logger";
import { supabase } from "../../supabase";

const completeProfile = async (
    request: PlayerCompleProfileRequest,
): Promise<PlayerCompleProfileResponse> => {
    if (!request.username || !request.position) {
        return { code: 400, message: "Username and position are required" };
    }

    try {
        const updates = {
            id: request.userId,
            full_name: request.fullName,
            username: request.username,
            bio: request.bio,
            position: request.position,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) {
            log.error(error.message);
            return { code: 500, message: error.details };
        }

        log.success("User could complete his profile! 👏");
        return { code: 200, message: null };
    } catch (error) {
        log.error(error.message);
        return { code: 500, message: error.message };
    }
};

const getProfile = async (userSession: Session) => {
    try {
        if (!userSession.user.id) {
            log.error("There is no user in the session 🕵️");
            return { code: 400, message: "no_user_on_the_session", data: null };
        }

        const { data, error, status } = await supabase
            .from("players")
            .select(`username, position, bio, avatar_url, full_name`)
            .eq("id", userSession.user.id)
            .single();
        if (error && status !== 406) {
            console.log(error, status);

            log.error("User could not get profile data from supabase 😢");
            return { code: 400, message: "could_not_get_user_profile", data: null };
        }

        if (data) {
            const player: Player = {
                id: userSession.user.id,
                email: userSession.user.email,
                username: data.username,
                full_name: data.full_name,
                avatar_url: data.avatar_url,
                bio: data.bio,
                position: data.position as Position,
            };
            log.success(`User could fetch his profile data 📊 ${JSON.stringify(player)}`);
            return { code: 200, message: "", data: player };
        }
    } catch (error) {
        log.error(error.message);
        return { code: 500, message: error.message, data: null };
    }
};

export const PlayerRepository: PlayerRepositoryI = {
    completeProfile,
    getProfile,
};
