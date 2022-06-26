import dotenv from 'dotenv';
dotenv.config();
import * as nearAPI from "near-api-js";
const { keyStores, KeyPair } = nearAPI;
const { connect } = nearAPI;

export async function get_config() {
    var PRIVATE_KEY = process.env.NEAR_PRIVATE_KEY;
    var NEAR_WALLET_ID = process.env.NEAR_WALLET_ID;
    var CONFIG_NETWORK_ID = process.env.CONFIG_NETWORK_ID
    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(PRIVATE_KEY);
    await keyStore.setKey(CONFIG_NETWORK_ID, NEAR_WALLET_ID, keyPair);

    const config = {
        networkId: process.env.CONFIG_NETWORK_ID,
        keyStore,
        nodeUrl: process.env.CONFIG_NODE_URL,
        walletUrl: process.env.CONFIG_WALLET_URL,
        helperUrl: process.env.CONFIG_HELPER_URL,
        explorerUrl: process.env.CONFIG_EXPLORE_URL
    }
    return config;
}


export async function get_account() {
    var NEAR_WALLET_ID = process.env.NEAR_WALLET_ID;
    const config = await get_config();
    const near = await connect(config);
    const account = await near.account(NEAR_WALLET_ID);
    return account;
}
