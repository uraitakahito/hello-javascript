import { describe, expect, it } from 'vitest';

const request = require('supertest');
const app = require('../app.cjs');

describe('Get Endpoints (not mocking)', () => {
  it('/', async () => {
    const res = await request(app).get('/')
    expect(res.status).toEqual(200)
  })
})

describe('/static', () => {
  it('/static/stanford-bunny.jpg', async () => {
    const res = await request(app).get('/')
    expect(res.status).toEqual(200)
  })
})

describe('/hello-json-1', () => {
  it('/hello-json-1', async () => {
    const res = await request(app).get('/hello-json-1')
    expect(res.body.message).toEqual('Hello, JSON!')
    expect(res.status).toEqual(200)
  })
})
