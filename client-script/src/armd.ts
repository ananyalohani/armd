import { finder } from "@medv/finder";
import { addMultipleEventListeners, isNode } from "./utils";

const createEventPayload = (event: Event) => {
  const target = event.target as HTMLElement;
  return {
    event: event.type,
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
      destination: event["destination"],
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

const startArmd = ({ base }: { base: string }) => {
  const handleEvent = createHandler(base);
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
