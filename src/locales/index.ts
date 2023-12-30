import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./resources/en.json";
import es from "./resources/es.json";

type Language = "en" | "es"

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "es",
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});

export default i18n;
