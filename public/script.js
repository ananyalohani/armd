import { finder } from 'https://medv.io/finder/finder.js';

function addMultipleEventListeners(element, events, handler) {
  events.forEach((e) => element.addEventListener(e, handler, false));
}

async function handleEvent(e) {
  const res = await fetch(
    'https://ipgeolocation.abstractapi.com/v1/?api_key=4889997d919c4e0aab3d572b2edae95c'
  );
  const geolocation = await res.json();
  const eventInfo = {
    event: e.type,
    element: e.target,
    selector: finder(e.target),
    timestamp: Date.now(),
    properties: {
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
      geolocation,
    },
  };
  console.log({ eventInfo });
  // TODO: Send eventInfo to server
}

addMultipleEventListeners(window, ['pageshow'], handleEvent);

document.addEventListener('DOMContentLoaded', () => {
  addMultipleEventListeners(document.body, ['click', 'dblclick'], handleEvent);
  addMultipleEventListeners(
    window,
    ['resize', 'scroll', 'pageshow', 'pagehide', 'contextmenu'],
    handleEvent
  );
});
