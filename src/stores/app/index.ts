import { action } from "mobx";

import { Resetable } from "../interfaces/resetable";
import UIStore from "./ui";
import LocationStore from "./location";
import AuthorizationStore from "./authorization";
import LoggingStore from "./logging";
import AuthenticationStore from "./authentication";

class AppStore implements Resetable {
    authorizationStore!: AuthorizationStore;
    authenticationStore!: AuthenticationStore;
    locationStore!: LocationStore;
    UIStore!: UIStore;
    loggingStore!: LoggingStore;

    constructor() {
        this.authorizationStore = new AuthorizationStore(this);
        this.locationStore = new LocationStore(this);
        this.UIStore = new UIStore(this);
        this.loggingStore = new LoggingStore(this);
        this.authenticationStore = new AuthenticationStore(this);
    }

    @action reset(): void {
        this.authorizationStore.reset();
        this.locationStore.reset();
        this.UIStore.reset();
        this.loggingStore.reset();
        this.authenticationStore.reset();
    }
}

export default AppStore;
