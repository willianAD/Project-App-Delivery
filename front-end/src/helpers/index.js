export const setLocalStorage = (storages) => {
  storages.forEach((storage) => {
    localStorage.setItem(storage.name, JSON.stringify(storage.value));
  });
};

export const getLocalStorage = (storage) => {
  const item = localStorage.getItem(storage);
  if (item === null) return null;
  return JSON.parse(item);
};
