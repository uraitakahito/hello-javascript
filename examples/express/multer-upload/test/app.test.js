import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../app.mjs';

describe('Get Endpoints', () => {
  it('/upload', async () => {
    const res = await request(app).get('/upload')
    expect(res.status).toEqual(200)
  })
});
