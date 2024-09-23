//reducing the class backs
const deBounce = (func, delay) => {
  let timeId;
  return (...args) => {
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
