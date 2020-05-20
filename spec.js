const { expect } = require('chai');
const clearModule = require('clear-module');
const axios = require('axios');
const axiosInheritance = require('.');

describe('axios instance inherits interceptors', () => {
    Object.keys(axios.interceptors).forEach((type) => describe(type, () => {
        afterEach(() => {
            clearModule('axios');
        });
        it('should create instance with none of the parents interceptors', () => {
            const axios = require('axios');
            const fulfilledHandler = () => null;
            const rejectedHandler = () => null;
            axios.interceptors[type].use(fulfilledHandler, rejectedHandler);
            const instance = axios.create();
            expect(instance.interceptors[type].handlers).to.be.lengthOf(0);
        });
        it('should create instance with the parents interceptors', () => {
            const axios = require('axios');
            axiosInheritance(axios);
            const fulfilledHandler = () => null;
            const rejectedHandler = () => null;
            axios.interceptors[type].use(fulfilledHandler, rejectedHandler);
            const instance = axios.create();
            expect(instance.interceptors[type].handlers).to.be.lengthOf(1);
        });
        it('should be the same functions as the parents interceptors', () => {
            const axios = require('axios');
            axiosInheritance(axios);
            const fulfilledHandler = () => null;
            const rejectedHandler = () => null;
            axios.interceptors[type].use(fulfilledHandler, rejectedHandler);
            const instance = axios.create();
            const [{ fulfilled, rejected }] = instance.interceptors[type].handlers;
            expect(fulfilled).to.equal(fulfilledHandler);
            expect(rejected).to.equal(rejectedHandler);
        });
        it('should "inherit" interceptors that were introduced to the parents after creation', () => {
            const axios = require('axios');
            axiosInheritance(axios);
            const fulfilledHandler = () => null;
            const rejectedHandler = () => null;
            const instance = axios.create();
            axios.interceptors[type].use(fulfilledHandler, rejectedHandler);
            const [{ fulfilled, rejected }] = instance.interceptors[type].handlers;
            expect(fulfilled).to.equal(fulfilledHandler);
            expect(rejected).to.equal(rejectedHandler);
        });
    }));
});
