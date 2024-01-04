import { Court } from "../Court/Court";
import { Player } from "../Player/Player";

export type Event = {
    id: string;
    player: Player;
    title: string;
    description: string;
    dateTime: string;
    court: Court;
    eventState: string;
    createdAt: string;
    updatedAt: string;
};

export type EventRs = {
    code: number;
    message: string;
    data: Event;
};
