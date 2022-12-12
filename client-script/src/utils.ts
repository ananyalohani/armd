type DOMElement = Window | Document | HTMLElement;

export const addMultipleEventListeners = (
  element: DOMElement,
  events: string[],
  handler: (event: Event) => void
) => {
  events.forEach((type) => element.addEventListener(type, handler, false));
};

export const isNode = (node?: Node) => node?.nodeType === Node.ELEMENT_NODE;
