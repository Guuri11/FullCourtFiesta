import { action, makeObservable, observable } from "mobx";

import { Resetable } from "../../interfaces/resetable";

import UIStore from ".";

class LoadingStore implements Resetable {
  @observable
  loading = true;

  uiStore!: UIStore;

  constructor(ui: UIStore) {
    makeObservable(this);
    this.uiStore = ui;
  }

  @action
  startLoading(): void {
    this.loading = true;
  }

  @action
  stopLoading(): void {
    this.loading = false;
  }

  @action
  reset(): void {
    this.loading = false;
  }
}

export default LoadingStore;
