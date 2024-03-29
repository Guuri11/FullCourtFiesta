import { Session } from "@supabase/supabase-js";
import {
    FindPlayerResponse,
    PlayerCompleProfileRequest,
    PlayerCompleProfileResponse,
    PlayerGetProfileResponse,
    SearchPlayerResponse,
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
    find: (
        repository: PlayerRepositoryI,
        id: string,
        columns: string[],
    ) => Promise<FindPlayerResponse>;
    search: (
        repository: PlayerRepositoryI,
        query: string,
        id: string,
    ) => Promise<SearchPlayerResponse>;
};

export const PlayerService: PlayerServiceType = {
    completeProfile: (repository: PlayerRepositoryI, request: PlayerCompleProfileRequest) =>
        repository.completeProfile(request),
    getProfile: (repository: PlayerRepositoryI, userSession: Session) =>
        repository.getProfile(userSession),
    find: (repository: PlayerRepositoryI, id: string, columns: string[]) =>
        repository.find(id, columns),
    search: (repository: PlayerRepositoryI, query: string, id: string) =>
        repository.search(query, id),
};
