define([
    'marionette',
    'holder'
], function(
    Marionette,
    holder
) {
    return Marionette.ItemView.extend({
        template: 'dashboard/dashboard',

        onRender: function() {
            setTimeout(function() {
                holder.run();
            }, 0);
        }
    });
});