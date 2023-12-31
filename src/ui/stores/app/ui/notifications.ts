import { observable, action, makeObservable } from "mobx";
import { v4 as uuid } from "uuid";
import _ from "lodash/fp";

import { Resetable } from "../../interfaces/resetable";

import UIStore from ".";
import { log } from "../../../../infrastructure/config/logger";

export type NotificationType = "error" | "success" | "info";

export type Notification = {
    id: string;
    message: string;
    type?: NotificationType;
    action?: () => void;
    actionText?: string;
};

class NotificationStore implements Resetable {
    uiStore: UIStore;

    @observable
    notificationQueue: Notification[] = [];

    constructor(ui: UIStore) {
        makeObservable(this);
        this.uiStore = ui;
    }

    @action
    addNotification(
        message: string,
        type?: NotificationType,
        action?: () => void,
        actionText?: string,
    ): void {
        if (this.notificationQueue.find((t) => t.message === message)) {
            return;
        }
        log[type](message);
        this.notificationQueue = _.concat(this.notificationQueue, {
            id: uuid(),
            message,
            type,
            action,
            actionText,
        });
    }

    @action
    removeNotification(id: string): void {
        this.notificationQueue = _.reject({ id }, this.notificationQueue);
    }

    @action
    reset(): void {
        this.notificationQueue = [];
    }
}

export default NotificationStore;
