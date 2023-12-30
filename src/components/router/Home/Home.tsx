import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import RequestLocation from "../../design/common/RequestLocation";
import { useLocationStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";
import { log } from "../../../utils/logger";

const Home = observer(() => {
    const [showRequestLocationModal, setShowRequestLocationModal] = useState(false);
    const locationStore = useLocationStore();

    const handleLocationChange = useCallback(
        (location: Location.LocationObject) => {
            locationStore.setLocation(location);
        },
        [locationStore],
    );

    useEffect(() => {
        Location.getForegroundPermissionsAsync().then((permissionResponse) => {
            if (permissionResponse.status !== "granted") {
                log.warn("Foreground permission is not granted 👀!!")
                setShowRequestLocationModal(true);
            }
            locationStore.setStatus(permissionResponse.status);
        });
    }, []);

    useEffect(() => {
        let subscription;

        if (locationStore.status === "granted") {
            log.info("Getting user location 🌍")
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
                ></MapView>
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
