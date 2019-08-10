const chai = require('chai');
const expect = chai.expect;
const dotenv = require('dotenv');
const url = 'http://localhost:3001/'
const request = require('supertest')(url);
const Owner = require('../owner/Owner');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


describe('auth', () => {

    dbUrl = 'mongodb://masterChef:90IqJ8ikNnRsyLj@localhost:27017/rpos';
    // dbUrl = process.env.MONGODB_URI;
    dbConnectedMessage = 'DB Connected';
    dbDisconnectedMessage = 'DB Disconnected \n';
    testerEmail = 'auth_tester@mail.com';
    testerNumber = '9009009000';


    before((done) => {
        console.group();
        console.log('\x1b[36m%s\x1b[2m', '======Before');
        dotenv.config();
        mongoose.connect(dbUrl, {
            useCreateIndex: true,
            useNewUrlParser: true
        }, (err, data) => {
            err ? console.log('ERROR', err) : console.debug(dbConnectedMessage);
        })
        const today = new Date();
        bcrypt.hash('testPass', 12)
            .then(encryptedPass => {
                Owner.create({
                        name: "test user",
                        email: testerEmail,
                        phone: testerNumber,
                        pwd: encryptedPass,
                        addedOn: today
                    })
                    .then(data => {
                        console.log('Created a test user');
                        // console.log(JSON.stringify(data));
                        
                        mongoose.disconnect();
                        console.debug(dbDisconnectedMessage);
                        done();
                    })
                    .catch(err => {
                        console.log(JSON.stringify(err));
                        mongoose.disconnect();
                        console.debug(dbDisconnectedMessage);
                        done();
                    });
            });

    });

    after((done) => {

        console.log('\n\x1b[36m%s\x1b[2m', '======After');
        mongoose.connect(dbUrl, {
            useCreateIndex: true,
            useNewUrlParser: true
        }, (err, data) => {
            err ? console.log('ERROR', err) : console.debug(dbConnectedMessage);
        }).then(data => {
            // done();
        });

        Owner.deleteMany({
                email: {
                    $in: [testerEmail]
                }
            })
            .then(data => {
                console.log('Deleting test users', JSON.stringify(data));
                mongoose.disconnect();
                console.log(dbDisconnectedMessage);
                console.groupEnd();

                done();
            })
            .catch(err => {
                console.log(err);
                mongoose.disconnect();
                console.log(dbDisconnectedMessage);
                console.groupEnd();

                done();

            });
    });
    context('login', () => {
        it('should be able to login', (done) => {
            request.post('graphql')
                .send({
                    query: `
                    {
                        login(login: {
                            username: "`+testerEmail+`",
                            pwd: "testPass"
                        }) {
                            data {
                                userId
                                token
                                tokenExpiration 
                            } 
                            error
                        } 
                    }`
                })
                .expect(200)
                .end((err, res) => {
                    // console.log(res.body);

                    if (err) return done(err);
                    if (!res.body.data.login.data) return done(new Error('Data is Null ' + JSON.stringify(res.body.data.login)));
                    expect(res.body.data.login.data).to.have.property('userId');
                    expect(res.body.data.login.data).to.have.property('userId');
                    expect(res.body.data.login.data).to.have.property('token');
                    expect(res.body.data.login.data).to.have.property('tokenExpiration');
                    done();
                })
        });
        it('should NOT be able to login', (done) => {
            request.post('graphql')
                .send({
                    query: `
                    {
                        login(login: {
                            username: "`+testerEmail+`",
                            pwd: "wrongPass"
                        }) {
                            data {
                                userId
                                token
                                tokenExpiration 
                            } 
                            error
                        } 
                    }`
                })
                .expect(200)
                .end((err, res) => {
                    // console.log(res.body);

                    if (err) return done(err);
                    if (!res.body.data.login.error) return done(new Error('Error is Null ' + JSON.stringify(res.body.data.login)));
                    expect(res.body.data.login.error).to.not.null;
                    done();
                })
        });
    })
});