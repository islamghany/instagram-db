const request = require('supertest');

const buildApp = require('../../app');
const User = require('../../repo/user-repo');
const pool = require('../../pool');
beforeAll(()=>{
  return pool.connect({
    host:'localhost',
    port:5432,
    name:'DATABASE_NAME',
    user:'USERNAME',
    password:'PASSWORD'
  });
})

afterAll(()=>{
  return pool.close();
})
it('create a user',async ()=>{
  const startingCount = await User.count();
  expect(startingCount).toEqual(0);
  await request(buildApp())
  .post('/users')
  .send({username:'testuser',bio:'test bio'})
  .expect(200);
  const finishCount = await User.count();
  expect(finishCount).toEqual(1);
})
