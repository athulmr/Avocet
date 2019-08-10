const chai = require('chai');
const expect = chai.expect;
const dotenv = require('dotenv');
const url = 'http://localhost:3001/'
const request = require('supertest')(url);
const Owner = require('./Owner');
const mongoose = require('mongoose');



describe('owner', () => {
    context('createOwner', () => {
        before((done) =>{
            console.log('======Before');
            dotenv.config();
            mongoose.connect(process.env.MONGODB_URI, {
                useCreateIndex: true,
                useNewUrlParser: true
              }, (err,data) => {
                err ? console.log('ERROR', err) : console.debug ('💾  Connected to Database');
            })
            const today = new Date();
            Owner.create({name: "test user", email: "already-existing_tester@mail.com", phone: "9009009001", pwd: "testPass", addedOn: today})
            .then( data => {
                console.log('Created already existing test user');
                mongoose.disconnect();
                console.debug ('💾  Disconnected');
                done();
            })
            .catch( err => {
                console.log(err);
                mongoose.disconnect();
                done();
                
            });;
        });

        after((done) => {

            console.log('======After');
            mongoose.connect(process.env.MONGODB_URI, {
                useCreateIndex: true,
                useNewUrlParser: true
              }, (err,data) => {
                err ? console.log('ERROR', err) : console.debug ('💾  Connected to Database');
            }).then( data => {
                // done();
            });

            Owner.deleteMany({ name: 'test user' })
            .then( data => {
                console.log('Deleting test user',data);
                mongoose.disconnect();
                console.debug ('💾  Disconnected');
                done();
            })
            .catch( err => {
                console.log(err);
                mongoose.disconnect();
                console.debug ('💾  Disconnected');
                done();
                
            });;
        })

        it('should be able to createOwner', (done) => {
            request.post('graphql')
                .send({
                    query: 'mutation {createOwner(ownerInput: {name: "test user", email: "testuser@mail.com", phone: "9009009000", pwd: "testPass"}) {data{ _id } error}}'
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

        it('should not be able to createOwner', (done) => {
            request.post('graphql')
                .send({
                    query: 'mutation {createOwner(ownerInput: {name: "already existing test user", email: "already-existing_tester@mail.com", phone: "199900900900", pwd: "testPass"}) {data{ _id } error}}'
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

        it('should be able to get owners', (done) => {
            request.post('graphql')
                .send({
                    query: 'query {owners(owner: {name: "test user"}) {_id name}}'
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
    })
});