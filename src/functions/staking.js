import * as nearAPI from "near-api-js";
const { connect } = nearAPI;
import { get_account } from "./get_account.js";


export async function stake_tokens(amount) {
    try {
        const account = await get_account();
        const account_details = await account.getAccountDetails();
        res = await account.stake(account_details['authorizedApps'][0]['publicKey'], amount);
        console.log(res);
        console.log("Tokens staked");
    } catch(e) {
        console.log("Error encountered: ", e.type);
    }
}
