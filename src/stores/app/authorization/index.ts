import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { storeData } from "../../../hooks/useAsyncStorage";
import { Resetable } from "../../interfaces/resetable";

class AuthorizationStore implements Resetable {
    appStore!: AppStore;

    @observable showOnboarding: "0" | "1" = "0";

    constructor(app: AppStore) {
        makeAutoObservable(this);
        this.appStore = app;
    }

    reset(): void {
        this.showOnboarding = "0";
    }

    @action setShowOnboarding(value: "0" | "1") {
        this.showOnboarding = value;
        storeData("showOnboarding", value);
    }
}

export default AuthorizationStore;
