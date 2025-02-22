const storagePrefix = 'finTrac_';

const storage = {
    getToken: () => {
        return JSON.parse(window.sessionStorage.getItem(`${storagePrefix}token`));
    },
    setToken: (token) => {
        window.sessionStorage.setItem(`${storagePrefix}token`, JSON.stringify({ accessToken: token }));
    },
    clearToken: () => {
        window.sessionStorage.removeItem(`${storagePrefix}token`);
    },

    signOut: () => {
        window.sessionStorage.removeItem(`${storagePrefix}token`);
        window.sessionStorage.removeItem(`${storagePrefix}user`);
        return true;
    },
    setUser: (userData) => {
        window.sessionStorage.setItem(`${storagePrefix}user`, JSON.stringify({ user: userData }));
    },
    getUser: () => {
        return JSON.parse(window.sessionStorage.getItem(`${storagePrefix}user`));
    },
};

export default storage;
