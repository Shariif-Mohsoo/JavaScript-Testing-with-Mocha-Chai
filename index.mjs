export default {
  forEach(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];
      fn(value, i);
    }
  },
  map(arr, fn) {
    let array = [];
    for (let idx in arr) {
      let value = arr[idx];
      array.push(fn(value, idx));
    }
    return array;
  },
};
