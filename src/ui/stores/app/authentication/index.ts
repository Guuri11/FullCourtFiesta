import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";
import type { Session } from "@supabase/supabase-js";
import * as Player from "../../../../domain/Player/Player";
import { AuthenticationServiceType } from "../../../../application/AuthenticationService";
import { AuthenticationRepositoryI } from "../../../../domain/Authentication/AuthenticationRepository";

class AuthenticationStore implements Resetable {
    appStore!: AppStore;

    @observable isAuthenticated: boolean = false;
    @observable session: Session = null;
    @observable user: Player.Player = null;
    @observable userIsNew: boolean = false;

    constructor(app: AppStore) {
        makeAutoObservable(this);
        this.appStore = app;
    }

    reset(): void {
        this.isAuthenticated = false;
        this.session = null;
        this.user = null;
        this.userIsNew = false;
    }

    @action setAuthenticated(isAuth: boolean) {
        this.isAuthenticated = isAuth;
    }

    @action setUserIsNew(isNew: boolean) {
        this.userIsNew = isNew;
    }

    @action setUser(user: Player.Player) {
        this.user = user;
    }

    @action setSession(session: Session) {
        this.isAuthenticated = !!session;
        this.session = session;
    }
}

export default AuthenticationStore;
