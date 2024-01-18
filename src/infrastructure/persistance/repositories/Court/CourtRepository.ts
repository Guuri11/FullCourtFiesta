import { Court, CourtRs } from "../../../../domain/Court/Court";
import { CourtRepositoryI } from "../../../../domain/Court/CourtRepository";
import { log } from "../../../config/logger";
import { supabase } from "../../supabase";

const find = async (latitude: number, longitude: number, radio: number): Promise<CourtRs> => {
    let { data: court, error } = await supabase.from("court").select("*");
    if (error) {
        log.error(error.message);
        return { code: 400, message: error.message, data: [] };
    }
    log.info("🗺️ Fetching basketball courts 🏀📍");
    return { code: 200, message: "", data: court as unknown as Court[] };
};

export const CourtRepository: CourtRepositoryI = {
    find,
};
