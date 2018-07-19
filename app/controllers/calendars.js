import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        createCalendar() {
            var store = this.get('store');
            store.createRecord('calendar', {
                name: ''
            });
        }
    }
});
