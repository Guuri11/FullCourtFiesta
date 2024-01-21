import { action } from "mobx";

import { AuthenticationService } from "../../../application/AuthenticationService";
import { CourtService } from "../../../application/CourtService";
import { FriendshipService } from "../../../application/FriendshipService";
import { PlayerService } from "../../../application/PlayerService";
import { PostService } from "../../../application/PostService";
import * as types from "../../../application/types";
import { AuthenticationRepository } from "../../../infrastructure/persistance/repositories/Authentication/AuthenticationRepository";
import { CourtRepository } from "../../../infrastructure/persistance/repositories/Court/CourtRepository";
import { CourtRepository as CourtRepositoryLocal } from "../../../infrastructure/persistance/repositories/Court/CourtRepositoryLocal";
import { CourtRepository as CourtRepositoryOpenStreetMap } from "../../../infrastructure/persistance/repositories/Court/CourtRepositoryOpenStreetMap";
import { FriendshipRepository } from "../../../infrastructure/persistance/repositories/Friendship/FriendshipRepository";
import { PlayerRepository } from "../../../infrastructure/persistance/repositories/Player/PlayerRepository";
import { PostRepository } from "../../../infrastructure/persistance/repositories/Post/PostRepository";
import { Resetable } from "../interfaces/resetable";
import AuthenticationStore from "./authentication";
import AuthorizationStore from "./authorization";
import LocationStore from "./location";
import UIStore from "./ui";
import { MessageService } from "../../../application/MessageService";
import { MessageRepository } from "../../../infrastructure/persistance/repositories/Chat/MessageRepository";

type ServicesDIType = {
    name: types.ServiceNameType;
    service: types.ServiceType;
    repository: types.RepositoryType;
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
            {
                name: "message",
                service: MessageService,
                repository: MessageRepository,
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
