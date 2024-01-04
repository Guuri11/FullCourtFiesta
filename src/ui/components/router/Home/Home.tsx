import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { MapMarker } from "react-native-maps";
import RequestLocation from "../../design/common/RequestLocation";
import { useLocationStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";
import { log } from "../../../../infrastructure/config/logger";

const Home = observer(() => {
    const [showRequestLocationModal, setShowRequestLocationModal] = useState(false);
    const locationStore = useLocationStore();
    const [courts, setCourts] = useState([]);
    const handleLocationChange = useCallback(
        (location: Location.LocationObject) => {
            locationStore.setLocation(location);
        },
        [locationStore],
    );

    /**
     * Obtiene las pistas de baloncesto cercanas dadas unas coordenadas y un radio.
     * @param {number} latitud La latitud del centro de la búsqueda.
     * @param {number} longitud La longitud del centro de la búsqueda.
     * @param {number} radio El radio de búsqueda en metros.
     * @returns {Promise} Una promesa que se resuelve con las pistas de baloncesto.
     */
    const getBasketballCourts = async (latitud, longitud, radio) => {
        try {
            const overpassUrl = "https://overpass-api.de/api/interpreter";

            // Construye la consulta Overpass para buscar pistas de baloncesto
            const query = `
        [out:json];
        (
          node["leisure"="pitch"]["sport"="basketball"](around:${radio},${latitud},${longitud});
          way["leisure"="pitch"]["sport"="basketball"](around:${radio},${latitud},${longitud});
          relation["leisure"="pitch"]["sport"="basketball"](around:${radio},${latitud},${longitud});
        );
        out body;
        >;
        out skel qt;
      `;

            // Codifica la consulta para incluirla en la URL
            const encodedQuery = encodeURIComponent(query);

            // Realiza la llamada a la API de Overpass
            const response = await fetch(`${overpassUrl}?data=${encodedQuery}`);
            if (!response.ok) {
                throw new Error("Error al realizar la petición a la API de Overpass");
            }

            const data = await response.json();

            // Procesa la respuesta y extrae las pistas de baloncesto
            let pistas = [];
            data.elements.forEach((element) => {
                if (element.type === "way") {
                    const p = data.elements.find((e) => e.id == element.nodes[0]);
                    pistas.push({
                        id: p.id,
                        lat: p.lat,
                        lon: p.lon,
                    });
                }
            });

            setCourts(pistas);

            return pistas;
        } catch (error) {
            console.error("Error obteniendo pistas de baloncesto cercanas:", error);
            throw error;
        }
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
                                    coordinate={{ latitude: court.lat, longitude: court.lon }}
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
