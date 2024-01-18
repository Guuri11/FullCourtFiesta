import { AuthenticationServiceType } from "./AuthenticationService";
import { CourtServiceType } from "./CourtService";
import { PlayerServiceType } from "./PlayerService";

export type ServiceNameType =
    | "authentication"
    | "player"
    | "post"
    | "friendship"
    | "court"
    | "court-open-street-map"
    | "court-local";

export type ServiceType = AuthenticationServiceType | PlayerServiceType | CourtServiceType;
