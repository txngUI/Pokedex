import { getAccount } from './accounts.js'

export const getCurrentAccount = () => {
    const accountID = JSON.parse(sessionStorage.getItem('currentAccoundID')) || null
    if (!accountID) return null;
    return getAccount(accountID);
}

export const setCurrentAccount = (id) => {
    sessionStorage.setItem('currentAccoundID', JSON.stringify(id));
}

export const logout = () => {
    sessionStorage.removeItem('currentAccoundID');
}