import { Session } from "@supabase/supabase-js";
import {
    FindPlayerResponse,
    PlayerCompleProfileRequest,
    PlayerCompleProfileResponse,
    PlayerGetProfileResponse,
    SearchPlayerResponse,
} from "./Player";

export interface PlayerRepositoryI {
    completeProfile: (request: PlayerCompleProfileRequest) => Promise<PlayerCompleProfileResponse>;
    getProfile: (userSession: Session) => Promise<PlayerGetProfileResponse>;
    find: (id: string, columns: string[]) => Promise<FindPlayerResponse>;
    search: (query: string, id: string) => Promise<SearchPlayerResponse>;
}
