const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    })
})

describe('Test POST /launches', () => {
    const launchDataWithoutDate = {
        mission: 'Arthur Mission',
        rocket: 'Explorer IS1',
        target: 'Kepler-1652 b',
    }

    const completeLaunchData = {
        ...launchDataWithoutDate,
        launchDate: new Date('December 22, 2030'),
    }
    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const launchDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseLaunchDate = new Date(response.body.launchDate).valueOf();
        expect(launchDate).toBe(responseLaunchDate);
        expect(response.body).toMatchObject(launchDataWithoutDate)
    })

    test('It should catch missing required properties', () => {

    })

    test('It should catch invalid dates', () => {

    })
})
