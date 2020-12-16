function eventFilter(filterFunc, handler) {
  return (event) => {
    if (filterFunc(event)) {
      handler(event);
    }
  };
}

function combineEventFilters(...eventFilters) {
  return (event) => eventFilters.forEach((ef) => ef(event));
}

function getEventOnOffFunctions(obj) {
  let on;
  let off;
  if (typeof obj.addEventListener === 'function' && typeof obj.removeEventListener === 'function') {
    on = obj.addEventListener.bind(obj);
    off = obj.removeEventListener.bind(obj);
  } else if (typeof obj.on === 'function' && typeof obj.off === 'function') {
    on = obj.on.bind(obj);
    off = obj.on.bind(obj);
  }
  return {
    on,
    off,
  };
}

function once(obj, eventType, handler) {
  const { on, off } = getEventOnOffFunctions(obj);
  const handlerWrapper = (...args) => {
    handler(...args);
    off(eventType, handlerWrapper);
  };
  on(eventType, handlerWrapper);
}

async function waitForEvent(obj, eventType, filterFunc) {
  await new Promise((resolve) => once(obj, eventType, eventFilter(filterFunc, resolve)));
}

const eventFilters = {
  TRUE: () => true,
  FALSE: () => false,
  KEY_L: (event) => event.key === 'l' || event.key === 'L',
  KEY_ARROW_DOWN: (event) => event.key === 'ArrowDown',
  KEY_ARROW_UP: (event) => event.key === 'ArrowUp',
  KEY_ENTER: (event) => event.key === 'Enter',
};

export {
  eventFilter,
  eventFilters,
  combineEventFilters,
  once,
  waitForEvent,
};
