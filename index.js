/**
 * Add interceptor inheritance to axios
 * @param {axios} axios default export of axios is an Axios instance mounted by "create" method
 * @returns {axios}
 */
module.exports = function axiosInheritance(axios) {
    const { create } = axios;
    const instances = [];

    // new instances "inherit" existing interceptors
    axios.create = function(...args) {
        const instance = create.apply(this, args);
        instances.push(instance);

        for (const type in axios.interceptors) {
            axios.interceptors[type].handlers.forEach(
                ({ fulfilled, rejected }) => instance.interceptors[type].use(fulfilled, rejected)
            );
        }

        return instance;
    };

    // new interceptors are being "inherited" to existing instances
    for (const type in axios.interceptors) {
        const { use } = axios.interceptors[type];

        axios.interceptors[type].use = function(...args) {
            const result = use.apply(axios.interceptors[type], args);
            instances.forEach(
                (instance) => instance.interceptors[type].use(...args)
            );
            return result;
        };
    }

    return axios;
};
