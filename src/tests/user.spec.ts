import { getRequest, request, sendRequest } from '../utils/request'
import { expect } from 'chai';

describe('User Test Suite', async function () {

    beforeEach(function () {
    });


    it('Get user by Id', async function () {
        const response = await getRequest().get('/api/user/2').set('Accept', 'application/json')
        expect(response.status).to.equal(200);
        console.log("Get user by Id response", response.body);
    })

    it('Create UserQQQQ', async function () {
        const requestBody = {
            username: 'user1',
            password: 'password123'
        };

        const req = request.post('/api/users').send(requestBody);
        // console.log("REQUESTTTTTTTTTTTTT ------", (await req).body);
        const res = await sendRequest(this, req, requestBody);
        expect(res.status).to.equal(200);

        // Log the request and response body for reporting
        console.log('Request Body:', this.test?.requestBody);
        console.log('Response Body:', this.test?.responseBody);

    })

    it('Create User', async function () {
        let payload = {
            "name": "morpheus",
            "job": "leader"
        }
        const req = request.post('/api/users').send(payload);
        const res = await sendRequest(this, req, payload);
        // const response = await getRequest().post('/api/users')
        //     .set('Accept', 'application/json')
        //     .send(payload)
        expect(res.status).to.equal(200);
        console.log("Create User response", res.body);
    })
})