var should = require('should');
var requirejs = require("requirejs");
var parser = require("../parser.js").parse;
var i = require('util').inspect;

requirejs.config({
    baseUrl: ".",
});

describe('Hello World', function() {
    it('should save without error', function(done) {

        parser('test/data/hello.nix', function(stuff) {
            done();
        });

    });
});

describe('Variable Declarations', function() {
    it('should save without error', function(done) {
        parser('test/data/variables.nix', function(stuff) {
            done();
        });
    });
});

describe('For Loop', function() {
    it('should save without error', function(done) {
        parser('test/data/for.nix', function(stuff) {
            done();
        });
    });
});

describe('While Loop', function() {
    it('should save without error', function(done) {
        parser('test/data/while.nix', function(stuff) {
            done();
        });
    });
});

describe('Arrays', function() {
    it('should save without error', function(done) {
        parser('test/data/arrays.nix', function(stuff) {
            done();
        });
    });
});

describe('Functions', function() {
    it('should save without error', function(done) {
        parser('test/data/function.nix', function(stuff) {
            done();
        });
    });
});

describe('Member Declarations', function() {
    it('should save without error', function(done) {
        parser('test/data/public.nix', function(stuff) {
            done();
        });
    });
});

describe('Input/Output', function() {
    it('should save without error', function(done) {
        parser('test/data/io.nix', function(stuff) {
            done();
        });
    });
});

describe('If and Else Statements', function() {
    it('should save without error', function(done) {
        parser('test/data/ifelse.nix', function(stuff) {
            done();
        });
    });
});

describe('Attributes', function() {
    it('should save without error', function(done) {
        parser('test/data/attributes.nix', function(stuff) {
            done();
        });
    });
});

describe('Do While Loop', function() {
    it('should save without error', function(done) {
        parser('test/data/dowhile.nix', function(stuff) {
            done();
        });
    });
});

describe('Broken Hello World', function() {
    it('should throw error', function(done) {
        try {
            parser('test/data/broken/hello.nix', function(stuff) {});
            should.fail('no error was thrown when it should have been')
        } catch (error) {
            done();
        }
    });
});


describe('Broken Variable Declarations', function() {
    it('should throw error', function(done) {
        try {
            parser('test/data/broken/variables.nix', function(stuff) {});
            should.fail('no error was thrown when it should have been')
        } catch (error) {
            done();
        }
    });

});

describe('Broken For Loop', function() {

    it('should throw error', function(done) {
        try {
            parser('test/data/broken/for.nix', function(stuff) {});
            should.fail('no error was thrown when it should have been')
        } catch (error) {
            done();
        }
    });

});

describe('Broken While Loop', function() {
    it('should throw error', function(done) {
        try {
            parser('test/data/broken/while.nix', function(stuff) {});
            should.fail('no error was thrown when it should have been')
        } catch (error) {
            done();
        }
    });

});
describe('Broken Arrays', function() {
    it('should throw error', function(done) {
        try {
            parser('test/data/broken/arrays.nix', function(stuff) {});
            should.fail('no error was thrown when it should have been')
        } catch (error) {
            done();
        }
    });

});

describe('Broken Attributes', function() {
    it('should throw error', function(done) {
        try {
            parser('test/data/broken/attributes.nix', function(stuff) {});
            should.fail('no error was thrown when it should have been')
        } catch (error) {
            done();
        }
    });

});

describe('Broken Function', function() {
    it('should throw error', function(done) {
        try {
            (parser('test/data/broken/function.nix', function(stuff) {}))
            should.fail('no error was thrown when it should have been')
        } catch (error) {
            done();
        }
    });

});

describe('Broken Do While', function() {
    it('should throw error', function(done) {
        try {
            parser('test/data/broken/dowhile.nix', function(stuff) {});
            should.fail('no error was thrown when it should have been')
        } catch (error) {
            done();
        }
    });
});

describe('Broken If Else', function() {
    it('should throw error', function(done) {
        try {
            parser('test/data/broken/ifelse.nix', function(stuff) {});
            should.fail('no error was thrown when it should have been')
        } catch (error) {
            done();
        }
    });
});