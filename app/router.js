import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('calendars', { path: '/calendriers' });
  this.route('calendar', { path: '/calendrier/:id' });
});

export default Router;
