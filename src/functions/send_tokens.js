import dotenv, { config } from 'dotenv';
dotenv.config();

import * as nearAPI from "near-api-js";
const { connect, transactions } = nearAPI;
import { get_account } from "./get_account.js";


async function send_tokens(receiver_account) {
    const explorer_url = process.env.CONFIG_EXPLORE_URL;

    try {
        const account = await get_account();
        var response = await account.sendMoney(
            // "child.adiaholic.testnet", // receiver account
            receiver_account,
            "10000000000000000000000" // amount in yoctoNEAR
        );
        const explorer_url =  explorer_url + "/transactions/" + response['transaction_outcome']['id']
        console.log(explorer_url)
        console.log("Tokens sent")
    } catch(e) {
        console.log("Error encountered: ", e.type)
    }
}

export default send_tokens;
