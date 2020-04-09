const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
  server: {
    environment: process.env.environment,
    port: 3000,
  },
  database: {
    uri: process.env.mongoose_url,
    database_name: process.env.database_name,
  },
  logger: {
    file_name: process.env.environment,
  },
  bot: {
    url: process.env.bot_url,
  },
};

