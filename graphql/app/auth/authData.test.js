const chai = require('chai');
const expect = chai.expect;
const url = 'http://localhost:3001/'
const request = require('supertest')(url);


describe('auth', () => {
    context('login', () => {
        it('should be able to login', (done) => {
            request.post('graphql')
                .send({
                    query: '{login(login: {username: "athul@mail.com", pwd: "passme"}) {data {userId token tokenExpiration } error} }'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data.login.data).to.have.property('userId')
                    expect(res.body.data.login.data).to.have.property('token')
                    expect(res.body.data.login.data).to.have.property('tokenExpiration')
                    done();
                })
        })
    })
});