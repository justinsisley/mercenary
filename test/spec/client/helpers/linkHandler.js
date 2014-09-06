define(function(require) {
    var linkHandler = require('helpers/linkHandler');
    var linkHandlerSpy = sinon.spy(linkHandler);
    var link;

    describe('Global link handler', function() {
        beforeEach(function() {
            link = document.createElement('a');
            link.href = '/linkHandlerTest';
            link.addEventListener('click', function(e) {
                e.preventDefault();

                linkHandlerSpy(e);
            }, false);

            document.body.appendChild(link);
        });

        afterEach(function() {
            document.body.removeChild(link);

            link = null;

            linkHandlerSpy.reset();
        });

        it('should accept a click event as an argument', function() {
            helpers.click(link);

            assert.strictEqual(linkHandlerSpy.callCount, 1);
        });

        it('should determine if the link is internal or external', function() {
            // Internal link
            helpers.click(link);

            var linkValue = linkHandlerSpy.getCall(0).args[0].target;
            var target = linkValue.target;
            var isExternalLink = (target === '_blank' || target === '_self');

            assert.isFalse(isExternalLink);

            // External link
            link.setAttribute('target', '_blank');
            helpers.click(link);

            linkValue = linkHandlerSpy.getCall(1).args[0].target;
            target = linkValue.target;
            isExternalLink = (target === '_blank' || target === '_self');

            assert.isTrue(isExternalLink);
        });
    });
});