module.exports.getFromToBlockNumbers = (processId, lastScannedBlockNumber, blocksPerProcess) => {
    let fromBlockNumber;

    if (processId === 0) {
        fromBlockNumber = lastScannedBlockNumber + 1;
    } else {
        fromBlockNumber = lastScannedBlockNumber + (blocksPerProcess * processId) + 1;
    }

    let toBlockNumber = fromBlockNumber + (blocksPerProcess - 1);
    return {fromBlockNumber, toBlockNumber};
};