import { Court, CourtCreateRs, CourtRs } from "./Court";

export interface CourtRepositoryI {
    find: (latitude: number, longitude: number, radio: number) => Promise<CourtRs>;
    search?: (query: string) => Promise<CourtRs>;
    create?: (court: Court) => Promise<CourtCreateRs>;
}
