const {fork} = require('child_process');
const cron = require('node-cron');
const logger = require('../src/service/logger');
const moment = require('moment');
const config = require('config');
const fromToBlockNumbers = require('../src/service/helper/fromToBlockNumbers');
const blocksTimestampsRepository = require('../src/repository/blocksTimestamp/');

// https://www.npmjs.com/package/node-cron
cron.schedule(config.get('cron.indexer.schedule'), async () => {
    const lastScannedBlockNumber = await blocksTimestampsRepository.getLastScannedBlock();
    logger.info(`[indexer] lastScannedBlockNumber:${lastScannedBlockNumber}`);

    const format = 'YYYY-MM-DD, h:mm:ss A';
    logger.info('---');
    logger.info(`[indexer] cron started at: ${moment().format(format)}`);

    const blocksPerProcess = config.get('cron.indexer.blocksPerProcess');
    const maxProcessCount = config.get('cron.indexer.maxProcessCount');

    // test & adjust values accordingly for blocksPerProcess & maxProcessCount config params
    for (let processId = 0; processId < maxProcessCount; processId += 1) {
        const {fromBlockNumber, toBlockNumber} = fromToBlockNumbers.getFromToBlockNumbers(processId, lastScannedBlockNumber, blocksPerProcess);

        let forkedIndexerChild = fork('./cron/child/indexerChild.js');
        forkedIndexerChild.send({fromBlockNumber, toBlockNumber, blocksPerProcess});

        forkedIndexerChild.on('message', childMsg => {
            if (childMsg === 'done') {
                process.kill(forkedIndexerChild.pid);
            }
        });
    }
});
