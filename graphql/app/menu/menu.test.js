const chai = require('chai');
const expect = chai.expect;
const dotenv = require('dotenv');
const url = 'http://localhost:3001/'
const request = require('supertest')(url);
const Owner = require('../owner/Owner');
const Restaurant = require('../restaurant/Restaurant');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

console.groupEnd();

describe('menu', () => {

    dbUrl = 'mongodb://masterChef:90IqJ8ikNnRsyLj@localhost:27017/rpos';
    // dbUrl = process.env.MONGODB_URI;
    dbConnectedMessage = 'DB Connected';
    dbDisconnectedMessage = 'DB Disconnected \n';
    testerEmail = 'menu_tester@mail.com';
    testerNumber = '9009009003';
    testerId = '';
    restaurantId = '';


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
                        Restaurant.create({
                                owner: testerId,
                                name: "test restaurant",
                                email: testerEmail,
                                phone: testerNumber,
                                address: "Test Address 51",
                                code: "TEST",
                                addedOn: today
                            })
                            .then(data => {
                                console.log('Created Test Restaurant');
                                restaurantId = data._id;
                                mongoose.disconnect();
                                done();
                            })
                            .catch(err => {
                                console.log('Unable to create test restaurant', JSON.stringify(err.message));
                                done();
                            })
                        console.debug(dbDisconnectedMessage);
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
                    query: `
                    mutation CreateMenu($menuInput: MenuInput){
                        # input type MenuInput is defined in the backend TypeDef
                        createMenu(menuInput: $menuInput){
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
                        "menuInput": {
                          "name": "Test Restaurant", 
                          "restaurant" : "`+restaurantId+`"
                        } 
                    }
                    `
                })
                .expect(200)
                .end((err, res) => {
                    // console.log(res.body);

                    if (err) return done(err);
                    if (!res.body.data.createMenu.data) return done(new Error('Data is Null ' + JSON.stringify(res.body.data.createRestaurant)));
                    expect(res.body.data.createMenu.data[0]).to.have.property('_id');
                    expect(res.body.data.createMenu.data[0]).to.have.property('name');
                    done();
                })
        });
    });


});