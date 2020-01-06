const dao = require('../../../db/dao');

module.exports = blocksTimestampsTable => ({
    async getLastScannedBlock() {
        let lastScannedBlockNumber = await dao
            .orderBy('blockNumber', 'desc')
            .from(blocksTimestampsTable)
            .first();

        if (!lastScannedBlockNumber) {
            return 0
        }

        return lastScannedBlockNumber.blockNumber
    },

    async batchPersistBlockTimestampDate(rows) {
        await dao.batchInsert(blocksTimestampsTable, rows);
    },

});
