import config from "../../../config.js";

export const setFormatOnSaveWithLocalhostAnPort = (filename) => {
  return `http://${process.env.HOST}:${process.env.PORT}/public/${filename}`;
};
