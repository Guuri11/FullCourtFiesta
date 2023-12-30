import React from "react";

import { AppProvider } from "../../context";
import AppStore from "../../stores/app";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export type AppProps = {};

type Props = React.PropsWithChildren<AppProps>;

const theme = createTheme({});

const AppWrapper: React.FunctionComponent<Props> = ({ children }: Props) => {
    const defaultStore = React.useRef(new AppStore());

    return (
        <QueryClientProvider client={client}>
            <ThemeProvider theme={theme}>
                <AppProvider store={defaultStore.current}>{children}</AppProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default AppWrapper;
