export type Court = {
    id: string;
    name: string;
    direction: string;
    latitude: number;
    longitude: number;
    playersNear: number;
};

export type CourtRs = {
    code: number;
    message: string;
    data: Court[];
};

export type CourtCreateRs = {
    code: number;
    message: string;
    data: Court;
};
