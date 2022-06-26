import dotenv from 'dotenv';
dotenv.config();
import { get_account } from "./get_account.js";

const wallet_id = process.env.NEAR_WALLET_ID

async function create_account(child_address) {
    const explorer_url =  explorer_url + "/transactions/" + response['transaction_outcome']['id']

    try {
        const account = await get_account();

        // Incorrect way to generate random keys
        const shuffle = str => [...str].sort(()=>Math.random()-.5).join('');
        var new_key = shuffle("a8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXca")

        const response = await account.createAccount(
            child_address + '.' + wallet_id,
            new_key, // public key for new account
            "10000000000000000000000" // initial balance for new account in yoctoNEAR
        );
        const explorer_url =  explorer_url + "/transactions/" + response['transaction_outcome']['id']
        console.log(explorer_url)
        console.log("Account created")
    } catch(e) {
        console.log("Error encountered: ", e)
    }
}

export default create_account;
