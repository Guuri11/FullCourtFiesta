import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { MapMarker } from "react-native-maps";
import RequestLocation from "../../design/common/RequestLocation";
import { useAppStore, useLocationStore, useUIStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";
import { log } from "../../../../infrastructure/config/logger";
import { CourtServiceType } from "../../../../application/CourtService";
import { CourtRepositoryI } from "../../../../domain/Court/CourtRepository";
import "../../../../infrastructure/locales/index";
import { useTranslation } from "react-i18next";
import { Court } from "../../../../domain/Court/Court";
import { ServiceNameType } from "../../../../application/types";

const Home = observer(() => {
    const { t } = useTranslation();
    const [showRequestLocationModal, setShowRequestLocationModal] = useState(false);
    const locationStore = useLocationStore();
    const [courts, setCourts] = useState<Court[]>([]);
    const appStore = useAppStore();
    const uiStore = useUIStore();
    const [searchLocally, setSearchLocally] = useState(true);

    const handleLocationChange = useCallback(
        (location: Location.LocationObject) => {
            locationStore.setLocation(location);
        },
        [locationStore],
    );

    const getBasketballCourts = useCallback(
        async (
            latitude: number,
            longitude: number,
            radio: number,
            serviceName: ServiceNameType,
            storeLocally: boolean,
        ) => {
            const { service, repository } = appStore.getService(serviceName) as {
                service: CourtServiceType;
                repository: CourtRepositoryI;
            };

            try {
                const { code, message, data } = await service.find(
                    repository,
                    latitude,
                    longitude,
                    radio,
                );

                if (code !== 200) {
                    uiStore.notification.addNotification(t(message), "error");
                } else {
                    setCourts(data);
                    if (searchLocally && data.length === 0) setSearchLocally(false);

                    if (storeLocally) storeCourtLocal(data);
                }
            } catch (error) {
                log.error("Error fetching basketball courts:", error);
                uiStore.notification.addNotification("Error fetching basketball courts", "error");
            }
        },
        [appStore, searchLocally],
    );

    const storeCourtLocal = useCallback(
        async (courts: Court[]) => {
            const { service, repository } = appStore.getService("court-local") as {
                service: CourtServiceType;
                repository: CourtRepositoryI;
            };

            courts.forEach((court) => {
                service.create(repository, court);
            });
        },
        [appStore],
    );

    useEffect(() => {
        if (locationStore.location?.coords) {
            getBasketballCourts(
                locationStore.location.coords.latitude,
                locationStore.location.coords.longitude,
                3500,
                searchLocally ? "court-local" : "court",
                !searchLocally,
            );
        }
    }, [locationStore.location, searchLocally, getBasketballCourts]);

    useEffect(() => {
        Location.getForegroundPermissionsAsync().then((permissionResponse) => {
            if (permissionResponse.status !== "granted") {
                log.warn("Foreground permission is not granted 👀!!");
                setShowRequestLocationModal(true);
            }
            locationStore.setStatus(permissionResponse.status);
        });
    }, []);

    useEffect(() => {
        let subscription;

        if (locationStore.status === "granted") {
            log.info("Getting user location 🌍");
            Location.watchPositionAsync({ distanceInterval: 10 }, handleLocationChange).then(
                (sub) => {
                    subscription = sub;
                },
            );
        }

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [locationStore.status, handleLocationChange]);

    return (
        <View style={styles.container}>
            {locationStore.location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: locationStore.location.coords.latitude,
                        longitude: locationStore.location.coords.longitude,
                        latitudeDelta: 0.0222,
                        longitudeDelta: 0.0221,
                    }}
                    showsUserLocation
                >
                    {courts.length > 0 &&
                        courts.map((court) => {
                            return (
                                <MapMarker
                                    key={court.id}
                                    title={court.name}
                                    coordinate={{
                                        latitude: court.latitude,
                                        longitude: court.longitude,
                                    }}
                                />
                            );
                        })}
                </MapView>
            )}
            <RequestLocation isVisible={showRequestLocationModal} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default Home;
