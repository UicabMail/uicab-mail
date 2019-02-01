import { configure, observable, action, computed } from "mobx";

configure({ enforceActions: "observed" });

class UiState {
  @observable language = 1;
  @observable pendingRequestCount = 0;

  constructor() {
    setInterval(this.setL, 1000);
  }

  @computed get appIsInSync() {
    return this.pendingRequestCount === 0;
  }

  @action setL = () => {
    this.language++;
  };
}

export const login = new UiState();
