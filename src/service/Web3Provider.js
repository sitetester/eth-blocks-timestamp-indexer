const Web3 = require('web3');
const web3Config = require('config').get('web3');

module.exports = class Web3Provider {
    static provideWeb3() {
        const web3 = new Web3(new Web3.providers.HttpProvider(web3Config.get('httpProvider')));
        if (!web3.isConnected()) {
            throw new Error('Not connected!');
        }

        return web3;
    }
};
