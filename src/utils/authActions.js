let logoutFunction = null;

export const registerLogout = (fn) => {
    logoutFunction = fn;
};

export const executeLogout = () => {
    if (logoutFunction) logoutFunction();
};