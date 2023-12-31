import { Text } from "react-native";
import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import * as Location from "expo-location";
import { useLocationStore } from "../../../hooks/store";
import "../../../../infrastructure/locales/index";
import { useTranslation } from "react-i18next";
import { log } from "../../../../infrastructure/config/logger";

type RequestLocationProps = {
    isVisible: boolean;
};

const RequestLocation = (props: RequestLocationProps) => {
    const { t } = useTranslation();
    const locationStore = useLocationStore();
    const [hideDialog, setHideDialog] = useState(false);

    const handleLocationPermission = () => {
        log.info("User allowed location permission 📍")
        Location.requestForegroundPermissionsAsync().then((response) => {
            locationStore.setStatus(response.status);
        });
        setHideDialog(true);
    };

    const handleDeny = () => {
        log.warn("User denied access to location 😱")
        setHideDialog(true);
    }

    return (
        <Dialog
            isVisible={props.isVisible && !hideDialog}
            onBackdropPress={() => {
                setHideDialog(true);
            }}
        >
            <Dialog.Title title={t("allow_location_access")} />
            <Text>
                {t("to_register_activities_in_fullcourtfiesta")}
            </Text>
            <Dialog.Actions>
                <Dialog.Button title={t("allow")} onPress={handleLocationPermission} />
                <Dialog.Button
                    title={t("deny")}
                    onPress={handleDeny}
                />
            </Dialog.Actions>
        </Dialog>
    );
};

export default RequestLocation;
