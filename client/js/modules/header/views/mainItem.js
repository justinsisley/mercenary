var Marionette = require('marionette');

require('dropdown');
require('tooltip');

module.exports = Marionette.ItemView.extend({
    template: 'modules/header/mainItem',

    ui: {
        userMenu: '.dropdown-toggle',
        sidebarToggle: '.btn-sidebar-toggle'
    },

    onShow: function() {
        this.ui.userMenu.dropdown();

        this.ui.sidebarToggle.on('click', this.toggleSidebar);
    },

    toggleSidebar: function() {
        var $wrapper = $('.wrapper');
        var $sidebarWrapper = $('.sidebar-wrapper');

        var wrapperNavCollapsedClass = 'wrapper-sidenav-collapsed';
        var sidebarWrapperCollapsedClass = 'sidebar-wrapper-collapsed';

        var tooltipMarkup = '<div class="tooltip sidebar-tooltip">' +
                                '<div class="tooltip-arrow"></div>' +
                                '<div class="tooltip-inner"></div>' +
                            '</div>';
                            
        var $tooltipTarget = $('[data-toggle="tooltip"]');

        $wrapper.toggleClass(wrapperNavCollapsedClass);
        
        $sidebarWrapper.toggleClass(sidebarWrapperCollapsedClass);

        if ($sidebarWrapper.hasClass(sidebarWrapperCollapsedClass)) {
            $tooltipTarget.tooltip({
                placement: 'right',
                container: 'body',
                animation: false,
                template: tooltipMarkup
            });
        } else {
            $tooltipTarget.tooltip('destroy');
        }

        $(window).trigger('resize');
    }
});
