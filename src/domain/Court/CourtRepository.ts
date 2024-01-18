import { Court, CourtCreateRs, CourtRs } from "./Court";

export interface CourtRepositoryI {
    find: (latitude: number, longitude: number, radio: number) => Promise<CourtRs>;
    create?: (court: Court) => Promise<CourtCreateRs>;
}
