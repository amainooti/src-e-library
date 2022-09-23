export const addToLocalStorage = (key, value) => {
  if (typeof value !== "string") value = JSON.stringify(value);
  try {
    return localStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getFromLocalStorage = (key) => {
  try {
    return localStorage.getItem(key) || "";
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const emptyFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
