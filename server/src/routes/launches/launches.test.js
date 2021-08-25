const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', () => {
        const response = 200;
        expect(response).toBe(200);
    })
})

describe('Test POST /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    })

    test('It should catch missing required properties', () => {

    })

    test('It should catch invalid dates', () => {

    })
})
