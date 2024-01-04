import { EventRs } from "./Event";

export interface EventRepository {
    create: () => Promise<EventRs>;
    update: (id: number) => Promise<EventRs>;
    delete: (id: number) => Promise<null>;
    find: () => Promise<EventRs[]>;
}
