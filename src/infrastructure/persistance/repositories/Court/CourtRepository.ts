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

const search = async (query: string): Promise<CourtRs> => {
    let { data: courts, error } = await supabase
        .from("court")
        .select("*")
        .or(`name.ilike.${query}, direction.ilike.${query}`);

    if (error || courts.length === 0) {
        log.error(`No match for the query ${query}`);
        return { code: 400, message: "court_not_found", data: null };
    }

    log.success(`Players found 📊 ${JSON.stringify(courts)}`);
    return { code: 200, message: "", data: courts as unknown as Court[] };
};

export const CourtRepository: CourtRepositoryI = {
    find,
    search,
};
