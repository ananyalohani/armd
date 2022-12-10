import { sendEvent } from "./services/kafka";
import { getGeoData } from "./services/maxmind";

export const asynchronouslyProcessEvent = async ({
  event,
  ipAddress,
}: {
  event: any;
  ipAddress: string;
}) => {
  const { country, continent } = getGeoData(ipAddress);
  event["ipAddress"] = ipAddress;
  event["geo"] = {
    country,
    continent,
  };
  await sendEvent(event);
};
