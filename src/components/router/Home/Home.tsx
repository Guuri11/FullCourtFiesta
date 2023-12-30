import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import RequestLocation from "../../design/common/RequestLocation";
import { useLocationStore, useLoggingStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
    const [showRequestLocationModal, setShowRequestLocationModal] = useState(false);
    const locationStore = useLocationStore();
    const loggingStore = useLoggingStore();

    loggingStore.register("Home.tsx: loading");

    const handleLocationChange = useCallback(
        (location: Location.LocationObject) => {
            loggingStore.register(
                "Home.tsx: handleLocationChange => " + JSON.stringify(location.coords),
            );
            locationStore.setLocation(location);
        },
        [locationStore],
    );

    useEffect(() => {
        Location.getForegroundPermissionsAsync().then((permissionResponse) => {
            loggingStore.register(
                "Home.tsx: checking current location permissions => " + permissionResponse.status,
            );
            if (permissionResponse.status !== "granted") {
                setShowRequestLocationModal(true);
            }
            locationStore.setStatus(permissionResponse.status);
        });
    }, []);

    useEffect(() => {
        let subscription;

        if (locationStore.status === "granted") {
            loggingStore.register("Home.tsx: calling Location.watchPositionAsync");
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
