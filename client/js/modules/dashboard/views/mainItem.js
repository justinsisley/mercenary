var Marionette = require('marionette');
var controller = require('modules/dashboard/controllers/mainItem');

module.exports = Marionette.ItemView.extend({
    template: 'modules/dashboard/mainItem',

    onShow: function() {
        controller.showMonthlyActiveUsersChart
            .call(this, this.$('#line-chart'));

        controller.showFruitConsumptionChart
            .call(this, this.$('#combo-chart'));

        controller.showHeightChart
            .call(this, this.$('#scatter-chart'));
    }
});