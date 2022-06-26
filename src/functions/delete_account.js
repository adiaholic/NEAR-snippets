import * as nearAPI from "near-api-js";
const { connect } = nearAPI;
import { get_account } from "./get_account.js";


async function delete_account() {
    try {
        const account = await get_account();
        await account.deleteAccount();
        console.log("Account Deleted")
    } catch(e) {
        console.log("Error encountered: ", e)
    }
}


export default delete_account;
