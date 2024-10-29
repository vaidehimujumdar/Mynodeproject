const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'my-node-project',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

