import { Court, CourtCreateRs, CourtRs } from "../../../../domain/Court/Court";
import { CourtRepositoryI } from "../../../../domain/Court/CourtRepository";
import { DatabaseConnection } from "../../../config/db-connection";
import { log } from "../../../config/logger";

const db = DatabaseConnection.getConnection();

const find = async (latitude: number, longitude: number, radio: number): Promise<CourtRs> => {
    const response: CourtRs = { code: 200, message: "", data: [] };

    await new Promise<void>((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "SELECT * FROM court",
                    [],
                    (_tx, results) => {
                        log.info("User getting courts from the local database 📍🏀");
                        for (let i = 0; i < results.rows.length; ++i) {
                            response.data.push(results.rows.item(i));
                        }
                        resolve();
                    },
                    (_tx, error) => {
                        response.code = error.code;
                        response.message = error.message;
                        log.error(error.message);
                        reject(error);
                        return false;
                    },
                );
            },
            undefined,
            resolve,
        );
    });

    return response;
};

const create = async (court: Court): Promise<CourtCreateRs> => {
    const response: CourtCreateRs = { code: 200, message: "", data: court };
    db.transaction(function (tx) {
        tx.executeSql(
            "INSERT INTO court(id, name, direction, latitude, longitude, players_near) VALUES (?,?,?,?,?,?)",
            [
                court.id,
                court.name,
                court.direction,
                court.latitude,
                court.longitude,
                court.playersNear,
            ],
            (_tx, results) => {
                if (results.rowsAffected === 0) {
                    response.code = 400;
                    response.data = null;
                    response.message = "unable_to_create_court";
                    log.error("User could not create court locally 😢");
                    return;
                }
                log.success("User could create court locally 🎉");
            },
            (_tx, error) => {
                response.code = error.code;
                response.data = null;
                response.message = error.message;
                log.error(error.message);
                return false;
            },
        );
    });

    return response;
};

export const CourtRepository: CourtRepositoryI = {
    find,
    create,
};
