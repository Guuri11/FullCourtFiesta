import { Session } from "@supabase/supabase-js";
import {
    PlayerCompleProfileRequest,
    PlayerCompleProfileResponse,
    PlayerGetProfileResponse,
} from "./Player";

export interface PlayerRepositoryI {
    completeProfile: (request: PlayerCompleProfileRequest) => Promise<PlayerCompleProfileResponse>;
    getProfile: (userSession: Session) => Promise<PlayerGetProfileResponse>;
}
