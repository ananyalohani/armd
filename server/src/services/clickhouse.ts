import { ClickHouseClient, createClient } from "@clickhouse/client";
import Logger from "../logger";

const logger = new Logger("ClickHouse");

let client: ClickHouseClient;

const CREATE_EVENTS_TABLE = `
  CREATE TABLE IF NOT EXISTS events (
    id String,
    type String,
    datetime DateTime,
    prop_ip String,
    prop_country String,
    prop_continent String,
    prop_referrer Nullable(String),
    prop_client_x Nullable(Int32),
    prop_client_y Nullable(Int32),
    prop_offset_x Nullable(Int32),
    prop_offset_y Nullable(Int32),
    prop_page_x Nullable(Int32),
    prop_page_y Nullable(Int32),
    prop_screen_x Nullable(Int32),
    prop_screen_y Nullable(Int32),
    prop_host Nullable(String),
    prop_pathname Nullable(String),
    prop_user_agent Nullable(String),
    prop_user_agent_data Nullable(String),
    prop_client_width Nullable(Int32),
    prop_client_height Nullable(Int32),
    prop_screen_width Nullable(Int32),
    prop_screen_height Nullable(Int32),
    prop_selector Nullable(String),
    prop_inner_text Nullable(String),
    prop_destination Nullable(String)
  )
  ENGINE = MergeTree()
  ORDER BY (datetime)
`;

export const init = async () => {
  try {
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
      return;
    }
    logger.info("Creating events table...");
    await client.exec({
      query: CREATE_EVENTS_TABLE,
      clickhouse_settings: {
        wait_end_of_query: 1,
      },
    });
    logger.info("Created events table");
  } catch (error) {
    logger.error(`Failed to connect to ClickHouse: ${error}`);
  }
};

export const getEvents = async () => {
  try {
    const result = await client.query({
      query: "SELECT * FROM events",
    });
    const events = await result.json();
    return events;
  } catch (error) {
    logger.error(`Failed to get events: ${error}`);
  }
};
