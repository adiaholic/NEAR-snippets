import { get_account } from "./get_account.js";
import chalk from 'chalk';


export async function add_key(new_key) {
    var explorer_url = process.env.CONFIG_EXPLORE_URL;

    try {
        const account = await get_account();
        var response = await account.addKey(
            new_key, // public key for new account 
        );
        explorer_url =  explorer_url + "/transactions/" + response['transaction_outcome']['id']

        console.log(explorer_url)
        console.log(chalk.bgMagenta(explorer_url))
        console.log("Key added");
        return true;
    } catch(e) {
        console.log("Error encountered: ", e);
        return false;
    }
}

export async function delete_key(key) {
    var explorer_url = process.env.CONFIG_EXPLORE_URL;

    try {
        const account = await get_account();
        var response = await account.deleteKey(
            key,
        );
        explorer_url =  explorer_url + "/transactions/" + response['transaction_outcome']['id']

        console.log(chalk.bgMagenta(explorer_url))
        console.log("Key deleted");
        return true;
    } catch(e) {
        console.log("Error encountered: ", e);
        return false;
    }
}

export async function list_keys() {
    var keys;
    try {
        const account = await get_account();
        keys = await account.getAccessKeys();
    } catch(e) {
        console.log("Error encountered: ", e);
    }
    return keys;
}
