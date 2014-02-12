define([
    'marionette',
    '../vendor/holderjs/holder'
], function(
    Marionette,

    Holder
) {
    return Marionette.ItemView.extend({
        template: 'dashboard/dashboard',

        onRender: function() {
            Holder.run();
        }
    });
});