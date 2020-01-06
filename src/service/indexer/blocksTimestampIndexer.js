const logger = require('../logger');

/**
 * This will scan Ethereum blockchain and save each block number & it' timestamp date in local DB
 */
module.exports = (
    web3,
    timestampToUtcDateConverter,
    blocksTimestampsRepository
) => ({
    // Increasing upperBlockNumber more than 400 causes Error: SQLITE_ERROR: too many SQL variables
    async startParsing({fromBlockNumber, toBlockNumber, blocksPerProcess}) {
        let parsedBlocks = [];

        for (let blockNumber = fromBlockNumber; blockNumber <= toBlockNumber; blockNumber++) {
            const block = web3.eth.getBlock(blockNumber);
            if (block) {
                parsedBlocks.push({
                    blockNumber: block.number,
                    timestampDate: timestampToUtcDateConverter.getUtcDate(block.timestamp),
                })
            } else {
                logger.info(`[indexer] No block found for blockNumber(${blockNumber})`);
            }
        }

        await blocksTimestampsRepository.batchPersistBlockTimestampDate(parsedBlocks);
    },

    /**
     * Starts from least|min block number and continually proceeds upwards (through cron script)
     * parse each block number along with it's timestamp
     */
    async start({fromBlockNumber, toBlockNumber, blocksPerProcess}) {
        logger.info(`Parsing blocks range: ${fromBlockNumber} - ${toBlockNumber}`);
        await this.startParsing({fromBlockNumber, toBlockNumber, blocksPerProcess});
        return true;
    },
});
