export const createPubSub = () => {
    const dict = {};
    return {
        subscribe: (eventName, callback) => {
            if (!dict[eventName]) {
                dict[eventName] = [];
            }
            dict[eventName].push(callback);
        },
        publish: (eventName) => {
            dict[eventName].forEach((callback) => callback());
        }
    }
}