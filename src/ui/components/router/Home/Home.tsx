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

const Home = observer(() => {
    const { t } = useTranslation();
    const [showRequestLocationModal, setShowRequestLocationModal] = useState(false);
    const locationStore = useLocationStore();
    const [courts, setCourts] = useState<Court[]>([]);
    const appStore = useAppStore();
    const uiStore = useUIStore();

    const handleLocationChange = useCallback(
        (location: Location.LocationObject) => {
            locationStore.setLocation(location);
        },
        [locationStore],
    );

    const getBasketballCourts = async (latitude: number, longitude: number, radio: number) => {
        const { service, repository } = appStore.getService("court") as {
            service: CourtServiceType;
            repository: CourtRepositoryI;
        };

        service.find(repository, latitude, longitude, radio).then(({ code, message, data }) => {
            if (code !== 200) {
                uiStore.notification.addNotification(t(message), "error");
            } else {
                setCourts(data);
            }
        });
    };

    useEffect(() => {
        if (locationStore.location?.coords) {
            getBasketballCourts(
                locationStore.location.coords.latitude,
                locationStore.location.coords.longitude,
                3500,
            );
        }
    }, [locationStore.location]);

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
