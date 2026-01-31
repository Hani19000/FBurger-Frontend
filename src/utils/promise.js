export const handle = (promise) => {
    return promise
        .then(data => [data, null])
        .catch(error => [null, error]);
};