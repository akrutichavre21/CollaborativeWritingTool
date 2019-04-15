export const storeData = (key, value) => {
    localStorage.setItem(key, value);
};

export const getData = (key) => {
    return localStorage.getItem(key);
};

export const removeData = (key) => {
    localStorage.removeItem(key);
};
