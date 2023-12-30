import type { LocationObject } from "expo-location";
import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";
import * as Location from "expo-location";

class LoggingStore implements Resetable {
    appStore!: AppStore;

    constructor(app: AppStore) {
        makeAutoObservable(this);
        this.appStore = app;
    }

    reset(): void {
        this.appStore.reset();
    }

    @action register(msg: string) {
        console.log(msg);
    }
}

export default LoggingStore;
