import { AuthenticationServiceType } from "./AuthenticationService";
import { CourtServiceType } from "./CourtService";
import { PlayerServiceType } from "./PlayerService";

export type ServiceNameType = "authentication" | "player" | "post" | "friendship" | "court";

export type ServiceType = AuthenticationServiceType | PlayerServiceType | CourtServiceType;
