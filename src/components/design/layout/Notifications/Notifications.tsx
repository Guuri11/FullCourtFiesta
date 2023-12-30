import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useUIStore } from "../../../../hooks/store";
import { Notification } from "../../../../stores/app/ui/notifications";
import Toast from "react-native-toast-message";

const Notifications = observer(() => {
    const uiStore = useUIStore();

    function showToast(notification: Notification) {
        Toast.show({
            type: notification.type,
            text1: notification.message,
        });

        uiStore.notification.removeNotification(notification.id);
    }

    useEffect(() => {
        uiStore.notification?.notificationQueue.forEach((notification) => showToast(notification));
    }, [uiStore.notification.notificationQueue]);

    return <Toast />;
});

export default Notifications;
