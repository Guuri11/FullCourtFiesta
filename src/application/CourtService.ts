import { Court, CourtRs, CourtCreateRs } from "../domain/Court/Court";
import { CourtRepositoryI } from "../domain/Court/CourtRepository";

export type CourtServiceType = {
    find: (
        repository: CourtRepositoryI,
        latitude: number,
        longitude: number,
        radio: number,
    ) => Promise<CourtRs>;
    create: (repository: CourtRepositoryI, court: Court) => Promise<CourtCreateRs>;
};

export const CourtService: CourtServiceType = {
    find: (
        repository: CourtRepositoryI,
        latitude: number,
        longitude: number,
        radio: number,
    ): Promise<CourtRs> => repository.find(latitude, longitude, radio),
    create: (repository: CourtRepositoryI, court: Court): Promise<CourtCreateRs> =>
        repository.create(court),
};
