const chai = require('chai');
const expect = chai.expect;
const dotenv = require('dotenv');
const url = 'http://localhost:3001/'
const request = require('supertest')(url);
const Owner = require('../owner/Owner');
const Restaurant = require('./Restaurant');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

console.groupEnd();

describe('restaurant', () => {

    dbUrl = 'mongodb://masterChef:90IqJ8ikNnRsyLj@localhost:27017/rpos';
    // dbUrl = process.env.MONGODB_URI;
    dbConnectedMessage = 'DB Connected';
    dbDisconnectedMessage = 'DB Disconnected \n';
    testerEmail = 'auth_tester@mail.com';
    testerNumber = '9009009000';
    testerId = '';


    before((done) => {
        console.groupEnd(); 
        console.group();
        console.log('\x1b[36m%s\x1b[2m', '======Before');
        dotenv.config();
        mongoose.connect(dbUrl, {
            useCreateIndex: true,
            useNewUrlParser: true
        }, (err, data) => {
            err ? console.log('ERROR', err) : console.debug(dbConnectedMessage);
        });
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
                        testerId = data._id;

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
            })
            .catch(err => {
                console.log(err);
                mongoose.disconnect();
                console.log(dbDisconnectedMessage);
            });

        Restaurant.deleteOne({
                code: "TEST"
            })
            .then(data => {
                console.log('Deleting test restaurant', JSON.stringify(data));
                mongoose.disconnect();
                console.log(dbDisconnectedMessage);
                done();
            })
            .catch(err => {
                console.log(err);
                mongoose.disconnect();
                console.log(dbDisconnectedMessage);
                done();

            });

    });


    context('createRestaurant', () => {
        it('should be able to createRestaurant', (done) => {
            request.post('graphql')
                .send({
                    query: `mutation createRestaurant($restaurantInput: RestaurantInput){
                        createRestaurant(restaurantInput: $restaurantInput) {
                          data{
                            _id
                            name
                          }
                          error
                        }
                      }                      
                    `,
                    variables: `
                    {
                        "restaurantInput": {
                          "name": "Test Restaurant", 
                          "code": "TEST", 
                          "address": "Test Address 69",  
                          "phone": "` + testerNumber + `",  
                          "email": "` + testerEmail + `",  
                          "owner": "` + testerId + `"
                        } 
                    }
                    `
                })
                .expect(200)
                .end((err, res) => {
                    // console.log(res.body);

                    if (err) return done(err);
                    if (!res.body.data.createRestaurant.data) return done(new Error('Data is Null ' + JSON.stringify(res.body.data.createRestaurant)));
                    expect(res.body.data.createRestaurant.data[0]).to.have.property('_id');
                    expect(res.body.data.createRestaurant.data[0]).to.have.property('name');
                    done();
                })
        });

        it('should NOT be able to createRestaurant', (done) => {
            request.post('graphql')
                .send({
                    query: `mutation createRestaurant($restaurantInput: RestaurantInput){
                        createRestaurant(restaurantInput: $restaurantInput) {
                          data{
                            _id
                            name
                          }
                          error
                        }
                      }                      
                    `,
                    variables: `
                    {
                        "restaurantInput": {
                          "name": "Test Restaurant", 
                          "code": "TEST", 
                          "address": "Test Address 69",  
                          "phone": "` + testerNumber + `",  
                          "email": "` + testerEmail + `",  
                          "owner": "` + testerId + `"
                        } 
                    }
                    `
                })
                .expect(200)
                .end((err, res) => {
                    // console.log(res.body);
    
                    if (err) return done(err);
                    if (!res.body.data.createRestaurant.error) return done(new Error('Error is Null ' + JSON.stringify(res.body.data.createRestaurant)));
                    expect(res.body.data.createRestaurant.error).to.not.null;
                    done();
                })
        });
    });


});