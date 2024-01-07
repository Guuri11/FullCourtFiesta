import { Session } from "@supabase/supabase-js";
import {
    FindPlayerResponse,
    PlayerCompleProfileRequest,
    PlayerCompleProfileResponse,
    PlayerGetProfileResponse,
} from "./Player";

export interface PlayerRepositoryI {
    completeProfile: (request: PlayerCompleProfileRequest) => Promise<PlayerCompleProfileResponse>;
    getProfile: (userSession: Session) => Promise<PlayerGetProfileResponse>;
    find: (id: string, columns: string[]) => Promise<FindPlayerResponse>;
}
