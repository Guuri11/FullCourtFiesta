import { AuthenticationServiceType } from "./AuthenticationService";
import { PlayerServiceType } from "./PlayerService";

export type ServiceNameType = "authentication" | "player" | "post" | "friendship";

export type ServiceType = AuthenticationServiceType | PlayerServiceType;
