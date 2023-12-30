import React from "react";
import AppStore from "../stores/app";

const AppContext = React.createContext<AppStore>(null);

type Props = React.PropsWithChildren<{
  store: AppStore
}>

const AppProvider: React.FunctionComponent<Props> = ({ store, children }: Props) => (
  <AppContext.Provider value={store}>
    {children}
  </AppContext.Provider>
);

export { AppContext, AppProvider };
