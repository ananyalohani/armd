import { finder } from "@medv/finder";
import { addMultipleEventListeners, isNode } from "./utils";
import { record } from "rrweb";
import type { eventWithTime as EventWithTime } from "@rrweb/types";
import { v4 as uuidv4 } from "uuid";

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("ARMD_SESSION_ID");
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem("ARMD_SESSION_ID", sessionId);
  }
  return sessionId;
};

const createEventPayload = (event: Event) => {
  const target = event.target as HTMLElement;
  return {
    type: event.type,
    sessionId: getSessionId(),
    properties: {
      referrer: document.referrer,
      clientX: event["clientX"],
      clientY: event["clientY"],
      offsetX: event["offsetX"],
      offsetY: event["offsetY"],
      pageX: event["pageX"],
      pageY: event["pageY"],
      screenX: event["screenX"],
      screenY: event["screenY"],
      host: window.location.hostname,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent,
      userAgentData: JSON.stringify(navigator["userAgentData"]),
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      selector: isNode(target) ? finder(target) : undefined,
      innerText: target?.innerText,
      destination: event["destination"]?.url,
    },
  };
};

const createHandler = (baseUrl: string) => (event: Event) => {
  const data = createEventPayload(event);
  fetch(`${baseUrl}/log`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
    keepalive: true,
  });
};

let sessionEvents: EventWithTime[] = [];

record<EventWithTime>({
  emit(event) {
    sessionEvents.push(event);
  },
});

const createSessionHandler = (baseUrl: string) => () => {
  if (!sessionEvents.length) return;
  const sessionId = getSessionId();
  const body = JSON.stringify({ events: sessionEvents, sessionId });
  sessionEvents = [];
  fetch(`${baseUrl}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
};

const startArmd = ({ base }: { base: string }) => {
  const handleEvent = createHandler(base);
  const handleSessionEvents = createSessionHandler(base);
  setInterval(handleSessionEvents, 10 * 1000);

  document.addEventListener("DOMContentLoaded", async () => {
    // Window events
    addMultipleEventListeners(
      window,
      [
        "resize",
        "scroll",
        "pageshow",
        "pagehide",
        "contextmenu",
        "beforeunload",
      ],
      handleEvent
    );

    // Document events
    addMultipleEventListeners(
      document,
      ["click", "dblclick", "scroll"],
      handleEvent
    );

    // Navigation events
    if (window["navigation"]) {
      addMultipleEventListeners(
        window["navigation"],
        ["navigate"],
        handleEvent
      );
    }
  });
};

window["startArmd"] = startArmd;
