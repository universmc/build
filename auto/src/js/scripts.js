 const fs = require('fs');
const path = require('path');

function addEndpoint(endpoint, handler) {
  const filePath = path.join('your-project', 'server.json');
  let serverConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  serverConfig.endpoints[endpoint] = handler;
  fs.writeFileSync(filePath, JSON.stringify(serverConfig, null, 2));
}
  