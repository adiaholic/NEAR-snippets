import * as nearAPI from "near-api-js";
const { connect } = nearAPI;
import { get_account } from "./get_account.js";


async function function_call() {
    try {
        const account = await get_account();
        const methodOptions = {
          viewMethods: ['getMessageByAccountId'],
          changeMethods: ['addMessage']
        };
        const contract = new Contract(
          account,
          'contract-id.testnet',
          methodOptions
        );
        // use a contract view method
        const messages = await contract.getMessages({
          accountId: 'example-account.testnet'
        });
        // use a contract change method
        await contract.addMessage({
          meta: 'some info',
          callbackUrl: 'https://example.com/callback',
          args: { text: 'my message' },
          amount: 1
        })
    } catch(e) {
        console.log("Error encountered: ", e)
    }
}


export default function_call;


