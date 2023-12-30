import { Text } from "react-native";
import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import * as Location from "expo-location";
import { useLocationStore, useLoggingStore } from "../../../hooks/store";

type RequestLocationProps = {
    isVisible: boolean;
};

const RequestLocation = (props: RequestLocationProps) => {
    const locationStore = useLocationStore();
    const loggingStore = useLoggingStore();
    const [hideDialog, setHideDialog] = useState(false);

    loggingStore.register("RequestLocation.tsx: loading");

    const handleLocationPermission = () => {
        loggingStore.register("RequestLocation.tsx: handleLocationPermission");
        Location.requestForegroundPermissionsAsync().then((response) => {
            locationStore.setStatus(response.status);
        });
        setHideDialog(true);
    };

    return (
        <Dialog
            isVisible={props.isVisible && !hideDialog}
            onBackdropPress={() => {
                setHideDialog(true);
            }}
        >
            <Dialog.Title title='Permite acceso a la ubicación exacta' />
            <Text>
                Para registrar actividades en FullCourtFiesta, será necesario que permitas el acceso
                a la ubicación exacta
            </Text>
            <Dialog.Actions>
                <Dialog.Button title='Permitir' onPress={handleLocationPermission} />
                <Dialog.Button
                    title='Denegar'
                    onPress={() => {
                        setHideDialog(true);
                    }}
                />
            </Dialog.Actions>
        </Dialog>
    );
};

export default RequestLocation;
