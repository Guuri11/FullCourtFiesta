export type Court = {
    id: string;
    name: string;
    direction: string;
    latitude: string;
    longitude: string;
    playersNear: number;
};

export type CourtRs = {
    code: number;
    message: string;
    data: Court;
}
