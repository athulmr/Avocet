const chai = require('chai');
const expect = chai.expect;
const dotenv = require('dotenv');
const url = 'http://localhost:3001/'
const request = require('supertest')(url);
const Owner = require('./Owner');
const mongoose = require('mongoose');


describe('owner', () => {
    
    
    dbUrl = 'mongodb://masterChef:90IqJ8ikNnRsyLj@localhost:27017/rpos';
    // dbUrl = process.env.MONGODB_URI;
    dbConnectedMessage = 'DB Connected';
    dbDisconnectedMessage = 'DB Disconnected \n';
    testerEmail = 'tester@mail.com';
    testerNumber = '9009009001';
    preExistTesterEmail = 'pre_tester_2@mail.com';
    preExistTesterNumber = '9009009002';
    
    
    before((done) => {
        console.groupEnd(); 
        console.group();
        console.log('\x1b[36m%s\x1b[2m', '======Before\n');
        done()
    });

    after((done) => {

        console.log('\x1b[36m%s\x1b[2m', '\n======After');
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
                    $in: [testerEmail, preExistTesterEmail]
                }
            })
            .then(data => {
                console.log('Deleting test users', JSON.stringify(data));
                mongoose.disconnect();
                console.debug(dbDisconnectedMessage);
                done();
            })
            .catch(err => {
                console.log(err);
                mongoose.disconnect();
                console.debug(dbDisconnectedMessage);
                done();

            });;
    });

    context('createOwner', () => {

        it('should be able to createOwner', (done) => {
            request.post('graphql')
                .send({
                    query: `
                    mutation 
                    {
                        createOwner(ownerInput: {
                            name: "test user",
                            email: "`+testerEmail+`",
                            phone: "`+testerNumber+`",
                            pwd: "testPass"
                        }) {
                            data{
                                _id
                            }
                            error
                        }
                    }`
                })
                .expect(200)
                .end((err, res) => {
                    // console.log(res.body);

                    if (err) return done(err);
                    expect(res.body.data.createOwner.data).to.not.null;
                    expect(res.body.data.createOwner.data).to.have.property('_id')
                    done();
                });

        });

        it('should NOT be able to createOwner', (done) => {
            request.post('graphql')
                .send({
                    query: `
                    mutation {
                        createOwner(ownerInput: {
                            name: "test user",
                            email: "`+testerEmail+`",
                            phone: "`+preExistTesterNumber+`",
                            pwd: "testPass"
                        }) {
                            data{ 
                                _id
                            } 
                            error
                        }
                    }                    `
                })
                .expect(200)
                .end((err, res) => {
                    // console.log(res.body);

                    if (err) return done(err);
                    expect(res.body.data.createOwner.error).to.not.null;
                    expect(res.body.data.createOwner.data).to.null;
                    done();
                });

        });
    });

    context('owners', () => {
        it('should be able to get owners', (done) => {
            request.post('graphql')
                .send({
                    query: `
                    query findOwners($owner: OwnerInput){
                        owners(owner: $owner) {
                          _id
                          name
                        }  
                      }
                    `,
                    variables: `
                    {
                        "owner": {
                            "email": "`+testerEmail+`"
                        }
                    }
                    `
                })
                .expect(200)
                .end((err, res) => {
                    // console.log(res.body.data.owners);

                    if (err) return done(err);
                    expect(res.body.data.owners).to.not.null;
                    expect(res.body.data.owners[0]).to.have.property('_id')
                    expect(res.body.data.owners[0]).to.have.property('name')
                    done();
                });

        });
    });
});