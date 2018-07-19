import Controller from '@ember/controller';

export default Controller.extend({
  editEvent: null,
    actions: {
        createEvent(date) {
            var store = this.get('store');
            this.set('editEvent', store.createRecord('event', {
                date: date ? date : '',
                title: '',
                content: ''
            }));
        },
        submittedEvent(event){
          this.set('editEvent', null);
        },
        editEvent(event){
          this.set('editEvent', event);
        }
    }
});
