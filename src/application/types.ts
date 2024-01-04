import { AuthenticationServiceType } from "./AuthenticationService"
import { PlayerServiceType } from "./PlayerService"

export type ServiceNameType = "authentication" | "player"

export type ServiceType = AuthenticationServiceType | PlayerServiceType
