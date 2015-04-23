var should = require('should');
var requirejs = require("requirejs");
var parser = require("../parser.js").parse;
var assert = require('assert');

describe('Parse Tests', function() {
    context('Hello World', function() {
        it('should parse without error', function(done) {
            parser('./test/data/hello.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    // I've been told this is failing due to a feature that was removed
    // but will be added back later, so I let this just chill here.
    context('Variable Declarations', function() {
        it('should parse without error', function(done) {
            parser('./test/data/variables.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    context('For Loop', function() {
        it('should parse without error', function(done) {
            parser('./test/data/for.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    context('While Loop', function() {
        it('should parse without error', function(done) {
            parser('./test/data/while.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    context('Arrays', function() {
        it('should parse without error', function(done) {
            parser('./test/data/arrays.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    context('Functions', function() {
        it('should parse without error', function(done) {
            parser('./test/data/function.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    context('Input/Output', function() {
        it('should parse without error', function(done) {
            parser('./test/data/io.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    context('If and Else Statements', function() {
        it('should parse without error', function(done) {
            parser('./test/data/ifelse.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    context('Attributes', function() {
        it('should parse without error', function(done) {
            parser('./test/data/attributes.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    context('Do While Loop', function() {
        it('should parse without error', function(done) {
            parser('./test/data/dowhile.nix', function(stuff) {
                assert(stuff !== false);
                done();
            });
        });
    });

    context('Broken Hello World', function() {
        it('should throw error', function(done) {
            try {
                parser('./test/data/broken/hello.nix', function(stuff) {});
                should.fail('no error was thrown when it should have been')
            } catch (error) {
                done();
            }
        });
    });


    context('Broken Variable Declarations', function() {
        it('should throw error', function(done) {
            try {
                parser('./test/data/broken/variables.nix', function(stuff) {});
                should.fail('no error was thrown when it should have been')
            } catch (error) {
                done();
            }
        });

    });

    context('Broken For Loop', function() {

        it('should throw error', function(done) {
            try {
                parser('./test/data/broken/for.nix', function(stuff) {});
                should.fail('no error was thrown when it should have been')
            } catch (error) {
                done();
            }
        });

    });

    context('Broken While Loop', function() {
        it('should throw error', function(done) {
            try {
                parser('./test/data/broken/while.nix', function(stuff) {});
                should.fail('no error was thrown when it should have been')
            } catch (error) {
                done();
            }
        });

    });
    context('Broken Arrays', function() {
        it('should throw error', function(done) {
            try {
                parser('./test/data/broken/arrays.nix', function(stuff) {});
                should.fail('no error was thrown when it should have been')
            } catch (error) {
                done();
            }
        });

    });

    context('Broken Attributes', function() {
        it('should throw error', function(done) {
            try {
                parser('./test/data/broken/attributes.nix', function(stuff) {});
                should.fail('no error was thrown when it should have been')
            } catch (error) {
                done();
            }
        });

    });

    context('Broken Function', function() {
        it('should throw error', function(done) {
            try {
                (parser('./test/data/broken/function.nix', function(stuff) {}))
                should.fail('no error was thrown when it should have been')
            } catch (error) {
                done();
            }
        });

    });

    context('Broken Do While', function() {
        it('should throw error', function(done) {
            try {
                parser('./test/data/broken/dowhile.nix', function(stuff) {});
                should.fail('no error was thrown when it should have been')
            } catch (error) {
                done();
            }
        });
    });

    context('Broken If Else', function() {
        it('should throw error', function(done) {
            try {
                parser('./test/data/broken/ifelse.nix', function(stuff) {});
                should.fail('no error was thrown when it should have been')
            } catch (error) {
                done();
            }
        });
    });
});