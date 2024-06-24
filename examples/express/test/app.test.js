import { describe, expect, it } from 'vitest';

const request = require('supertest');
const app = require('../app.cjs');

describe('Get Endpoints', () => {
  it('/', async () => {
    const res = await request(app).get('/')
    expect(res.status).toEqual(200)
  })

  it('/static/stanford-bunny.jpg', async () => {
    const res = await request(app).get('/static/stanford-bunny.jpg')
    expect(res.status).toEqual(200)
  })

  it('/hello-json-1', async () => {
    const res = await request(app).get('/hello-json-1')
    expect(res.body.message).toEqual('Hello, JSON!')
    expect(res.status).toEqual(200)
  })
})
