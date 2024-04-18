import { v4 as uuidv4 } from 'uuid';

export function createAccount(name, avatar) {
    let accounts = getAccounts();
    let id = uuidv4();
    accounts.push({id, name, avatar, pokedex : []});
    window.localStorage.setItem('accounts', JSON.stringify(accounts));
}

export function getAccounts() {
    let accounts = JSON.parse(window.localStorage.getItem('accounts'));
    if (!accounts) {
        accounts = [];
    }
    return accounts;
}

export function deleteAccount(index) {
    let accounts = getAccounts();
    accounts.splice(index, 1);
    window.localStorage.setItem('accounts', JSON.stringify(accounts));
}

export function getAccount(id) {
    let accounts = getAccounts();
    return accounts.find(account => account.id === id);
}