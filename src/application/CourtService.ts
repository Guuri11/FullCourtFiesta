import { CourtRs } from "../domain/Court/Court";
import { CourtRepositoryI } from "../domain/Court/CourtRepository";

export type CourtServiceType = {
    find: (
        repository: CourtRepositoryI,
        latitude: number,
        longitude: number,
        radio: number,
    ) => Promise<CourtRs>;
};

export const CourtService: CourtServiceType = {
    find: (
        repository: CourtRepositoryI,
        latitude: number,
        longitude: number,
        radio: number,
    ): Promise<CourtRs> => repository.find(latitude, longitude, radio),
};
