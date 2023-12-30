const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "FullCourtFiesta (Dev)" : "FullCourtFiesta",
  slug: "fullcourtfiesta",
  version: "1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#e0e2f2",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
  },
  scheme: IS_DEV ? "app.fullcourtfiesta.dev" : "app.fullcourtfiesta",
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#e0e2f2",
    },
    package: IS_DEV ? "com.app.fullcourtfiesta.dev" : "com.app.fullcourtfiesta",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission: "Permite a FullCourtFiesta acceder a tu ubicación.",
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "d9885150-840b-4709-9b9c-b2a0fb90d7c1"
    },
  },
  expo: {
    scheme: "com.fullcourtfiesta"
  }
};
