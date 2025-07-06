import { DatabaseDriver, getDatabase } from '../database/database'
import { getSession, insertSession } from '../database/scripts'
import { Session } from '../../types'

export const isSessionValid = async (sessionID: string) => {

    const db = await getDatabase();

    const script = getSession(sessionID);
    const session = await db.get(script);

    db.close();

    return session ? true : false;

}

export const createSession = async (sessionID: string, accountID: number) => {

    const db = await getDatabase();

    const script = insertSession(sessionID, accountID);
    await db.exec(script);

    db.close();

    return true;

}