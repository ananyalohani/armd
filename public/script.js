import { finder } from 'https://medv.io/finder/finder.js';

function addMultipleEventListeners(element, events, handler) {
  events.forEach((e) => element.addEventListener(e, handler, false));
}

const handleEvent = (e) => {
  console.log(e.type, e.destination);
  const eventInfo = {
    event: e.type,
    selector:
      typeof e.target === 'string' || e.target instanceof String
        ? finder(e.target)
        : undefined,

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
  // fetch('/log', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     eventInfo
  //   }),
  //   keepalive: true,
  // });
};

document.addEventListener('DOMContentLoaded', async () => {
  addMultipleEventListeners(
    document,
    ['click', 'dblclick', 'scroll'],
    handleEvent
  );
  addMultipleEventListeners(navigation, ['navigate'], handleEvent);
  addMultipleEventListeners(
    window,
    ['resize', 'scroll', 'pageshow', 'pagehide', 'contextmenu', 'beforeunload'],
    handleEvent
  );
});
