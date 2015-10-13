import assert from 'assert';
import request from 'supertest';
import chai from 'chai';
let expect = chai.expect;

import app from '../api/app.js';

describe('API v1', function(){

    it('GET /v1/node', function (done) {
        request(app)
            .get('/v1/node')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err){
                    done(err);
                    return;
                }

                expect(res.body).to.be.an('object');
                let node = res.body
                expect(node).to.have.property('title').that.is.an('string');
                expect(node).to.have.property('nodeVersion').that.is.an('string');
                expect(node).to.have.property('v8version').that.is.an('string');
                done();
            })
    });

    it('GET /v1/cpu', function (done) {
        request(app)
            .get('/v1/cpu')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err){
                    done(err);
                    return;
                }

                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('model').that.is.an('string');
                expect(res.body).to.have.property('times').that.is.an('object');
                const times = res.body.times
                expect(times).to.have.property('user').that.is.an('number');
                expect(times).to.have.property('sys').that.is.an('number');
                expect(times).to.have.property('idle').that.is.an('number');

                expect(res.body).to.have.property('percentUser').that.is.an('number');
                expect(res.body).to.have.property('percentSys').that.is.an('number');
                expect(res.body).to.have.property('percentIdle').that.is.an('number');
                done();
            })
    });

    it('GET /v1/mem', function (done) {
        request(app)
            .get('/v1/mem')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err){
                    done(err);
                    return;
                }

                expect(res.body).to.be.an('object');
                expect(res.body.kbfree).to.be.an('number');
                expect(res.body.kbused).to.be.an('number');
                expect(res.body.free).to.be.an('string');
                expect(res.body.used).to.be.an('string');
                expect(res.body.percentUsed).to.be.an('number');
                done();
            })
    });

    it('GET /v1/discs', function (done) {
        request(app)
            .get('/v1/discs')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if(err){
                    done(err);
                    return;
                }

                expect(res.body).to.be.an('array');
                let disc0 = res.body[0];
                expect(disc0).to.be.an('object');
                expect(disc0).to.have.property('free').that.is.an('number');
                expect(disc0).to.have.property('percent').that.is.an('number');
                expect(disc0).to.have.property('filesystem').that.is.an('string');
                done();
            })
    });

    //it('GET /v1/discsIO', function (done) {
    //    request(app)
    //        .get('/v1/discsIO')
    //        .expect('Content-Type', /json/)
    //        .expect(200)
    //        .end(function(err, res){
    //            if(err){
    //                done(err);
    //                return;
    //            }
    //
    //            expect(res.body).to.be.an('object');
    //            expect(res.body).to.have.property('totalRequestPerSecond').that.is.an('number');
    //            expect(res.body).to.have.property('blockWritesPerSecond').that.is.an('number');
    //            done();
    //        })
    //});

    it('GET /v1/netIO', function (done) {
        request(app)
            .get('/v1/netIO')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err){
                    done(err);
                    return;
                }

                expect(res.body).to.be.an('array');
                let interface0 = res.body[0];
                expect(interface0).to.be.an('object');
                expect(interface0).to.have.property('interface').that.is.an('string');
                expect(interface0).to.have.property('RXbitrate').that.is.an('string');
                expect(interface0).to.have.property('TXbitrate').that.is.an('string');
                expect(interface0).to.have.property('time').that.is.an('number');
                expect(interface0).to.have.property('address').that.is.an('string');
                done();
            })
    });

    it('GET /v1/ping', function (done) {
        request(app)
            .get('/v1/ping')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err){
                    done(err);
                    return;
                }

                expect(res.body).to.be.an('array');
                let pingNac = res.body[0];
                let pingInt = res.body[1];
                expect(pingNac).to.be.an('object');
                expect(pingNac).to.have.property('avg').that.is.an('number');
                expect(pingNac).to.have.property('address').that.is.an('string');
                expect(pingInt).to.be.an('object');
                expect(pingInt).to.have.property('avg').that.is.an('number');
                expect(pingInt).to.have.property('address').that.is.an('string');
                done();
            })
    });

    it('GET /v1/ping/jaidefinichon.cl', function (done) {
        request(app)
            .get('/v1/ping/jaidefinichon.cl')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err){
                    done(err);
                    return;
                }

                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('address').that.is.equals('jaidefinichon.cl');
                expect(res.body).to.have.property('avg').that.is.an('number');
                done();
            })
    });
});