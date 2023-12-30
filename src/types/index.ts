export type ModeType = "dark" | "light";

// TODO: Replace domain for Responses clases
export type Player = {
    id: string;
    email: string;
    username: string;
    fullName: string;
    password: string;
    createdAt: string; // Assuming it's a valid date-time format
    updatedAt: string; // Assuming it's a valid date-time format
    enabled: boolean;
};

export type Court = {
    id: string;
    name: string;
    direction: string;
    latitude: string;
    longitude: string;
    playersNear: number;
    createdAt: string; // Assuming it's a valid date-time format
    updatedAt: string; // Assuming it's a valid date-time format
};

export type Event = {
    id: string;
    player: Player;
    title: string;
    description: string;
    dateTime: string; // Assuming it's a valid date-time format
    court: Court;
    eventState: string; // You may want to replace 'string' with an actual enum type
    createdAt: string; // Assuming it's a valid date-time format
    updatedAt: string; // Assuming it's a valid date-time format
};

export type PostRs = {
    id: string; // Replace 'any[]' with the actual type of 'id'
    player: Player;
    photo: string;
    likes: number;
    event: Event;
    createdAt: string; // Assuming it's a valid date-time format
};
