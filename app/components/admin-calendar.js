import Component from '@ember/component';

export default Component.extend({
    actions: {
        submitCalendar(calendar) {
            calendar.save();
            this.set('edit', false);
        },
        removeCalendar(calendar) {
            calendar.deleteRecord();
            calendar.save();
        },
        edit()
        {
            this.set('edit', true);
        }
    }
});
