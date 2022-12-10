import { init as prisma } from "./services/prisma";
import { init as kafka } from "./services/kafka";
import { init as clickhouse } from "./services/clickhouse";
import { init as maxmind } from "./services/maxmind";
import Logger from "./logger";

const services = [prisma, kafka, clickhouse, maxmind];

export default async function init(logger: Logger) {
  logger.info("Initializing services...");
  for (const initService of services) {
    try {
      await initService();
    } catch (error) {
      logger.error(`Failed to initialize service: ${error}`);
    }
  }
  logger.info("Services initialized");
}
