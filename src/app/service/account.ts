import { DatabaseDriver, getDatabase } from '../database/database'
import { getAccountScript, insertAccountScript, getAccountBySessionScript } from '../database/scripts'
import { Account } from '../../types'

export const getAccount = async (authenticatedUserID: string) => {

    const db = await getDatabase();

    const script = getAccountScript(authenticatedUserID);
    const account = await db.get<Account>(script);

    db.close();

    return account;

}

export const getAccountBySession = async (sessionID: string) => {

    const db = await getDatabase();

    const script = getAccountBySessionScript(sessionID);
    const account = await db.get<{DisplayName: string}>(script);

    db.close();

    if (!account) {
        throw Error("Could not load account")
    }
    else {
        return account;
    }

}

export const createAccount = async (authenticatedUserID: string) => {

    const db = await getDatabase();

    const script = insertAccountScript(authenticatedUserID);
    await db.exec(script);

    const account = await getAccount(authenticatedUserID);

    db.close();

    if (!account) {
        throw Error("Could not load created account!");
    }
    else {
        return account;
    }

}