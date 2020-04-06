const { transports, createLogger, format } = require("winston");
const config = require("../../config");
const path = require("path");
const files = new transports.File({
  filename: path.join(__dirname, `../../log/${config.logger.file_name}.log`),
});
const consoles = new transports.Console();

const logger = createLogger({
  level: 0,
  transports: [files, consoles],
  format: format.combine(format.timestamp(), format.json()),
});

module.exports = logger;
