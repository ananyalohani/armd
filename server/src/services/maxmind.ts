import { readFileSync } from "fs";
import { Reader, ReaderModel } from "@maxmind/geoip2-node";
import { resolve } from "path";
import Logger from "src/logger";

const logger = new Logger("MaxMind");

let reader: ReaderModel;

export const init = async () => {
  logger.info("Loading MaxMind IP database...");
  const geolite2 = readFileSync(
    resolve(__dirname, "../../data/geolite-2/GeoLite2-Country.mmdb")
  );
  reader = Reader.openBuffer(geolite2);
  logger.info("MaxMind IP database loaded");
};

export const getGeoData = (
  ip: string
): {
  country: string;
  continent: string;
} => {
  try {
    const { country, continent } = reader.country(ip);
    return {
      country: country.names.en,
      continent: continent.names.en,
    };
  } catch (error) {
    logger.error(`Failed to get geo data for IP: ${ip}`);
    return {
      country: "Unknown",
      continent: "Unknown",
    };
  }
};
