define(function(require) {
    var routers = require('shared/routers');
    var returnedObject;

    describe('Routers helper', function() {
        it('should return an object', function() {
            assert.isObject(routers);
        });

        it('should have a `start method` that returns an object', function() {
            assert.isFunction(routers.start);

            returnedObject = routers.start();

            assert.isObject(returnedObject);
        });

        it('should hold references to other routers', function() {
            for (router in returnedObject) {
                if (returnedObject.hasOwnProperty(router)) {
                    assert.isObject(returnedObject[router]);

                    assert.isObject(returnedObject[router]._events);
                }
            }
        });
    });
});