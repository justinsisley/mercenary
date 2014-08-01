var Marionette = require('marionette');

require('dropdown');
require('tooltip');

module.exports = Marionette.ItemView.extend({
    template: 'modules/header/appHeader',

    onShow: function() {
        $('.dropdown-toggle').dropdown();

        $('.btn-sidebar-toggle').click(function() {
            $('.wrapper').toggleClass('wrapper-sidenav-collapsed');
            
            $('.sidebar-wrapper').toggleClass('sidebar-wrapper-collapsed');

            if ($('.sidebar-wrapper').hasClass('sidebar-wrapper-collapsed')) {
                $('[data-toggle="tooltip"]').tooltip({
                    placement: 'right',
                    container: 'body',
                    animation: false,
                    template: '<div class="tooltip sidebar-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                });
            } else {
                $('[data-toggle="tooltip"]').tooltip('destroy');
            }

            $(window).trigger('resize');
        });
    }
});
