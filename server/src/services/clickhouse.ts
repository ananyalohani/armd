import { ClickHouseClient, createClient } from "@clickhouse/client";
import Logger from "../logger";

const logger = new Logger("ClickHouse");

let client: ClickHouseClient;

export const init = async () => {
  logger.info("Connecting to ClickHouse...");
  client = createClient({
    host: process.env.CLICKHOUSE_HOST,
    username: process.env.CLICKHOUSE_USERNAME,
    password: process.env.CLICKHOUSE_PASSWORD,
    database: process.env.CLICKHOUSE_DATABASE,
  });
  const isAlive = await client.ping();
  if (isAlive) {
    logger.info("ClickHouse is alive");
    logger.info("Connected to ClickHouse");
  } else {
    logger.error("ClickHouse is not alive");
    logger.error("Failed to connect to ClickHouse");
  }
};
