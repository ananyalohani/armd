import { finder } from "@medv/finder";

function addMultipleEventListeners(element, events, handler) {
  events.forEach((e) => element.addEventListener(e, handler, false));
}

const isNode = (node) => node?.nodeType === Node.ELEMENT_NODE;

const createHandler = (baseUrl) => {
  const handleEvent = (e) => {
    console.log(e.type, e.destination, e.target);
    const eventInfo = {
      event: e.type,
      selector: isNode(e.target) ? finder(e.target) : undefined,
      timestamp: Date.now(),
      properties: {
        referrer: document.referrer,
        clientX: e.clientX,
        clientY: e.clientY,
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        pageX: e.pageX,
        pageY: e.pageY,
        screenX: e.screenX,
        screenY: e.screenY,
        host: window.location.hostname,
        pathname: window.location.pathname,
        userAgent: navigator.userAgent,
        userAgentData: navigator.userAgentData,
        clientWidth: document.documentElement.clientWidth,
        clientHeight: document.documentElement.clientHeight,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        innerText: e.target.innerText || undefined,
        destination: e.destination || undefined,
      },
    };
    console.log(e.type, { eventInfo });
    fetch(`${baseUrl}/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventInfo,
      }),
      keepalive: true,
    });
  };

  return handleEvent;
};

const startArmd =
  ({ base }) =>
  () => {
    const handleEvent = createHandler(base);
    document.addEventListener("DOMContentLoaded", async () => {
      addMultipleEventListeners(
        document,
        ["click", "dblclick", "scroll"],
        handleEvent
      );
      addMultipleEventListeners(navigation, ["navigate"], handleEvent);
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
    });
  };

window.startArmd = startArmd;
