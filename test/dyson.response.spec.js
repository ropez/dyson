var request = require('supertest'),
    dyson = require('../lib/dyson'),
    when = require('when'),
    _ = require('lodash'),
    configDefaults = require('../lib/response');

describe('dyson.response', function() {

    describe('.setValues', function() {

        it('should return a promise', function() {

            var actual = configDefaults.setValues({});

            actual.should.have.property('then');
            actual.then.should.be.a('function');
        });

        it('should render data based on template', function(done) {

            var template = {
                myFunction: function() {
                    return 'my function';
                },
                myString: 'my string',
                myBoolean: true,
                myNumber: 42,
                myArray: [1,2,3]
            };

            var expected = {
                myFunction: 'my function',
                myString: 'my string',
                myBoolean: true,
                myNumber: 42,
                myArray: [1,2,3]
            };

            configDefaults.setValues(template).then(function(actual) {

                _.isEqual(actual, expected).should.equal(true);
                done();

            });
        });

        it('should render array if template is an array', function(done) {

            var template = [
                function() {
                    return 'my function';
                },
                'my string',
                true,
                42,
                [1,2,3]
            ];

            var expected = [
                'my function',
                'my string',
                true,
                42,
                [1,2,3]
            ];

            configDefaults.setValues(template).then(function(actual) {

                _.isEqual(actual, expected).should.equal(true);
                done();

            });
        });

        it('should parse template objects iteratively', function(done) {

            var template = {
                myObject: {
                    myNestedObject: {
                        myDeepFunction: function() {
                            return 'my other function'
                        },
                        myDeepString: 'my other string'
                    }
                }
            };

            var expected = {
                myObject: {
                    myNestedObject: {
                        myDeepFunction: 'my other function',
                        myDeepString: 'my other string'
                    }
                }
            };

            configDefaults.setValues(template).then(function(actual) {

                _.isEqual(actual, expected).should.equal(true);
                done();

            });
        });

        it('should replace a promise with its resolved value', function(done) {

            var template = {
                myPromise: function() {
                    var deferred = when.defer();
                    setTimeout(function() {
                        deferred.resolve('my promise');
                    }, 10);
                    return deferred.promise;
                }
            };

            var expected = {
                myPromise: 'my promise'
            };

            configDefaults.setValues(template).then(function(actual) {

                _.isEqual(actual, expected).should.equal(true);
                done();

            });
        });
    });
});
