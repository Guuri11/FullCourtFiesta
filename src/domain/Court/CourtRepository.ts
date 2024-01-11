import { CourtRs } from "./Court";

export interface CourtRepositoryI {
    find: (latitude: number, longitude: number, radio: number) => Promise<CourtRs>;
}
