import type { LocationObject } from "expo-location";
import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";
import * as Location from "expo-location";

class LocationStore implements Resetable {
    appStore!: AppStore;

    @observable location: LocationObject = null;
    @observable status: "granted" | "denied" | "undetermined" = "denied";

    constructor(app: AppStore) {
        makeAutoObservable(this);
        this.appStore = app;
    }

    reset(): void {
        this.location = null;
    }

    @action setLocation(location: LocationObject): void {
        this.location = location;
    }

    @action setStatus(status: "granted" | "denied" | "undetermined") {
        this.status = status;
    }

    @action async getCurrentLocation() {
        try {
            let location = await Location.getCurrentPositionAsync({});
            this.setLocation(location);
        } catch (error) {
            this.appStore.UIStore.notification.addNotification(
                "Error obteniendo la ubicación",
                "error",
            );
        }
    }
}

export default LocationStore;
