import Component from '@ember/component';

export default Component.extend({
    actions: {
        submitEvent(event) {
            this.calendar.get('events').addObject(event);
            event.save();
            this.get('onSubmit')(event);
        }
    }
});
