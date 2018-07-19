import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params){
    return RSVP.hash({
      calendars: this.get('store').findAll('calendar'),
      calendar: this.get('store').findRecord('calendar', params.id)
    });
  }
});
