export type Player = {
    id: string;
    email: string;
    username: string;
    full_name: string;
    avatar_url: string;
    bio: string;
    position: Position;
};

export type PlayerCompleProfileRequest = {
    username: string;
    bio: string;
    fullName: string;
    position: Position;
    userId: string;
};

export type PlayerCompleProfileResponse = {
    code: number;
    message: string;
};

export type PlayerGetProfileResponse = {
    code: number;
    message: string;
    data: Player;
};

export type FindPlayerResponse = {
    code: number;
    message: string;
    data: Player;
};
export type SearchPlayerResponse = {
    code: number;
    message: string;
    data: Player[];
};
export type Position =
    | "POINT_GUARD"
    | "SHOOTING_GUARD"
    | "SMALL_FORWARD"
    | "POWER_FORWARD"
    | "CENTER";
