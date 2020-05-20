const TYPES = ['request', 'response'];

module.exports = function axiosInheritance(axios) {
    const { create } = axios;
    const instances = [];

    // new instances "inherit" existing interceptors
    axios.create = function(...args) {
        const instance = create.apply(this, args);
        instances.push(instance);

        TYPES.forEach(
            (type) => axios.interceptors[type].handlers.forEach(
                ({ fulfilled, rejected }) => instance.interceptors[type].use(fulfilled, rejected)
            )
        );

        return instance;
    };

    // new interceptors are being "inherited" to existing instances
    TYPES.forEach(
        (type) => {
            const { use } = axios.interceptors[type];

            axios.interceptors[type].use = function(...args) {
                const result = use.apply(axios.interceptors[type], args);
                instances.forEach(
                    (instance) => instance.interceptors[type].use(...args)
                );
                return result;
            };
        }
    );
};