import { action } from "mobx";

import { Resetable } from "../interfaces/resetable";
import UIStore from "./ui";
import LocationStore from "./location";
import AuthorizationStore from "./authorization";
import AuthenticationStore from "./authentication";
import {
    AuthenticationService,
    AuthenticationServiceType,
} from "../../../application/AuthenticationService";
import { AuthenticationRepositoryI } from "../../../domain/Authentication/AuthenticationRepository";
import { AuthenticationRepository } from "../../../infrastructure/persistance/repositories/Authentication/AuthenticationRepository";
import * as types from "../../../application/types";
import { PlayerService, PlayerServiceType } from "../../../application/PlayerService";
import { PlayerRepository } from "../../../infrastructure/persistance/repositories/Player/PlayerRepository";
import { PlayerRepositoryI } from "../../../domain/Player/PlayerRepository";
import { PostService, PostServiceType } from "../../../application/PostService";
import { PostRepository } from "../../../infrastructure/persistance/repositories/Post/PostRepository";
import { PostRepositoryI } from "../../../domain/Post/PostRepository";
import { FriendshipService, FriendshipServiceType } from "../../../application/FriendshipService";
import { FriendshipRepository } from "../../../infrastructure/persistance/repositories/Friendship/FriendshipRepository";
import { FriendshipRepositoryI } from "../../../domain/Friendship/FriendshipRepository";
import { CourtService, CourtServiceType } from "../../../application/CourtService";
import { CourtRepositoryI } from "../../../domain/Court/CourtRepository";
import { CourtRepository } from "../../../infrastructure/persistance/repositories/Court/CourtRepository";
import { CourtRepository as CourtRepositoryOpenStreetMap } from "../../../infrastructure/persistance/repositories/Court/CourtRepositoryOpenStreetMap";
import { CourtRepository as CourtRepositoryLocal } from "../../../infrastructure/persistance/repositories/Court/CourtRepositoryLocal";

type ServicesDIType = {
    name: types.ServiceNameType;
    service:
        | AuthenticationServiceType
        | PlayerServiceType
        | PostServiceType
        | FriendshipServiceType
        | CourtServiceType;
    repository:
        | AuthenticationRepositoryI
        | PlayerRepositoryI
        | PostRepositoryI
        | FriendshipRepositoryI
        | CourtRepositoryI;
};

class AppStore implements Resetable {
    authorizationStore!: AuthorizationStore;
    authenticationStore!: AuthenticationStore;
    locationStore!: LocationStore;
    UIStore!: UIStore;
    services: ServicesDIType[];

    constructor() {
        this.authorizationStore = new AuthorizationStore(this);
        this.locationStore = new LocationStore(this);
        this.UIStore = new UIStore(this);
        this.authenticationStore = new AuthenticationStore(this);
        this.services = [
            {
                name: "authentication",
                service: AuthenticationService,
                repository: AuthenticationRepository,
            },
            {
                name: "player",
                service: PlayerService,
                repository: PlayerRepository,
            },
            {
                name: "post",
                service: PostService,
                repository: PostRepository,
            },
            {
                name: "friendship",
                service: FriendshipService,
                repository: FriendshipRepository,
            },
            {
                name: "court",
                service: CourtService,
                repository: CourtRepository,
            },
            {
                name: "court-open-street-map",
                service: CourtService,
                repository: CourtRepositoryOpenStreetMap,
            },
            {
                name: "court-local",
                service: CourtService,
                repository: CourtRepositoryLocal,
            },
        ];
    }

    @action getService(name: types.ServiceNameType) {
        return this.services.find((repo) => repo.name === name);
    }

    @action reset(): void {
        this.authorizationStore.reset();
        this.locationStore.reset();
        this.UIStore.reset();
        this.authenticationStore.reset();
    }
}

export default AppStore;
