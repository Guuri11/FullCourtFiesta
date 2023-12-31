import { logger, consoleTransport } from "react-native-logs";

const defaultConfig = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
        success: 4,
    },
    severity: "debug",
    transport: consoleTransport,
    transportOptions: {
        colors: {
            debug: "orangeBright",
            info: "blueBright",
            warn: "yellowBright",
            error: "redBright",
            success: "greenBright",
        },
    },
    async: true,
    dateFormat: "time",
    printLevel: true,
    printDate: true,
    enabled: true,
};
export const log = logger.createLogger<"debug" | "info" | "warn" | "error" | "success">(
    defaultConfig,
);
