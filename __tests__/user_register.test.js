const request = require('supertest');
const app = require('../index.js');

describe('User-register Endpoints', () => {
    it('User Register Test [passed]', async () => {
        const res = await request(app)
          .post('/user-register')
          .send({
            Username: 'testname1', 
            Useremail: 'testemail1@gmail.com', 
            Userpassword: 'TestPass123', 
            Userrole: 'User'
          });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
    });

    it('User Register Test [failed][users is already been created]', async () => {
        const res = await request(app)
          .post('/user-register')
          .send({
            Username: 'testname', 
            Useremail: 'testemail@gmail.com', 
            Userpassword: 'TestPass123', 
            Userrole: 'User'
          });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
      });
});