export function pureKeyRemove(obj, key) {
  const { [key]: _unused, ...rest } = obj;
  return rest;
}

export function pureArrayRemove(arr, index) {
  if (index === undefined || index < 0 || index > arr.length) return arr;
  return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
}
