const React = require('react');

const storage = {
    getString: (key) => localStorage.getItem(key),
    setString: (key, value) => localStorage.setItem(key, value),
    getInt: (key) => parseInt(localStorage.getItem(key) || 0),
    setInt: (key, value) => localStorage.setItem(key, value.toString()),
    getBool: (key) => localStorage.getItem(key) === 'true',
    setBool: (key, value) => localStorage.setItem(key, value.toString()),
    getArray: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
    setArray: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    setMap: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    getMap: (key) => JSON.parse(localStorage.getItem(key) || '{}'),
    removeItem: (key) => localStorage.removeItem(key),
    clearStore: () => localStorage.clear(),
};

const MMKVLoader = class {
    initialize() {
        return storage;
    }
};

const useMMKVStorage = (key, storage, defaultValue) => {
    const [value, setValue] = React.useState(() => {
        const stored = localStorage.getItem(key);
        if (stored === null) return defaultValue;
        try {
            return JSON.parse(stored);
        } catch {
            return stored;
        }
    });

    const set = (newValue) => {
        setValue(newValue);
        if (newValue === undefined || newValue === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, typeof newValue === 'string' ? newValue : JSON.stringify(newValue));
        }
    };

    return [value, set];
};

module.exports = {
    MMKVLoader,
    useMMKVStorage,
};
