import { PrismaClient } from "@prisma/client";
import Logger from "../logger";

const logger = new Logger("Prisma");

const prisma = new PrismaClient();

export const init = async () => {
  logger.info("Connecting to Prisma...");
  try {
    await prisma.$connect();
    logger.info("Connected to Prisma");
  } catch (error) {
    logger.error(`Failed to connect to Prisma: ${error}`);
  }
};

export default prisma;
