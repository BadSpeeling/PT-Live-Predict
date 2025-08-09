import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export class DatabaseDriver {

    // database?: Database

    // constructor() {
    // }

    // async openDatabase () {
    //     this.database = await open({
    //         filename: './collection.db',
    //         //filename: this.server,
    //         driver: sqlite3.Database
    //     });
    // }

    // #sanitize (script: string) {
    //     return script.replaceAll('--','');
    // }

    // async getAll<T>(script: string) {
    //     const sanitizedScript = this.#sanitize(script);
    //     const queryResults = await this.database?.all(sanitizedScript);
    //     return queryResults as T[];
    // }

}

export const getDatabase = async () => {
    return await open({
        filename: './pt-live-predict.db',
        driver: sqlite3.Database
    });
}
