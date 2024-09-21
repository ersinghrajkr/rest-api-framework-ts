import { getRequest } from '../utils/request'
import { expect } from 'chai';

describe('Login Test Suite', async function () {
    // before(() => {
    //     console.log("Before Test");
    // })

    // after(() => {
    //     console.log("After Test");
    // })

    // beforeEach(() => {
    //     console.log("beforeEach Test");
    // })

    // afterEach(() => {
    //     console.log("afterEach Test");
    // })

    it('Login with valid credentials', async function () {
        let payload = {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
        const response = await getRequest().post('/api/login')
            .set('Accept', 'application/json')
            .send(payload)
            expect(response.status).to.equal(200);
            console.log("response", response.body);
    })
})