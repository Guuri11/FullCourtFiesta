import { AuthenticationRepositoryI } from "../domain/Authentication/AuthenticationRepository";
import { MessageRepositoryI } from "../domain/Message/MessageRepository";
import { CourtRepositoryI } from "../domain/Court/CourtRepository";
import { FriendshipRepositoryI } from "../domain/Friendship/FriendshipRepository";
import { PlayerRepositoryI } from "../domain/Player/PlayerRepository";
import { PostRepositoryI } from "../domain/Post/PostRepository";
import { AuthenticationServiceType } from "./AuthenticationService";
import { CourtServiceType } from "./CourtService";
import { MessageServiceType } from "./MessageService";
import { PlayerServiceType } from "./PlayerService";
import { PostServiceType } from "./PostService";
import { FriendshipServiceType } from "./FriendshipService";

export type ServiceNameType =
    | "authentication"
    | "player"
    | "post"
    | "friendship"
    | "court"
    | "court-open-street-map"
    | "court-local"
    | "chat"
    | "chat-player"
    | "message";

export type ServiceType =
    | AuthenticationServiceType
    | PlayerServiceType
    | CourtServiceType
    | PostServiceType
    | FriendshipServiceType
    | MessageServiceType;

export type RepositoryType =
    | AuthenticationRepositoryI
    | PlayerRepositoryI
    | CourtRepositoryI
    | PostRepositoryI
    | FriendshipRepositoryI
    | MessageRepositoryI;
