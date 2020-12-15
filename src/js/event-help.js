function eventFilter(filterFunc, handler) {
  return (event) => {
    if (filterFunc(event)) {
      handler(event);
    }
  };
}

function combineEventFilter(...eventFilters) {
  return (event) => eventFilters.forEach((ef) => ef(event));
}

const eventFilters = {
  KEY_L: (event) => event.key === 'l' || event.key === 'L',
};

export { eventFilter, eventFilters, combineEventFilter };
