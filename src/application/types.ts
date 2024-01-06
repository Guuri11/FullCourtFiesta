import { AuthenticationServiceType } from "./AuthenticationService";
import { PlayerServiceType } from "./PlayerService";

export type ServiceNameType = "authentication" | "player" | "post";

export type ServiceType = AuthenticationServiceType | PlayerServiceType;
