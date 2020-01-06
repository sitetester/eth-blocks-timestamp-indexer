const blocksTimestampIndexer = require('../../src/service/indexer/');

process.on('message', async ({fromBlockNumber, toBlockNumber, blocksPerProcess}) => {
    const response = await blocksTimestampIndexer.startWith({fromBlockNumber, toBlockNumber, blocksPerProcess});
    if (response) {
        process.send('done');
    }
});
