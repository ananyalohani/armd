import { PrismaClient } from "@prisma/client";
import Logger from "../logger";

const logger = new Logger("Prisma");

// Master DB
export const writerDb = new PrismaClient({
  datasources: { db: { url: process.env.MASTER_DB_URL } },
});

// Replica DB
export const readerDb = new PrismaClient({
  datasources: { db: { url: process.env.REPLICA_DB_URL } },
});

export const init = async () => {
  logger.info("Connecting to Prisma...");
  try {
    await writerDb.$connect();
    await readerDb.$connect();
    logger.info("Connected to Prisma");
  } catch (error) {
    logger.error(`Failed to connect to Prisma: ${error}`);
  }
};
