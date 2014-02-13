define([
    'marionette',
    'holder',

    'modules/dashboard/templates/dashboard'
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