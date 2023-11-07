const request = require('supertest');
const app = require('../index.js');

describe('User-login Endpoints', () => {
    it('User Login Test [passed]', async () => {
        const res = await request(app)
          .post('/user-login')
          .send({
            Useremail: 'testemail@gmail.com', 
            Userpassword: 'TestPass123', 
          });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
    });

    it('User Login Test [failed][password is not correctly]', async () => {
        const res = await request(app)
          .post('/user-login')
          .send({
            Useremail: 'testemail@gmail.com', 
            Userpassword: 'TestPass124433', 
          });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('User Login Test [failed][email is not correctly]', async () => {
        const res = await request(app)
          .post('/user-login')
          .send({
            Useremail: 'testema1il@gmail.com', 
            Userpassword: 'TestPass123', 
          });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});