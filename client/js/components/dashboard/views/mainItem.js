var Marionette = require('marionette');
var controller = require('components/dashboard/controllers/mainItem');

module.exports = Marionette.ItemView.extend({
    template: 'components/dashboard/mainItem',

    onShow: function() {
        controller.showMonthlyActiveUsersChart
            .call(this, this.$('#line-chart'));

        controller.showFruitConsumptionChart
            .call(this, this.$('#combo-chart'));

        controller.showHeightChart
            .call(this, this.$('#scatter-chart'));
    }
});