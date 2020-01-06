const Web3Provider = require('../Web3Provider');
const timestampToUtcDateConverter = require('../helper/timestampToUtcDateConverter');
const blocksTimestampsRepository = require('../../repository/blocksTimestamp/');

const blocksTimestampIndexer = require('./blocksTimestampIndexer')(
    Web3Provider.provideWeb3(),
    timestampToUtcDateConverter,
    blocksTimestampsRepository
);

module.exports = blocksTimestampIndexer;
