const { expect } = require('chai');
const clearModule = require('clear-module');
const axios = require('axios');
const axiosInherit = require('.');

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
            axiosInherit(axios);
            const fulfilledHandler = () => null;
            const rejectedHandler = () => null;
            axios.interceptors[type].use(fulfilledHandler, rejectedHandler);
            const instance = axios.create();
            expect(instance.interceptors[type].handlers).to.be.lengthOf(1);
        });
        it('should be the same functions as the parents interceptors', () => {
            const axios = require('axios');
            axiosInherit(axios);
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
            axiosInherit(axios);
            const fulfilledHandler = () => null;
            const rejectedHandler = () => null;
            const instance = axios.create();
            axios.interceptors[type].use(fulfilledHandler, rejectedHandler);
            const [{ fulfilled, rejected }] = instance.interceptors[type].handlers;
            expect(fulfilled).to.equal(fulfilledHandler);
            expect(rejected).to.equal(rejectedHandler);
        });
        it('should eject interceptors from children', () => {
            const axios = require('axios');
            axiosInherit(axios);
            const fulfilledHandler = () => null;
            const rejectedHandler = () => null;
            const instance = axios.create();
            const interceptor = axios.interceptors[type].use(fulfilledHandler, rejectedHandler);
            expect(instance.interceptors[type].handlers.filter(Boolean)).to.be.lengthOf(1);
            axios.interceptors[type].eject(interceptor);
            expect(instance.interceptors[type].handlers.filter(Boolean)).to.be.lengthOf(0);
        });
        it('should apply inheritance in a one directional manner', () => {
            const axios = require('axios');
            axiosInherit(axios);
            const fulfilledHandler = () => null;
            const rejectedHandler = () => null;
            const instance = axios.create();
            instance.interceptors[type].use(fulfilledHandler, rejectedHandler);
            expect(axios.interceptors[type].handlers).to.be.lengthOf(0);
        });
        it('should be able to remove a default header from instance w/o affecting the parent', () => {
            const axios = require('axios');
            const someHeaders = () => ({
                'Accept': 'application/json',
                'X-Custom-Header': 'something'
            });
            const allHeaders = () => ({
                ...someHeaders(),
                'X-Other-Header': 'something-else'
            });
            Object.assign( axios.defaults.headers.common, allHeaders() );
            const instance = axios.create();
            expect(instance.defaults.headers.common).to.deep.equal(allHeaders());
            delete instance.defaults.headers.common['X-Other-Header'];
            expect(axios.defaults.headers.common).to.deep.equal(allHeaders());
            expect(instance.defaults.headers.common).not.to.deep.equal(allHeaders());
            expect(instance.defaults.headers.common).to.deep.equal(someHeaders());
        });
    }));
});
