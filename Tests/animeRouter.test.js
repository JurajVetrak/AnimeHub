const request = require('supertest');
const express = require('express');
const animeRouter = require('../BackEnd/api/animeRouter');

jest.mock('../BackEnd/db', () => ({
  getDatabaseInstance: () => ({
    query: jest.fn().mockResolvedValue([[]]),
  }),
  idExists: jest.fn().mockResolvedValue(true),
}));

const app = express();
app.use(animeRouter);

describe('Anime Router', () => {

  it('returns anime section wise', async () => {
    const res = await request(app).get('/popular/1').set('user_id', '22');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('returns error for unknown section', async () => {
    const res = await request(app).get('/unknown/10').set('user_id', '22');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('success', false);
  });

  it('returns anime list by filters', async () => {
    const res = await request(app).get('/filter?genre=ALL').set('user_id', '22');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('returns error for invalid genre', async () => {
    const res = await request(app).get('/filter?genre=INVALID').set('user_id', '22');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', false);
  });

  it('returns results of a search query', async () => {
    const res = await request(app).get('/search?search_query=naruto').set('user_id', '22');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('returns error for invalid query', async () => {
    const res = await request(app).get('/search?search_query=').set('user_id', '22');
    expect(res.statusCode).toEqual(500);
  });

  it('returns error for no anime found', async () => {
    const res = await request(app).get('/0').set('user_id', '22');
    expect(res.statusCode).toEqual(500);
  });

});