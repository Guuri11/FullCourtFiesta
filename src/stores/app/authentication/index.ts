import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";
import type { Session } from "@supabase/supabase-js";

class AuthenticationStore implements Resetable {
    appStore!: AppStore;

    @observable isAuthenticated: boolean = false;
    @observable session: Session = null;

    constructor(app: AppStore) {
        makeAutoObservable(this);
        this.appStore = app;
    }

    reset(): void {
        this.isAuthenticated = false;
        this.session = null;
    }

    @action setAuthenticated(isAuth: boolean) {
        this.isAuthenticated = isAuth;
    }
    @action setSession(session: Session) {
        this.isAuthenticated = session ? true : false;
        this.session = session;
    }
}

export default AuthenticationStore;
