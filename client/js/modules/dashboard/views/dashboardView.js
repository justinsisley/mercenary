define([
    'marionette',
    'holder'
], function(
    Marionette,
    holder
) {
    return Marionette.ItemView.extend({
        template: 'dashboard/dashboard',

        onShow: function() {
            holder.run();
        }
    });
});