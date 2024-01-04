import { action } from "mobx";

import { Resetable } from "../interfaces/resetable";
import UIStore from "./ui";
import LocationStore from "./location";
import AuthorizationStore from "./authorization";
import AuthenticationStore from "./authentication";
import { AuthenticationService, AuthenticationServiceType } from "../../../application/AuthenticationService";
import { AuthenticationRepositoryI } from "../../../domain/Authentication/AuthenticationRepository";
import { AuthenticationRepository } from "../../../infrastructure/persistance/repositories/Authentication/AuthenticationRepository";
import * as types from "../../../application/types";
import { PlayerService, PlayerServiceType } from "../../../application/PlayerService";
import { PlayerRepository } from "../../../infrastructure/persistance/repositories/Player/PlayerRepository";
import { PlayerRepositoryI } from "../../../domain/Player/PlayerRepository";

type ServicesDIType = {
    name: types.ServiceNameType;
    service: AuthenticationServiceType | PlayerServiceType;
    repository: AuthenticationRepositoryI | PlayerRepositoryI;
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
              repository: AuthenticationRepository
            },
            {
              name: "player",
              service: PlayerService,
              repository: PlayerRepository
            }
        ]
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
