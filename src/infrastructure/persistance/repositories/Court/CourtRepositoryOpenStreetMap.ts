import { Court, CourtRs } from "../../../../domain/Court/Court";
import { CourtRepositoryI } from "../../../../domain/Court/CourtRepository";
import { log } from "../../../config/logger";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const find = async (latitude: number, longitude: number, radio: number): Promise<CourtRs> => {
    try {
        const query = `
        [out:json];
        (
          node["leisure"="pitch"]["sport"="basketball"](around:${radio},${latitude},${longitude});
          way["leisure"="pitch"]["sport"="basketball"](around:${radio},${latitude},${longitude});
          relation["leisure"="pitch"]["sport"="basketball"](around:${radio},${latitude},${longitude});
        );
        out center;
      `;

        const encodedQuery = encodeURIComponent(query);

        const response = await fetch(`${OVERPASS_URL}?data=${encodedQuery}`);
        if (!response.ok) {
            throw new Error("Error al realizar la petición a la API de Overpass");
        }

        const data = await response.json();

        let courts: Court[] = [];

        // TODO: create type for overpass api response
        data.elements.forEach((element) => {
            if (element.type === "way") {
                courts.push({
                    name: element.tags?.name,
                    id: element.id,
                    latitude: element.center.lat,
                    longitude: element.center.lon,
                    playersNear: 0,
                    direction: "",
                });
            }
        });

        log.info("🗺️ Fetching basketball courts 🏀📍");
        return { code: 200, message: "", data: courts };
    } catch (error) {
        log.error("Could not get courts 🏀");
        return { code: 400, message: "unable_to_find_courts", data: [] };
    }
};

export const CourtRepository: CourtRepositoryI = {
    find,
};
