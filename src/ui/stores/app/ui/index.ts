import { action, makeObservable } from "mobx";

import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";

import LoadingStore from "./loading";
import NotificationStore from "./notifications";

class UIStore implements Resetable {
  loading: LoadingStore;

  notification: NotificationStore;

  appStore!: AppStore;

  constructor(appStore: AppStore) {
    makeObservable(this);
    this.appStore = appStore;
    this.loading = new LoadingStore(this);
    this.notification = new NotificationStore(this);
  }

  @action
  reset(): void {
    this.loading.reset();
    this.notification.reset();
  }
}

export default UIStore;
