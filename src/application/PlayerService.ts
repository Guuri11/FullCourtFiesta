import { Session } from "@supabase/supabase-js";
import {
    PlayerCompleProfileRequest,
    PlayerCompleProfileResponse,
    PlayerGetProfileResponse,
} from "../domain/Player/Player";
import { PlayerRepositoryI } from "../domain/Player/PlayerRepository";

export type PlayerServiceType = {
    completeProfile: (
        repository: PlayerRepositoryI,
        request: PlayerCompleProfileRequest,
    ) => Promise<PlayerCompleProfileResponse>;
    getProfile: (
        repository: PlayerRepositoryI,
        userSession: Session,
    ) => Promise<PlayerGetProfileResponse>;
};

export const PlayerService: PlayerServiceType = {
    completeProfile: (repository: PlayerRepositoryI, request: PlayerCompleProfileRequest) =>
        repository.completeProfile(request),
    getProfile: (repository: PlayerRepositoryI, userSession: Session) =>
        repository.getProfile(userSession),
};
