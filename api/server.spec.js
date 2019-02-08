const request = require('supertest');
const server = require('./server')
const db = require('../data/dbConfig');

describe('the route handlers', () => {
    
    describe('post /', () => {
        afterEach(async () => {
            await db('players').truncate();
        });

        it('responds with 201', async () => {
            const body = { name: "squishy" }
            const response = await request(server).post('/').send(body);
            expect(response.status).toBe(201);
        });

        it('responds with 400 when missing body data', async () => {
            body = {}
            const response = await request(server).post('/').send(body);
            expect(response.status).toBe(400);
        });
    });

    describe('delete /:id', () => {
        it('responds with status code 201', async () => {
            const response = await request(server).delete('/1')
            expect(response.status).toBe(202)
        });

        it('responds with 400 when id does not exist', async () => {
            const response = await request(server).delete('/1');
            expect(response.status).toBe(400);
        });
    })
})