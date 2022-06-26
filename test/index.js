import dotenv from 'dotenv';
dotenv.config();
import chai from 'chai';
import { get_config, get_account } from '../src/functions/get_account.js'
import { add_key, delete_key, list_keys } from '../src/functions/access_keys.js'

const expect = chai.expect;

describe("Testing NEAR-API-JS", () => {
    it("Extrapolate config from .env", async () => {
        const config = await get_config();
        expect(config.networkId).to.equal(process.env.CONFIG_NETWORK_ID);
        expect(config.nodeUrl).to.equal(process.env.CONFIG_NODE_URL);
        expect(config.walletUrl).to.equal(process.env.CONFIG_WALLET_URL);
        expect(config.helperUrl).to.equal(process.env.CONFIG_HELPER_URL);
        expect(config.explorerUrl).to.equal(process.env.CONFIG_EXPLORE_URL);
    });

    it("Get account", async () => {
        const account = await get_account();
        expect(account.accountId).to.equal(process.env.NEAR_WALLET_ID);
    });

    it("Add & delete key", async () => {
        const key = "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXUYsjYfcx"
        var success = await add_key(key);
        expect(true).to.equal(success);

        var all_keys = await list_keys();
        all_keys = all_keys.map(x => {
            return x['public_key'];
        });
        var key_with_encryption_algo = "ed25519:" + key
        expect(true).to.equal(all_keys.includes(key_with_encryption_algo));

        success = await delete_key(key);
        expect(true).to.equal(success);

        var all_keys = await list_keys();
        all_keys = all_keys.map(x => {
            return x['public_key'];
        });
        key_with_encryption_algo = "ed25519:" + key
        expect(false).to.equal(all_keys.includes(key_with_encryption_algo));
    });

 });
