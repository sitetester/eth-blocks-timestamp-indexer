const blocksTimestampIndexer = require('../../src/service/indexer/');

process.on('message', async ({fromBlockNumber, toBlockNumber, blocksPerProcess}) => {
    const response = await blocksTimestampIndexer.start({fromBlockNumber, toBlockNumber, blocksPerProcess});
    if (response) {
        process.send('done');
    }
});
