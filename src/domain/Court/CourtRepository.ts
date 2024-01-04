import { CourtRs } from "./Court";

export interface CourtRepository {
    create: () => Promise<CourtRs>;
    update: (id: number) => Promise<CourtRs>;
    delete: (id: number) => Promise<null>;
    find: () => Promise<CourtRs[]>;
}
